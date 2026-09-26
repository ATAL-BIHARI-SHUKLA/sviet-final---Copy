import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      select: {
        id: true,
        slug: true,
        title: true,
        shortDescription: true,
        level: true,
        department: {
          select: {
            name: true,
            slug: true,
          },
        },
        specializations: {
          where: { isPrimary: true },
          select: {
            specialization: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
        eligibility: true,
        mode: true,
        durationMonths: true,
        tuitionCents: true,
      },
      orderBy: { title: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: programs.map((program) => ({
        id: program.id,
        slug: program.slug,
        title: program.title,
        shortDescription: program.shortDescription,
        department: program.department?.name ?? null,
        departmentSlug: program.department?.slug ?? null,
        level: program.level,
        specialization: program.specializations[0]?.specialization.name ?? null,
        specializationSlug:
          program.specializations[0]?.specialization.slug ?? null,
        eligibility: program.eligibility,
        mode: program.mode,
        durationMonths: program.durationMonths,
        tuitionCents: program.tuitionCents,
      })),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch programs" },
      { status: 500 },
    );
  }
}
