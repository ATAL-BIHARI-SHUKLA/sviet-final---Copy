import "server-only";

import { prisma } from "@/lib/db";
import { ApiError } from "@/services/api-errors";
import { recordActivity } from "@/services/activity-log";
import type { CreateLeadInput, UpdateLeadInput } from "@/validators/leads";

type Actor = {
  id: string;
  role: "APPLICANT" | "COUNSELOR" | "ADMIN" | "SUPER_ADMIN";
};

type ListLeadFilters = {
  status?: "NEW" | "ASSIGNED" | "CONTACTED" | "NURTURING" | "QUALIFIED" | "CONVERTED" | "DISQUALIFIED" | "LOST";
  ownerCounselorId?: string;
  q?: string;
  take: number;
  skip: number;
};

export async function listLeads(filters: ListLeadFilters) {
  const where = {
    status: filters.status,
    ownerCounselorId: filters.ownerCounselorId,
    OR: filters.q
      ? [
          { firstName: { contains: filters.q, mode: "insensitive" as const } },
          { lastName: { contains: filters.q, mode: "insensitive" as const } },
          { email: { contains: filters.q, mode: "insensitive" as const } },
          { phone: { contains: filters.q, mode: "insensitive" as const } },
        ]
      : undefined,
  };

  return prisma.lead.findMany({
    where,
    include: {
      intendedProgram: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      ownerCounselor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
    take: filters.take,
    skip: filters.skip,
  });
}

export async function createLead(input: CreateLeadInput, actor: Actor) {
  const noteBody = input.notes?.trim();

  const lead = await prisma.lead.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      source: input.source,
      intendedProgramId: input.intendedProgramId,
      notes: noteBody
        ? {
            create: {
              body: noteBody,
              authorId: actor.id,
            },
          }
        : undefined,
      nextFollowUpAt: input.nextFollowUpAt ? new Date(input.nextFollowUpAt) : undefined,
    },
  });

  await recordActivity({
    actorType: "USER",
    actorUserId: actor.id,
    entityType: "LEAD",
    entityId: lead.id,
    action: "LEAD_CREATED",
  });

  return lead;
}

export async function updateLead(leadId: string, input: UpdateLeadInput, actor: Actor) {
  const noteBody = input.notes?.trim();

  const lead = await prisma.lead.update({
    where: { id: leadId },
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      source: input.source,
      status: input.status,
      notes: noteBody
        ? {
            create: {
              body: noteBody,
              authorId: actor.id,
            },
          }
        : undefined,
      intendedProgramId: input.intendedProgramId,
      nextFollowUpAt: input.nextFollowUpAt ? new Date(input.nextFollowUpAt) : undefined,
    },
  });

  await recordActivity({
    actorType: "USER",
    actorUserId: actor.id,
    entityType: "LEAD",
    entityId: lead.id,
    action: "LEAD_UPDATED",
  });

  return lead;
}

export async function deleteLead(leadId: string, actor: Actor) {
  await prisma.lead.delete({ where: { id: leadId } });

  await recordActivity({
    actorType: "USER",
    actorUserId: actor.id,
    entityType: "LEAD",
    entityId: leadId,
    action: "LEAD_DELETED",
  });
}

export async function assignLead(leadId: string, counselorId: string, actor: Actor) {
  const counselor = await prisma.user.findUnique({
    where: { id: counselorId },
    select: { id: true, role: true },
  });

  if (!counselor || !["COUNSELOR", "ADMIN", "SUPER_ADMIN"].includes(counselor.role)) {
    throw new ApiError(422, "Invalid counselor assignment.", "INVALID_COUNSELOR");
  }

  const lead = await prisma.lead.update({
    where: { id: leadId },
    data: {
      ownerCounselorId: counselorId,
      status: "ASSIGNED",
    },
  });

  await recordActivity({
    actorType: "USER",
    actorUserId: actor.id,
    entityType: "LEAD",
    entityId: lead.id,
    action: "LEAD_ASSIGNED",
    metadata: { counselorId },
  });

  return lead;
}
