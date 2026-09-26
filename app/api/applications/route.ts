import { NextRequest } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";
import { assertHasRole } from "@/modules/auth/rbac";
import { prisma } from "@/lib/db";
import { createApplicationSchema } from "@/validators/applications";
import { createApplication } from "@/modules/applications/applications.service";

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    return prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        lead: {
          select: {
            id: true,
          },
        },
        applicant: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        program: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        intake: {
          select: {
            id: true,
            termCode: true,
            startsOn: true,
          },
        },
        assignedCounselor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  });
}

export async function POST(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["APPLICANT", "COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const payload = createApplicationSchema.parse(await request.json());
    return createApplication(payload, user);
  });
}
