import Link from "next/link";
import { Activity, Calendar, TrendingUp, Users } from "lucide-react";

import { DashboardCharts } from "@/components/admin/dashboard-charts";
import { AdminLayout } from "@/components/admin/admin-layout";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { prisma } from "@/lib/db";
export const dynamic = "force-dynamic";


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

export default async function AdminPage() {
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
    .map((item) => ({ status: item.status, count: item._count._all }))
    .sort((a, b) => b.count - a.count);
  const bySource = bySourceRaw
    .map((item) => ({ source: item.source, count: item._count._all }))
    .sort((a, b) => b.count - a.count);

  const inProgress = byStatus
    .filter((item) => !["NEW", "CONVERTED", "LOST"].includes(item.status))
    .reduce((total, item) => total + item.count, 0);

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Leads" value={totalLeads} icon={Users} color="bg-blue-600" />
          <StatCard title="New Today" value={newToday} icon={TrendingUp} color="bg-emerald-600" />
          <StatCard title="New This Week" value={newThisWeek} icon={Calendar} color="bg-violet-600" />
          <StatCard title="In Progress" value={inProgress} icon={Activity} color="bg-amber-500" />
        </section>

        <DashboardCharts bySource={bySource} byStatus={byStatus} />

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="text-lg font-semibold text-slate-900">Recent Leads</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Source</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                      <Link href={`/admin/leads/${lead.id}`} className="block w-full">
                        {lead.firstName} {lead.lastName}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                      <Link href={`/admin/leads/${lead.id}`} className="block w-full">
                        {lead.email}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="block w-full">
                        <StatusBadge status={lead.source} type="source" />
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="block w-full">
                        <StatusBadge status={lead.status} type="lead" />
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                      <Link href={`/admin/leads/${lead.id}`} className="block w-full">
                        {new Date(lead.createdAt).toISOString().slice(0, 10)}
                      </Link>
                    </td>
                  </tr>
                ))}

                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                      No leads yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
