"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { PlacementTrendYearRow } from "@/lib/dal/placements";

type Props = {
  trends: PlacementTrendYearRow[];
};

const AXIS_STYLE = { fill: "#4B5563", fontSize: 12 };

const TOOLTIP_STYLE = {
  backgroundColor: "#fff",
  border: "1px solid #DCE7FF",
  borderRadius: "8px",
};

export function PlacementYearwiseTrendsSection({ trends }: Props) {
  const companiesData = trends.map((t) => ({ year: t.year, companies: t.companiesVisited }));
  const highestPackageData = trends.map((t) => ({ year: t.year, lpa: t.highestPackageLpa }));
  const averagePackageData = trends.map((t) => ({ year: t.year, lpa: t.averagePackageLpa }));

  const latest = trends[trends.length - 1];
  const companiesMax = Math.max(...trends.map((t) => t.companiesVisited));
  const companiesDomain: [number, number] = [
    Math.floor(Math.min(...trends.map((t) => t.companiesVisited)) * 0.9),
    Math.ceil(companiesMax * 1.1),
  ];
  const highestMax = Math.max(...trends.map((t) => t.highestPackageLpa));
  const avgMin = Math.floor(Math.min(...trends.map((t) => t.averagePackageLpa)));
  const avgMax = Math.ceil(Math.max(...trends.map((t) => t.averagePackageLpa)) * 1.1);

  return (
    <section className="px-4 py-10 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">
            Placement Analytics
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
            Year-Wise Placement Volume &amp; Package Trends
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
            A transparent, year-on-year view of placement volumes and salary
            growth based on aggregate records across all SVGOI colleges.
          </p>
          <p className="mt-2 text-sm text-[#9ca3af]">
            * Data represents aggregate placement outcomes across all colleges
            under SVGOI Group.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Graph 1 — Companies Visited */}
          <article className="rounded-2xl border border-[#DCE7FF] bg-white p-4 md:p-6">
            <h3 className="text-base font-semibold text-[#111827]">
              Companies Visited
            </h3>
            <p className="mt-0.5 text-sm text-[#9ca3af]">
              Year-wise recruiter count
            </p>
            <div className="mt-5 h-56 w-full sm:h-64">
              <ResponsiveContainer>
                <BarChart data={companiesData} barSize={28}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f7941d" stopOpacity={1} />
                      <stop offset="100%" stopColor="#ffb347" stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
                  <YAxis
                    domain={companiesDomain}
                    tick={AXIS_STYLE}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(value) => [`${value} companies`, "Recruiters"]}
                  />
                  <Bar dataKey="companies" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          {/* Graph 2 — Highest Package */}
          <article className="rounded-2xl border border-[#DCE7FF] bg-white p-4 md:p-6">
            <h3 className="text-base font-semibold text-[#111827]">
              Highest Package
            </h3>
            <p className="mt-0.5 text-sm text-[#9ca3af]">Peak offer per year (LPA)</p>
            <div className="mt-5 h-56 w-full sm:h-64">
              <ResponsiveContainer>
                <LineChart data={highestPackageData}>
                  <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                  <XAxis dataKey="year" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
                  <YAxis
                    domain={[0, Math.ceil(highestMax * 1.1)]}
                    tick={AXIS_STYLE}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}`}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(value) => [`${value} LPA`, "Highest Package"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="lpa"
                    stroke="#f7941d"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#f7941d", strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                    name="Highest Package"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          {/* Graph 3 — Average Package */}
          <article className="rounded-2xl border border-[#DCE7FF] bg-white p-4 md:p-6">
            <h3 className="text-base font-semibold text-[#111827]">
              Average Package
            </h3>
            <p className="mt-0.5 text-sm text-[#9ca3af]">Mean CTC trend (LPA)</p>
            <div className="mt-5 h-56 w-full sm:h-64">
              <ResponsiveContainer>
                <AreaChart data={averagePackageData}>
                  <defs>
                    <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                  <XAxis dataKey="year" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
                  <YAxis
                    domain={[Math.max(0, avgMin - 1), avgMax]}
                    tick={AXIS_STYLE}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}`}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(value) => [`${value} LPA`, "Average Package"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="lpa"
                    stroke="#2563EB"
                    fill="url(#avgGrad)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#2563EB", strokeWidth: 0 }}
                    name="Average Package"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>
        </div>

        {/* Summary strip — always reflects latest year in DB */}
        {latest && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <article className="rounded-xl border border-[#DCE7FF] bg-white p-4">
              <p className="text-sm uppercase tracking-[0.14em] text-[#6B7280]">
                Companies Visited ({latest.year})
              </p>
              <p className="mt-2 text-2xl font-bold text-[#111827]">
                {latest.companiesVisited}+
              </p>
            </article>
            <article className="rounded-xl border border-[#DCE7FF] bg-white p-4">
              <p className="text-sm uppercase tracking-[0.14em] text-[#6B7280]">
                Highest Package ({latest.year})
              </p>
              <p className="mt-2 text-2xl font-bold text-[#111827]">
                {latest.highestPackageLpa} LPA
              </p>
            </article>
            <article className="rounded-xl border border-[#DCE7FF] bg-white p-4">
              <p className="text-sm uppercase tracking-[0.14em] text-[#6B7280]">
                Average Package ({latest.year})
              </p>
              <p className="mt-2 text-2xl font-bold text-[#111827]">
                {latest.averagePackageLpa} LPA
              </p>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
