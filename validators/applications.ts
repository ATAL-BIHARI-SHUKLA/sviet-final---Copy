import { z } from "zod";

export const createApplicationSchema = z.object({
  applicantUserId: z.uuid(),
  leadId: z.uuid().optional(),
  programId: z.uuid(),
  intakeId: z.uuid(),
  assignedCounselorId: z.uuid().optional(),
});

export const updateApplicationStepSchema = z.object({
  stepCode: z.enum([
    "PERSONAL_INFO",
    "ACADEMICS",
    "PROGRAM_CHOICE",
    "DOCUMENTS",
    "ESSAYS",
    "REVIEW_SUBMIT",
  ]),
  data: z.record(z.string(), z.unknown()).default({}),
  isCompleted: z.boolean().default(false),
});

export const updateApplicationStatusSchema = z.object({
  toStatus: z.enum([
    "DRAFT",
    "IN_PROGRESS",
    "SUBMITTED",
    "UNDER_REVIEW",
    "DOCS_PENDING",
    "INTERVIEW_SCHEDULED",
    "DECISION_PENDING",
    "ACCEPTED",
    "REJECTED",
    "WAITLISTED",
    "WITHDRAWN",
  ]),
  reason: z.string().trim().min(2).max(500).optional(),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationStepInput = z.infer<typeof updateApplicationStepSchema>;
