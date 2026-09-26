import { NextRequest } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";
import { assertHasRole } from "@/modules/auth/rbac";
import { createDocumentMetadataSchema } from "@/validators/documents";
import { createDocumentMetadata } from "@/modules/documents/documents.service";

export async function POST(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["APPLICANT", "COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const payload = createDocumentMetadataSchema.parse(await request.json());
    return createDocumentMetadata(payload, user);
  });
}
