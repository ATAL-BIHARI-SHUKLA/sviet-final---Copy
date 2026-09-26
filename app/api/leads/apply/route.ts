import { NextRequest, NextResponse } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { ApplyNowSchema } from "@/validators/leads";

function withPublicApiHandler(handler: (req: NextRequest) => Promise<Response>) {
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

  const body = ApplyNowSchema.parse(await req.json());

  let intendedProgramId: string | null = body.programId ?? null;

  if (!intendedProgramId && body.programSlug) {
    const matchedProgram = await prisma.program.findUnique({
      where: { slug: body.programSlug },
      select: { id: true },
    });

    intendedProgramId = matchedProgram?.id ?? null;
  }

  const lead = await prisma.$transaction(async (tx) => {
    const created = await tx.lead.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        source: "APPLY_NOW",
        status: "NEW",
        intendedProgramId,
      },
    });

    return created;
  });

  return NextResponse.json(
    { success: true, data: { leadId: lead.id, message: "Application received successfully" } },
    { status: 201 },
  );
});
