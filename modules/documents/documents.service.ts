import "server-only";

import { prisma } from "@/lib/db";
import { ApiError } from "@/services/api-errors";
import { recordActivity } from "@/services/activity-log";
import type { CreateDocumentMetadataInput } from "@/validators/documents";
import type { ReviewDocumentInput } from "@/validators/documents";

type Actor = {
  id: string;
  role: "APPLICANT" | "COUNSELOR" | "ADMIN" | "SUPER_ADMIN";
};

export async function createDocumentMetadata(input: CreateDocumentMetadataInput, actor: Actor) {
  const application = await prisma.application.findUnique({
    where: { id: input.applicationId },
    select: {
      id: true,
      applicantUserId: true,
    },
  });

  if (!application) {
    throw new ApiError(404, "Application not found.", "NOT_FOUND");
  }

  if (application.applicantUserId !== input.applicantUserId) {
    throw new ApiError(422, "Applicant does not belong to this application.", "INVALID_APPLICANT");
  }

  if (actor.role === "APPLICANT" && actor.id !== input.applicantUserId) {
    throw new ApiError(403, "Applicants can only upload their own documents.", "FORBIDDEN");
  }

  const document = await prisma.document.create({
    data: {
      applicationId: input.applicationId,
      applicantUserId: input.applicantUserId,
      type: input.type,
      storageKey: input.storageKey,
      originalFileName: input.originalFileName,
      mimeType: input.mimeType,
      sizeBytes: input.sizeBytes,
      sha256: input.sha256,
      uploadedByUserId: actor.id,
    },
  });

  await recordActivity({
    actorType: "USER",
    actorUserId: actor.id,
    entityType: "DOCUMENT",
    entityId: document.id,
    action: "DOCUMENT_METADATA_CREATED",
    metadata: {
      applicationId: document.applicationId,
      type: document.type,
      sizeBytes: document.sizeBytes,
    },
  });

  return document;
}

export async function reviewDocument(documentId: string, input: ReviewDocumentInput, actor: Actor) {
  const existing = await prisma.document.findUnique({
    where: { id: documentId },
    select: {
      id: true,
      status: true,
      applicationId: true,
    },
  });

  if (!existing) {
    throw new ApiError(404, "Document not found.", "NOT_FOUND");
  }

  const reviewed = await prisma.document.update({
    where: { id: documentId },
    data: {
      status: input.status,
      verifiedByUserId: actor.id,
      verifiedAt: new Date(),
      rejectionReason: input.status === "REJECTED" ? input.rejectionReason : null,
    },
  });

  await recordActivity({
    actorType: "USER",
    actorUserId: actor.id,
    entityType: "DOCUMENT",
    entityId: reviewed.id,
    action: "DOCUMENT_REVIEWED",
    metadata: {
      fromStatus: existing.status,
      toStatus: reviewed.status,
      applicationId: reviewed.applicationId,
      rejectionReason: reviewed.rejectionReason,
    },
  });

  return reviewed;
}
