import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { ApiError } from "@/services/api-errors";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const createLeadNoteSchema = z.object({
  body: z.string().trim().min(1).max(2000),
});

export async function POST(request: NextRequest, context: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const { id } = await context.params;
    const payload = createLeadNoteSchema.parse(await request.json());

    const existing = await prisma.lead.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      throw new ApiError(404, "Lead not found.", "NOT_FOUND");
    }

    const note = await prisma.leadNote.create({
      data: {
        leadId: id,
        authorId: user.id,
        body: payload.body,
      },
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
    });

    return NextResponse.json(note, { status: 201 });
  });
}