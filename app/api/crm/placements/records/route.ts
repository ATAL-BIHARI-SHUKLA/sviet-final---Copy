import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

const CreateSchema = z.object({
  name: z.string().min(1),
  year: z.number().int().min(2000).max(2100),
  company: z.string().min(1),
  packageValue: z.number().positive(),
  packageLabel: z.string().min(1),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  isShowcase: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const params = request.nextUrl.searchParams;
    const yearParam = params.get("year");
    const showcaseOnly = params.get("showcase") === "true";

    const records = await prisma.placementRecord.findMany({
      where: {
        ...(yearParam ? { year: Number(yearParam) } : {}),
        ...(showcaseOnly ? { isShowcase: true } : {}),
      },
      orderBy: [{ year: "desc" }, { packageValue: "desc" }],
    });

    return NextResponse.json({ ok: true, data: records });
  });
}

export async function POST(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const body = CreateSchema.parse(await request.json());

    const record = await prisma.placementRecord.create({ data: body });

    return NextResponse.json({ ok: true, data: record }, { status: 201 });
  });
}
