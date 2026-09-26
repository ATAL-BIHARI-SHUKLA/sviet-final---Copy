import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { ApiError } from "@/services/api-errors";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const { id } = await context.params;

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        applicant: true,
        scholarship: true,
        programFinder: true,
        contactEnquiry: true,
        notes: {
          orderBy: { createdAt: "desc" },
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
              },
            },
          },
        },
        intendedProgram: true,
        ownerCounselor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!lead) {
      throw new ApiError(404, "Lead not found.", "NOT_FOUND");
    }

    return NextResponse.json(lead);
  });
}