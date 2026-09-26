"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type CountBySource = {
  source: string;
  count: number;
};

type CountByStatus = {
  status: string;
  count: number;
};

type DashboardChartsProps = {
  bySource: CountBySource[];
  byStatus: CountByStatus[];
};

const sourceColors: Record<string, string> = {
  APPLY_NOW: "#2563eb",
  SCHOLARSHIP_CHECK: "#7c3aed",
  PROGRAM_FINDER: "#0d9488",
  CONTACT_ENQUIRY: "#ea580c",
  EVENT_REGISTRATION: "#16a34a",
};

const statusColors: Record<string, string> = {
  NEW: "#2563eb",
  ASSIGNED: "#7c3aed",
  CONTACTED: "#ca8a04",
  NURTURING: "#ea580c",
  QUALIFIED: "#0d9488",
  CONVERTED: "#16a34a",
  DISQUALIFIED: "#64748b",
  LOST: "#dc2626",
};

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join(" ");
}

export function DashboardCharts({ bySource, byStatus }: DashboardChartsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sourceData = bySource.map((item) => ({
    name: formatLabel(item.source),
    count: item.count,
    color: sourceColors[item.source] ?? "#64748b",
  }));

  const statusData = byStatus.map((item) => ({
    name: formatLabel(item.status),
    count: item.count,
    color: statusColors[item.status] ?? "#64748b",
  }));

  if (!mounted) {
    return (
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Leads By Source</h2>
          <div className="h-[300px] w-full rounded-lg bg-slate-50" />
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Leads By Status</h2>
          <div className="h-[300px] w-full rounded-lg bg-slate-50" />
        </article>
      </section>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Leads By Source</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sourceData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={70} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count">
                {sourceData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Leads By Status</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="count"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
              >
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}