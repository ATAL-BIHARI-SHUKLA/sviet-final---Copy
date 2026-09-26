import { NextRequest, NextResponse } from "next/server";

import { Prisma } from "@/generated/prisma/client";
import { LeadSource, LeadStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { ApiError } from "@/services/api-errors";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

type LeadStatusValue = (typeof LeadStatus)[keyof typeof LeadStatus];
type LeadSourceValue = (typeof LeadSource)[keyof typeof LeadSource];

const LEAD_STATUSES = Object.values(LeadStatus) as LeadStatusValue[];
const LEAD_SOURCES = Object.values(LeadSource) as LeadSourceValue[];

function parsePositiveInteger(value: string | null, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const params = request.nextUrl.searchParams;
    const statusParam = params.get("status");
    const sourceParam = params.get("source");
    const assignedTo = params.get("assignedTo")?.trim() || undefined;
    const search = params.get("search")?.trim() || undefined;

    const page = parsePositiveInteger(params.get("page"), 1);
    const limit = Math.min(parsePositiveInteger(params.get("limit"), 20), 100);

    let status: LeadStatusValue | undefined;
    if (statusParam) {
      if (!LEAD_STATUSES.includes(statusParam as LeadStatusValue)) {
        throw new ApiError(400, "Invalid lead status filter.", "VALIDATION_ERROR");
      }
      status = statusParam as LeadStatusValue;
    }

    let source: LeadSourceValue | undefined;
    if (sourceParam) {
      if (!LEAD_SOURCES.includes(sourceParam as LeadSourceValue)) {
        throw new ApiError(400, "Invalid lead source filter.", "VALIDATION_ERROR");
      }
      source = sourceParam as LeadSourceValue;
    }

    const where: Prisma.LeadWhereInput = {
      status,
      source,
      ownerCounselorId: assignedTo,
      OR: search
        ? [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
          ]
        : undefined,
    };

    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          intendedProgram: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
          ownerCounselor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json({
      leads,
      total,
      page,
      totalPages,
    });
  });
}