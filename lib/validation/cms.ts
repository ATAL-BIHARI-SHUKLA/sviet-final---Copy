import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().trim().min(4).max(150),
  body: z.string().trim().min(8).max(5000),
  level: z.enum(["INFO", "SUCCESS", "WARNING", "CRITICAL"]),
  pinned: z
    .string()
    .optional()
    .transform((value) => value === "on"),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
