import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { assertHasRole } from "@/modules/auth/rbac";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";

function getStartOfTodayUtc(now: Date) {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function getStartOfWeekUtcMonday(now: Date) {
  const startOfTodayUtc = getStartOfTodayUtc(now);
  const dayOfWeek = startOfTodayUtc.getUTCDay();
  const daysSinceMonday = (dayOfWeek + 6) % 7;
  startOfTodayUtc.setUTCDate(startOfTodayUtc.getUTCDate() - daysSinceMonday);
  return startOfTodayUtc;
}

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const now = new Date();
    const startOfTodayUtc = getStartOfTodayUtc(now);
    const startOfWeekUtc = getStartOfWeekUtcMonday(now);

    const [totalLeads, newToday, newThisWeek, byStatusRaw, bySourceRaw, recentLeads] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: startOfTodayUtc } } }),
      prisma.lead.count({ where: { createdAt: { gte: startOfWeekUtc } } }),
      prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.lead.groupBy({ by: ["source"], _count: { _all: true } }),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          source: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    const byStatus = byStatusRaw
      .map((item) => ({
        status: item.status,
        count: item._count._all,
      }))
      .sort((a, b) => b.count - a.count);

    const bySource = bySourceRaw
      .map((item) => ({
        source: item.source,
        count: item._count._all,
      }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      totalLeads,
      newToday,
      newThisWeek,
      byStatus,
      bySource,
      recentLeads,
    });
  });
}