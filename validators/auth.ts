import { z } from "zod";

export const basicLoginSchema = z.object({
  email: z.email().transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(128),
});

export type BasicLoginInput = z.infer<typeof basicLoginSchema>;
