import { z } from "zod";

const dateString = z
  .string()
  .trim()
  .refine(
    (value) => !Number.isNaN(new Date(value).getTime()),
    "Invalid date value.",
  );

export const speakerSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1).max(200),
  photo: z.string().trim().max(2000000).optional().nullable(),
  bio: z.string().trim().max(2000).optional().nullable(),
  company: z.string().trim().max(200).optional().nullable(),
  designation: z.string().trim().max(200).optional().nullable(),
  linkedin: z
    .string()
    .trim()
    .max(500)
    .optional()
    .nullable()
    .or(z.literal("")),
  twitter: z.string().trim().max(200).optional().nullable(),
  displayOrder: z.number().int().min(0).default(0),
});

const eventSchemaFields = {
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase alphanumeric with hyphens",
    )
    .optional(),
  title: z.string().trim().min(3).max(180),
  description: z.string().trim().min(10).max(2000),
  image: z.string().trim().min(1).max(2000000),
  venue: z.string().trim().max(300).optional().nullable(),
  images: z.array(z.string().trim().min(1).max(2000000)).optional().default([]),
  driveGalleryUrl: z
    .string()
    .trim()
    .max(500)
    .optional()
    .nullable()
    .or(z.literal("")),
  startDate: dateString,
  endDate: dateString.nullable().optional(),
  category: z.string().trim().min(2).max(80),
  isFeatured: z.boolean().optional().default(false),
  speakers: z.array(speakerSchema).optional().default([]),
};

const createEventBaseSchema = z
  .object({
    ...eventSchemaFields,
  })
  .refine(
    (data) => {
      if (!data.endDate) return true;
      return (
        new Date(data.endDate).getTime() >= new Date(data.startDate).getTime()
      );
    },
    { path: ["endDate"], message: "End date must be on or after start date." },
  );

export const createEventSchema = createEventBaseSchema;

export const updateEventSchema = z
  .object({ ...eventSchemaFields })
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field is required to update an event.",
  );

export const listEventsQuerySchema = z.object({
  take: z.coerce.number().int().min(1).max(100).default(50),
  category: z.string().trim().min(1).max(80).optional(),
  featured: z
    .string()
    .transform((v) => v === "true")
    .optional(),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type SpeakerInput = z.infer<typeof speakerSchema>;
