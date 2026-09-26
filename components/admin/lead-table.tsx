import { format } from "date-fns";

import { StatusBadge } from "@/components/admin/status-badge";

export type LeadTableRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  source: string;
  status: string;
  createdAt: string | Date;
  intendedProgram?: {
    title: string;
  } | null;
};

type LeadTableProps = {
  leads: LeadTableRow[];
  loading: boolean;
  onRowClick?: (lead: LeadTableRow) => void;
};

export function LeadTable({ leads, loading, onRowClick }: LeadTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Phone</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Source</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Program</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                  Loading leads...
                </td>
              </tr>
            ) : null}

            {!loading && leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                  No leads found.
                </td>
              </tr>
            ) : null}

            {!loading
              ? leads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => onRowClick?.(lead)}
                    className={onRowClick ? "cursor-pointer hover:bg-slate-50" : ""}
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                      {lead.firstName} {lead.lastName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">{lead.email}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">{lead.phone ?? "-"}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusBadge status={lead.source} type="source" />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusBadge status={lead.status} type="lead" />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">{lead.intendedProgram?.title ?? "-"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                      {format(new Date(lead.createdAt), "dd MMM yyyy")}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}