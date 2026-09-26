import { NextRequest, NextResponse } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { ScholarshipCheckSchema } from "@/validators/leads";

function computeEligibility(data: {
  familyIncomeLPA: number;
  academicScore: number;
  category: string;
}) {
  const { familyIncomeLPA, academicScore, category } = data;
  let percentage = 0;
  let eligible = false;
  const conditions: string[] = [];

  if (academicScore >= 90) percentage += 40;
  else if (academicScore >= 80) percentage += 30;
  else if (academicScore >= 70) percentage += 20;
  else if (academicScore >= 60) percentage += 10;

  if (familyIncomeLPA <= 2.5) percentage += 40;
  else if (familyIncomeLPA <= 5) percentage += 30;
  else if (familyIncomeLPA <= 8) percentage += 20;
  else if (familyIncomeLPA <= 12) percentage += 10;

  if (category === "SC" || category === "ST") {
    percentage += 20;
    conditions.push("SC/ST category benefit applied");
  } else if (category === "OBC") {
    percentage += 10;
    conditions.push("OBC category benefit applied");
  }

  percentage = Math.min(percentage, 100);
  eligible = percentage >= 30;

  return {
    eligible,
    percentage,
    reason: eligible
      ? `You are eligible for up to ${percentage}% scholarship`
      : "Based on provided details, scholarship eligibility criteria not met",
    conditions,
  };
}

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

  const body = ScholarshipCheckSchema.parse(await req.json());

  const eligibilityResult = computeEligibility({
    familyIncomeLPA: body.familyIncomeLPA,
    academicScore: body.academicScore,
    category: body.category,
  });

  const lead = await prisma.$transaction(async (tx) => {
    const created = await tx.lead.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        source: "SCHOLARSHIP_CHECK",
        status: "NEW",
        intendedProgramId: body.programId ?? null,
      },
    });

    await tx.scholarshipInquiry.create({
      data: {
        leadId: created.id,
        programId: body.programId ?? null,
        familyIncomeLPA: body.familyIncomeLPA,
        academicScore: body.academicScore,
        category: body.category,
        eligibilityResult,
      },
    });

    return created;
  });

  return NextResponse.json(
    { success: true, data: { leadId: lead.id, eligibility: eligibilityResult } },
    { status: 201 },
  );
});
