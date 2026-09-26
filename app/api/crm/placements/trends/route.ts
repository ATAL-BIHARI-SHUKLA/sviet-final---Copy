import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

const UpsertSchema = z.object({
  year: z.string().regex(/^\d{4}$/),
  companiesVisited: z.number().int().nonnegative(),
  highestPackageLpa: z.number().nonnegative(),
  averagePackageLpa: z.number().nonnegative(),
});

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const trends = await prisma.placementTrendYear.findMany({
      orderBy: { year: "asc" },
    });

    return NextResponse.json({ ok: true, data: trends });
  });
}

export async function POST(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const body = UpsertSchema.parse(await request.json());

    const trend = await prisma.placementTrendYear.upsert({
      where: { year: body.year },
      update: {
        companiesVisited: body.companiesVisited,
        highestPackageLpa: body.highestPackageLpa,
        averagePackageLpa: body.averagePackageLpa,
      },
      create: body,
    });

    return NextResponse.json({ ok: true, data: trend }, { status: 201 });
  });
}
