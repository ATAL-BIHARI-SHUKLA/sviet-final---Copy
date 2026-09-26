import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const program = await prisma.program.findUnique({
      where: { slug },
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
        mode: true,
        fullDescription: true,
        highlights: true,
        curriculum: true,
        outcomes: true,
        facilities: true,
        faqs: true,
        eligibility: true,
        isFeatured: true,
        durationMonths: true,
        tuitionCents: true,
        isActive: true,
      },
    });

    if (!program) {
      return NextResponse.json(
        { success: false, error: "Program not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...program,
        department: program.department?.name ?? null,
        departmentSlug: program.department?.slug ?? null,
        level: program.level,
        specialization: program.specializations[0]?.specialization.name ?? null,
        specializationSlug:
          program.specializations[0]?.specialization.slug ?? null,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch program" },
      { status: 500 },
    );
  }
}
