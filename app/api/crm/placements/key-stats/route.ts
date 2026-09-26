import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

const StatSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  sortOrder: z.number().int().default(0),
});

const BulkReplaceSchema = z.object({
  stats: z.array(StatSchema).min(1),
});

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const stats = await prisma.placementKeyStat.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ ok: true, data: stats });
  });
}

// Replaces all stats atomically
export async function PUT(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const { stats } = BulkReplaceSchema.parse(await request.json());

    const updated = await prisma.$transaction(async (tx) => {
      await tx.placementKeyStat.deleteMany();
      return tx.placementKeyStat.createMany({ data: stats });
    });

    return NextResponse.json({ ok: true, data: updated });
  });
}

export async function POST(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const body = StatSchema.parse(await request.json());
    const stat = await prisma.placementKeyStat.create({ data: body });

    return NextResponse.json({ ok: true, data: stat }, { status: 201 });
  });
}
