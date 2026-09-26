import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { ApiError } from "@/services/api-errors";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

const UpdateSchema = z.object({
  companiesVisited: z.number().int().nonnegative().optional(),
  highestPackageLpa: z.number().nonnegative().optional(),
  averagePackageLpa: z.number().nonnegative().optional(),
});

type RouteContext = { params: Promise<{ year: string }> };

export async function PUT(request: NextRequest, ctx: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const { year } = await ctx.params;
    const body = UpdateSchema.parse(await request.json());

    const existing = await prisma.placementTrendYear.findUnique({ where: { year } });
    if (!existing) throw new ApiError(404, "Trend year not found.", "NOT_FOUND");

    const updated = await prisma.placementTrendYear.update({
      where: { year },
      data: body,
    });

    return NextResponse.json({ ok: true, data: updated });
  });
}

export async function DELETE(request: NextRequest, ctx: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const { year } = await ctx.params;

    const existing = await prisma.placementTrendYear.findUnique({ where: { year } });
    if (!existing) throw new ApiError(404, "Trend year not found.", "NOT_FOUND");

    await prisma.placementTrendYear.delete({ where: { year } });

    return NextResponse.json({ ok: true });
  });
}
