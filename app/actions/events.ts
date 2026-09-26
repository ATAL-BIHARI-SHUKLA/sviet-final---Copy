"use server";

import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { formDataToObject } from "@/lib/actions/shared";
import { registerForEvent } from "@/lib/dal/events";
import { registerEventSchema } from "@/lib/validation/events";

export async function registerForEventAction(formData: FormData) {
  const parsed = registerEventSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    redirect("/events?registration=invalid");
  }

  try {
    await registerForEvent(parsed.data);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      redirect("/events?registration=duplicate");
    }

    redirect("/events?registration=failed");
  }

  revalidatePath("/events");
  redirect("/events?registration=success");
}
