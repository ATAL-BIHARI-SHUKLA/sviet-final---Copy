import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const staff = await prisma.user.findMany({
      where: {
        role: {
          in: ["COUNSELOR", "ADMIN"],
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
      orderBy: [{ role: "asc" }, { firstName: "asc" }, { lastName: "asc" }],
    });

    return NextResponse.json(staff);
  });
}