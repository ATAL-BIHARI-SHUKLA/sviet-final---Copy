import { z } from "zod";

export const BaseLeadSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
  city: z.string().optional(),
});

export const ApplyNowSchema = BaseLeadSchema.extend({
  programId: z.string().uuid().optional(),
  programSlug: z.string().trim().min(1).max(120).optional(),
  message: z.string().max(500).optional(),
  course: z.string().optional(),
});

export const ScholarshipCheckSchema = BaseLeadSchema.extend({
  programId: z.string().uuid().optional(),
  course: z.string().optional(),
  familyIncomeLPA: z.coerce.number().min(0).max(100),
  academicScore: z.coerce.number().min(0).max(100),
  category: z.enum(["GENERAL", "OBC", "SC", "ST"]),
});

export const ProgramFinderSchema = BaseLeadSchema.extend({
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  careers: z.array(z.string()).optional().default([]),
  academicPreference: z.string().optional(),
  preferredMode: z.string().optional(),
  budgetRange: z.string().optional(),
});

export const ContactEnquirySchema = BaseLeadSchema.extend({
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000),
});

export const EventRegistrationSchema = BaseLeadSchema.extend({
  eventId: z.string().uuid(),
});

export const RESUME_MAX_BYTES = 3 * 1024 * 1024; // 3 MB (keeps base64 body under serverless limits)
export const RESUME_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const ResumeUploadSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  mimeType: z.enum(RESUME_ALLOWED_MIME_TYPES, {
    message: "Resume must be a PDF, DOC, or DOCX file.",
  }),
  // Raw base64 payload (without the `data:...;base64,` prefix).
  fileBase64: z
    .string()
    .min(1)
    .refine(
      // base64 length * 3/4 approximates the decoded byte size.
      (b64) => (b64.length * 3) / 4 <= RESUME_MAX_BYTES,
      { message: "Resume must be under 3 MB." },
    ),
});

export const CareerApplicationSchema = BaseLeadSchema.extend({
  position: z.string().min(2).max(200),
  qualifications: z.string().min(2).max(500),
  yearsExperience: z.coerce.number().int().min(0).max(60),
  coverLetter: z.string().max(3000).optional(),
  resume: ResumeUploadSchema.optional(),
});

export const createLeadSchema = BaseLeadSchema.extend({
  source: z.enum([
    "APPLY_NOW",
    "SCHOLARSHIP_CHECK",
    "PROGRAM_FINDER",
    "CONTACT_ENQUIRY",
    "EVENT_REGISTRATION",
    "CAMPUS_VISIT",
    "PHONE",
    "REFERRAL",
    "WALK_IN",
    "SOCIAL",
    "WEBSITE",
    "EVENT",
    "CAREER_APPLICATION",
  ]),
  intendedProgramId: z.string().uuid().optional(),
  notes: z.string().trim().max(1000).optional(),
  nextFollowUpAt: z.string().datetime().optional(),
});

export const updateLeadSchema = createLeadSchema.partial().extend({
  status: z
    .enum(["NEW", "ASSIGNED", "CONTACTED", "NURTURING", "QUALIFIED", "CONVERTED", "DISQUALIFIED", "LOST"])
    .optional(),
});

export const assignLeadSchema = z.object({
  counselorId: z.string().uuid(),
});

export const leadQuerySchema = z.object({
  status: z
    .enum(["NEW", "ASSIGNED", "CONTACTED", "NURTURING", "QUALIFIED", "CONVERTED", "DISQUALIFIED", "LOST"])
    .optional(),
  ownerCounselorId: z.uuid().optional(),
  q: z.string().trim().min(1).max(120).optional(),
  take: z.coerce.number().int().min(1).max(100).default(20),
  skip: z.coerce.number().int().min(0).default(0),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
