import { NextRequest } from "next/server";
import { z } from "zod";

import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";
import { assertHasRole } from "@/modules/auth/rbac";
import { uploadFileToDrive } from "@/lib/drive/upload";

const fileSchema = z.object({
  fileName: z.string().min(1),
  mimeType: z.string().min(1),
  fileBase64: z.string().min(1),
});

const uploadSchema = z.object({
  files: z.array(fileSchema).min(1).max(20),
});

export async function POST(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const { files } = uploadSchema.parse(await request.json());

    const results = await Promise.all(files.map((f) => uploadFileToDrive(f)));

    return results;
  });
}
