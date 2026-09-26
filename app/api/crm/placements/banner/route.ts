import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

const UpsertSchema = z.object({
  badgeText: z.string().min(1),
  studentName: z.string().min(1),
  company: z.string().min(1),
  packageLabel: z.string().min(1),
  batchYear: z.string().min(1),
  imageSrc: z.string().min(1),
  imageAlt: z.string().min(1),
  isActive: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const banners = await prisma.placementHighlightBanner.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ok: true, data: banners });
  });
}

export async function POST(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const body = UpsertSchema.parse(await request.json());

    // Deactivate all existing banners when creating a new active one
    if (body.isActive) {
      await prisma.placementHighlightBanner.updateMany({
        data: { isActive: false },
      });
    }

    const banner = await prisma.placementHighlightBanner.create({ data: body });

    return NextResponse.json({ ok: true, data: banner }, { status: 201 });
  });
}
