import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { ApiError } from "@/services/api-errors";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

const UpdateSchema = z.object({
  badgeText: z.string().min(1).optional(),
  studentName: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  packageLabel: z.string().min(1).optional(),
  batchYear: z.string().min(1).optional(),
  imageSrc: z.string().min(1).optional(),
  imageAlt: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, ctx: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const { id } = await ctx.params;
    const body = UpdateSchema.parse(await request.json());

    const existing = await prisma.placementHighlightBanner.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Banner not found.", "NOT_FOUND");

    // When activating this banner, deactivate all others
    if (body.isActive === true) {
      await prisma.placementHighlightBanner.updateMany({
        where: { id: { not: id } },
        data: { isActive: false },
      });
    }

    const updated = await prisma.placementHighlightBanner.update({
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

    const existing = await prisma.placementHighlightBanner.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Banner not found.", "NOT_FOUND");

    await prisma.placementHighlightBanner.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  });
}
