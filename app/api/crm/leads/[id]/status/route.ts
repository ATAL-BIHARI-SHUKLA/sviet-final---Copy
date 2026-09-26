import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { LeadStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { ApiError } from "@/services/api-errors";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type LeadStatusValue = (typeof LeadStatus)[keyof typeof LeadStatus];

const LEAD_STATUSES = Object.values(LeadStatus) as LeadStatusValue[];

const updateLeadStatusSchema = z.object({
  status: z.string(),
  note: z.string().trim().min(1).max(2000).optional(),
});

export async function PATCH(request: NextRequest, context: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const { id } = await context.params;
    const payload = updateLeadStatusSchema.parse(await request.json());

    if (!LEAD_STATUSES.includes(payload.status as LeadStatusValue)) {
      throw new ApiError(400, "Invalid lead status.", "VALIDATION_ERROR");
    }

    const existing = await prisma.lead.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      throw new ApiError(404, "Lead not found.", "NOT_FOUND");
    }

    const noteBody = payload.note?.trim();

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        status: payload.status as LeadStatusValue,
        notes: noteBody
          ? {
              create: {
                body: noteBody,
                authorId: user.id,
              },
            }
          : undefined,
      },
      include: {
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
      },
    });

    return NextResponse.json(updatedLead);
  });
}