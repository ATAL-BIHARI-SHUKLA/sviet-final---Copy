import "server-only";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { ApiError } from "@/services/api-errors";
import { recordActivity } from "@/services/activity-log";
import { assertValidTransition, type ApplicationStatus } from "@/modules/applications/fsm";
import type { CreateApplicationInput, UpdateApplicationStepInput } from "@/validators/applications";

type Actor = {
  id: string;
  role: "APPLICANT" | "COUNSELOR" | "ADMIN" | "SUPER_ADMIN";
};

export async function createApplication(input: CreateApplicationInput, actor: Actor) {
  if (actor.role === "APPLICANT" && actor.id !== input.applicantUserId) {
    throw new ApiError(403, "Applicants can only create their own application.", "FORBIDDEN");
  }

  const [applicant, intake] = await Promise.all([
    prisma.user.findUnique({ where: { id: input.applicantUserId }, select: { id: true, role: true } }),
    prisma.intake.findUnique({ where: { id: input.intakeId }, select: { id: true, isOpen: true, programId: true } }),
  ]);

  if (!applicant || applicant.role !== "APPLICANT") {
    throw new ApiError(422, "Invalid applicant user.", "INVALID_APPLICANT");
  }

  if (!intake || !intake.isOpen || intake.programId !== input.programId) {
    throw new ApiError(422, "Invalid or closed intake for selected program.", "INVALID_INTAKE");
  }

  let application;

  try {
    application = await prisma.$transaction(async (tx) => {
      const created = await tx.application.create({
        data: {
          applicantUserId: input.applicantUserId,
          leadId: input.leadId,
          programId: input.programId,
          intakeId: input.intakeId,
          assignedCounselorId: input.assignedCounselorId,
          status: "DRAFT",
        },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: created.id,
          fromStatus: null,
          toStatus: "DRAFT",
          changedByUserId: actor.id,
          reason: "Application created",
        },
      });

      return created;
    });
  } catch (error) {
    const maybePrismaCode =
      error instanceof Prisma.PrismaClientKnownRequestError
        ? error.code
        : typeof error === "object" && error !== null && "code" in error
          ? String((error as { code: unknown }).code)
          : null;

    if (maybePrismaCode === "P2002") {
      throw new ApiError(409, "Duplicate application for this intake.", "DUPLICATE_APPLICATION");
    }

    throw error;
  }

  await recordActivity({
    actorType: "USER",
    actorUserId: actor.id,
    entityType: "APPLICATION",
    entityId: application.id,
    action: "APPLICATION_CREATED",
  });

  return application;
}

export async function updateApplicationStep(applicationId: string, input: UpdateApplicationStepInput, actor: Actor) {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { formData: true },
  });

  if (!application) {
    throw new ApiError(404, "Application not found.", "NOT_FOUND");
  }

  if (actor.role === "APPLICANT" && actor.id !== application.applicantUserId) {
    throw new ApiError(403, "Applicants can only update their own application.", "FORBIDDEN");
  }

  const nextStatus: ApplicationStatus =
    application.status === "DRAFT" && input.isCompleted ? "IN_PROGRESS" : (application.status as ApplicationStatus);

  const updated = await prisma.$transaction(async (tx) => {
    const nextStepData = {
      ...((application.formData?.stepsData as Prisma.InputJsonObject | null) ?? {}),
      [input.stepCode]: input.data as Prisma.InputJsonValue,
    } as Prisma.InputJsonObject;

    await tx.applicationFormData.upsert({
      where: { applicationId },
      create: {
        applicationId,
        stepsData: nextStepData,
        lastSavedStep: input.stepCode,
      },
      update: {
        stepsData: nextStepData,
        lastSavedStep: input.stepCode,
      },
    });

    await tx.applicationStepProgress.upsert({
      where: {
        applicationId_stepCode: {
          applicationId,
          stepCode: input.stepCode,
        },
      },
      create: {
        applicationId,
        stepCode: input.stepCode,
        isCompleted: input.isCompleted,
        completedAt: input.isCompleted ? new Date() : null,
      },
      update: {
        isCompleted: input.isCompleted,
        completedAt: input.isCompleted ? new Date() : null,
      },
    });

    if (nextStatus !== application.status) {
      await tx.application.update({
        where: { id: application.id },
        data: {
          status: nextStatus,
        },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId,
          fromStatus: application.status,
          toStatus: nextStatus,
          changedByUserId: actor.id,
          reason: "Progressed through application steps",
          metadata: { stepCode: input.stepCode },
        },
      });
    }

    return tx.application.findUniqueOrThrow({
      where: { id: applicationId },
      include: {
        formData: true,
        stepProgress: true,
      },
    });
  });

  await recordActivity({
    actorType: "USER",
    actorUserId: actor.id,
    entityType: "APPLICATION",
    entityId: applicationId,
    action: "APPLICATION_STEP_UPDATED",
    metadata: {
      stepCode: input.stepCode,
      isCompleted: input.isCompleted,
    },
  });

  return updated;
}

export async function submitApplication(applicationId: string, actor: Actor) {
  return updateApplicationStatus(applicationId, "SUBMITTED", actor, "Application submitted");
}

export async function updateApplicationStatus(
  applicationId: string,
  toStatus: ApplicationStatus,
  actor: Actor,
  reason?: string,
) {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      stepProgress: true,
    },
  });

  if (!application) {
    throw new ApiError(404, "Application not found.", "NOT_FOUND");
  }

  if (actor.role === "APPLICANT" && actor.id !== application.applicantUserId) {
    throw new ApiError(403, "Applicants can only update their own application.", "FORBIDDEN");
  }

  const fromStatus = application.status as ApplicationStatus;
  assertValidTransition(fromStatus, toStatus);

  if (toStatus === "SUBMITTED") {
    const reviewStep = application.stepProgress.find((step) => step.stepCode === "REVIEW_SUBMIT");

    if (!reviewStep?.isCompleted) {
      throw new ApiError(422, "Cannot submit without completing REVIEW_SUBMIT step.", "INCOMPLETE_STEPS");
    }
  }

  const now = new Date();

  const result = await prisma.$transaction(async (tx) => {
    // Optimistic lock prevents lost updates for concurrent counselor/admin actions.
    const updated = await tx.application.updateMany({
      where: {
        id: application.id,
        status: application.status,
        version: application.version,
      },
      data: {
        status: toStatus,
        version: { increment: 1 },
        submittedAt: toStatus === "SUBMITTED" ? now : application.submittedAt,
        decidedAt: ["ACCEPTED", "REJECTED", "WAITLISTED"].includes(toStatus) ? now : application.decidedAt,
      },
    });

    if (updated.count !== 1) {
      throw new ApiError(409, "Application was updated by another request. Retry.", "CONFLICT");
    }

    await tx.applicationStatusHistory.create({
      data: {
        applicationId: application.id,
        fromStatus,
        toStatus,
        changedByUserId: actor.id,
        reason,
      },
    });

    return tx.application.findUniqueOrThrow({
      where: { id: application.id },
      include: {
        applicant: { select: { id: true, firstName: true, lastName: true, email: true } },
        assignedCounselor: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });
  });

  await recordActivity({
    actorType: "USER",
    actorUserId: actor.id,
    entityType: "APPLICATION",
    entityId: application.id,
    action: "APPLICATION_STATUS_UPDATED",
    metadata: {
      fromStatus,
      toStatus,
      reason,
    },
  });

  return result;
}
