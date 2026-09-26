import { z } from "zod";

export const createDocumentMetadataSchema = z.object({
  applicationId: z.uuid(),
  applicantUserId: z.uuid(),
  type: z.enum([
    "TRANSCRIPT",
    "ID_PROOF",
    "PHOTO",
    "ENTRANCE_SCORE",
    "RECOMMENDATION",
    "ESSAY",
    "OTHER",
  ]),
  storageKey: z.string().trim().min(3).max(400),
  originalFileName: z.string().trim().min(1).max(300),
  mimeType: z.string().trim().min(3).max(120),
  sizeBytes: z.number().int().positive().max(30 * 1024 * 1024),
  sha256: z.string().trim().length(64),
});

export const reviewDocumentSchema = z
  .object({
    status: z.enum(["VERIFIED", "REJECTED"]),
    rejectionReason: z.string().trim().min(2).max(500).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.status === "REJECTED" && !value.rejectionReason) {
      ctx.addIssue({
        code: "custom",
        message: "rejectionReason is required when status is REJECTED.",
        path: ["rejectionReason"],
      });
    }
  });

export type CreateDocumentMetadataInput = z.infer<typeof createDocumentMetadataSchema>;
export type ReviewDocumentInput = z.infer<typeof reviewDocumentSchema>;
