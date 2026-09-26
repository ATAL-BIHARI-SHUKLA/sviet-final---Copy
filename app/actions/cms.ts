"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { formDataToObject } from "@/lib/actions/shared";
import { createAnnouncement } from "@/lib/dal/cms";
import { assertAdminAccess } from "@/lib/security/admin";
import { createAnnouncementSchema } from "@/lib/validation/cms";

export async function createAnnouncementAction(formData: FormData) {
  await assertAdminAccess();

  const parsed = createAnnouncementSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    redirect("/admin?announcement=invalid");
  }

  await createAnnouncement(parsed.data);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?announcement=success");
}
