import { NextRequest } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";
import { assertHasRole } from "@/modules/auth/rbac";
import { updateApplicationStatusSchema } from "@/validators/applications";
import { updateApplicationStatus } from "@/modules/applications/applications.service";

type RouteContext = {
  params: Promise<{ applicationId: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const { applicationId } = await context.params;
    const payload = updateApplicationStatusSchema.parse(await request.json());

    return updateApplicationStatus(applicationId, payload.toStatus, user, payload.reason);
  });
}
