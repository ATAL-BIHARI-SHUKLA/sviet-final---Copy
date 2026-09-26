import "server-only";

import { cookies } from "next/headers";

import { env } from "@/lib/env";

export async function assertAdminAccess() {
  if (!env.ADMIN_ACCESS_TOKEN) {
    throw new Error("Admin access token is not configured.");
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_access_token")?.value;

  if (!sessionToken || sessionToken !== env.ADMIN_ACCESS_TOKEN) {
    throw new Error("Unauthorized admin request.");
  }
}
