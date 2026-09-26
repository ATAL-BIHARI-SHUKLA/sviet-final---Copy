import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { ApiError } from "@/services/api-errors";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

const UpdateSchema = z.object({
  name: z.string().min(1).optional(),
  year: z.number().int().min(2000).max(2100).optional(),
  company: z.string().min(1).optional(),
  packageValue: z.number().positive().optional(),
  packageLabel: z.string().min(1).optional(),
  imageSrc: z.string().nullable().optional(),
  imageAlt: z.string().nullable().optional(),
  isShowcase: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, ctx: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const { id } = await ctx.params;
    const body = UpdateSchema.parse(await request.json());

    const existing = await prisma.placementRecord.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Placement record not found.", "NOT_FOUND");

    const updated = await prisma.placementRecord.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ ok: true, data: updated });
  });
}

export async function DELETE(request: NextRequest, ctx: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const { id } = await ctx.params;

    const existing = await prisma.placementRecord.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Placement record not found.", "NOT_FOUND");

    await prisma.placementRecord.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  });
}
