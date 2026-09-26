import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  ADMIN_ACCESS_TOKEN: z.string().min(24).optional(),
  OPENAI_API_KEY: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error("Invalid environment configuration. Check required env vars.");
}

export const env = parsedEnv.data;
