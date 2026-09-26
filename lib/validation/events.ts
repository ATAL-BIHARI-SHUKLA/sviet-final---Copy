import { z } from "zod";

export const registerEventSchema = z.object({
  eventId: z.string().uuid(),
  fullName: z.string().trim().min(2).max(120),
  email: z.email().transform((value) => value.toLowerCase()),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? value : undefined)),
});

export type RegisterEventInput = z.infer<typeof registerEventSchema>;
