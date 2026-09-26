import { NextRequest } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";
import { assertHasRole } from "@/modules/auth/rbac";
import { reviewDocumentSchema } from "@/validators/documents";
import { reviewDocument } from "@/modules/documents/documents.service";

type RouteContext = {
  params: Promise<{ documentId: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const { documentId } = await context.params;
    const payload = reviewDocumentSchema.parse(await request.json());

    return reviewDocument(documentId, payload, user);
  });
}
