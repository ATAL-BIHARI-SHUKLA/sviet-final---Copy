import { Briefcase, Download } from "lucide-react";

import { AdminLayout } from "@/components/admin/admin-layout";
import { StatCard } from "@/components/admin/stat-card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CareersAdminPage() {
  const applications = await prisma.careerApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      lead: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });

  const total = applications.length;
  const thisWeek = applications.filter(
    (a) =>
      new Date(a.createdAt) >=
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length;

  return (
    <AdminLayout title="Career Applications">
      <div className="space-y-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Applications"
            value={total}
            icon={Briefcase}
            color="bg-blue-600"
          />
          <StatCard
            title="This Week"
            value={thisWeek}
            icon={Briefcase}
            color="bg-emerald-600"
          />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="text-lg font-semibold text-slate-900">
              All Applications
            </h2>
          </div>

          {applications.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-slate-500">
              No career applications yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Name",
                      "Email",
                      "Phone",
                      "Position",
                      "Qualifications",
                      "Exp (yrs)",
                      "Resume",
                      "Status",
                      "Applied",
                    ].map((h) => (
                      <th
                        key={h}
                        className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                        {app.lead.firstName} {app.lead.lastName}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        <a
                          href={`mailto:${app.lead.email}`}
                          className="hover:underline"
                        >
                          {app.lead.email}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                        {app.lead.phone ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        {app.position}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {app.qualifications}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-center text-slate-700">
                        {app.yearsExperience}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {app.resumeUrl ? (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                            title={app.resumeFileName ?? "Resume"}
                          >
                            <Download className="h-3.5 w-3.5" />
                            View
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                          {app.lead.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                        {new Date(app.createdAt).toISOString().slice(0, 10)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Cover letters drawer (expandable rows) */}
        {applications.some((a) => a.coverLetter) && (
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Cover Letters
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {applications
                .filter((a) => a.coverLetter)
                .map((app) => (
                  <div key={app.id} className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {app.lead.firstName} {app.lead.lastName} —{" "}
                      <span className="font-normal text-slate-600">
                        {app.position}
                      </span>
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                      {app.coverLetter}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </AdminLayout>
  );
}
