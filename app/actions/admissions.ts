"use server";

import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { formDataToObject } from "@/lib/actions/shared";
import { createLead } from "@/lib/dal/admissions";
import { createLeadSchema } from "@/lib/validation/admissions";

export async function createLeadAction(formData: FormData) {
  const parsed = createLeadSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    redirect("/?lead=invalid");
  }

  try {
    await createLead(parsed.data);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      redirect("/?lead=duplicate");
    }

    redirect("/?lead=failed");
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/?lead=success");
}
