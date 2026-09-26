import { NextRequest, NextResponse } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { ProgramFinderSchema } from "@/validators/leads";

function withPublicApiHandler(
  handler: (req: NextRequest) => Promise<Response>,
) {
  const wrapped = withApiHandler as unknown as (
    handler: () => Promise<Response>,
    options: { isPublic: boolean },
  ) => Promise<Response>;

  return (req: NextRequest) => wrapped(() => handler(req), { isPublic: true });
}

export const POST = withPublicApiHandler(async (req: NextRequest) => {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const limit = rateLimit(`lead:${ip}`, 5, 60 * 60 * 1000);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "RATE_LIMITED",
          message: "Too many submissions. Please try again later.",
        },
      },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(limit.resetIn / 1000)) },
      },
    );
  }

  const body = ProgramFinderSchema.parse(await req.json());

  const allPrograms = await prisma.program.findMany({
    where: { isActive: true },
    select: {
      id: true,
      slug: true,
      title: true,
      shortDescription: true,
      department: {
        select: {
          name: true,
        },
      },
      level: true,
      durationMonths: true,
      tuitionCents: true,
    },
  });

  const recommended = allPrograms.slice(0, 3).map((program) => ({
    id: program.id,
    slug: program.slug,
    title: program.title,
    shortDescription: program.shortDescription,
    department: program.department?.name ?? null,
    level: program.level,
    durationMonths: program.durationMonths,
    tuitionCents: program.tuitionCents,
  }));

  const lead = await prisma.$transaction(async (tx) => {
    const created = await tx.lead.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        source: "PROGRAM_FINDER",
        status: "NEW",
      },
    });

    await tx.programFinderSubmission.create({
      data: {
        leadId: created.id,
        interests: body.interests,
        careers: body.careers ?? [],
        academicPreference: body.academicPreference ?? null,
        preferredMode: body.preferredMode ?? null,
        budgetRange: body.budgetRange ?? null,
        recommendedPrograms: recommended,
      },
    });

    return created;
  });

  return NextResponse.json(
    { success: true, data: { leadId: lead.id, recommendations: recommended } },
    { status: 201 },
  );
});
