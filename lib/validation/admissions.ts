import { z } from "zod";

import { PLATFORM_CONFIG } from "@/lib/config/platform";

export const createLeadSchema = z.object({
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().min(2).max(80),
  email: z.email().transform((value) => value.toLowerCase()),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? value : undefined)),
  intendedProgramId: z.string().uuid().optional().or(z.literal("")),
  notes: z
    .string()
    .trim()
    .max(PLATFORM_CONFIG.admissions.maxLeadNotesLength)
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? value : undefined)),
  source: z.enum(["WEBSITE", "PHONE", "REFERRAL", "EVENT", "SOCIAL"]),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
