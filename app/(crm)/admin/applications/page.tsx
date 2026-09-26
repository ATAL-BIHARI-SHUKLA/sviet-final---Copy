"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { AdminLayout } from "@/components/admin/admin-layout";
import { StatusBadge } from "@/components/admin/status-badge";

type ApplicationListItem = {
  id: string;
  applicationNo: string;
  status: string;
  submittedAt: string | null;
  applicant: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  program: {
    id: string;
    title: string;
    slug: string;
  };
  intake: {
    id: string;
    termCode: string;
    startsOn: string;
  };
  assignedCounselor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  lead: {
    id: string;
  } | null;
};

type ApplicationsResponse = {
  ok?: boolean;
  data?: ApplicationListItem[];
};

export default function AdminApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<ApplicationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadApplications() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/applications", { cache: "no-store" });
        const payload = (await response.json()) as ApplicationsResponse;

        if (!active) {
          return;
        }

        if (!response.ok || !payload?.ok || !payload.data) {
          throw new Error("Could not load applications.");
        }

        setApplications(payload.data);
      } catch {
        if (active) {
          setError("Could not load applications.");
          setApplications([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadApplications();

    return () => {
      active = false;
    };
  }, []);

  return (
    <AdminLayout title="Applications">
      <div className="space-y-4">
        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Application No</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Applicant Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Program</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Intake</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Submitted</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Assigned To</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                      Loading applications...
                    </td>
                  </tr>
                ) : null}

                {!loading && applications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                      No applications found.
                    </td>
                  </tr>
                ) : null}

                {!loading
                  ? applications.map((application) => {
                      const clickable = Boolean(application.lead?.id);
                      return (
                        <tr
                          key={application.id}
                          className={clickable ? "cursor-pointer hover:bg-slate-50" : ""}
                          onClick={
                            clickable
                              ? () => {
                                  router.push(`/admin/leads/${application.lead?.id}`);
                                }
                              : undefined
                          }
                        >
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">{application.applicationNo}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                            {application.applicant.firstName} {application.applicant.lastName}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-slate-700">{application.program.title}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-slate-700">{application.intake.termCode}</td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <StatusBadge status={application.status} type="application" />
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                            {application.submittedAt ? format(new Date(application.submittedAt), "dd MMM yyyy") : "-"}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                            {application.assignedCounselor
                              ? `${application.assignedCounselor.firstName} ${application.assignedCounselor.lastName}`
                              : "-"}
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}