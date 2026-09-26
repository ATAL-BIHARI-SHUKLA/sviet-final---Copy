import { NextRequest } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";
import { assertHasRole } from "@/modules/auth/rbac";
import { createLeadSchema, leadQuerySchema } from "@/validators/leads";
import { createLead, listLeads } from "@/modules/leads/leads.service";

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const query = Object.fromEntries(request.nextUrl.searchParams.entries());
    const filters = leadQuerySchema.parse(query);

    return listLeads(filters);
  });
}

export async function POST(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const payload = createLeadSchema.parse(await request.json());

    return createLead(payload, user);
  });
}
