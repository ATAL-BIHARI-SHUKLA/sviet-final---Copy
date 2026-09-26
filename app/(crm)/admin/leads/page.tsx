// Leads management disabled — all leads now go directly to NoPaperForms (NPF).
// Original page content is commented out below.

import { AdminLayout } from "@/components/admin/admin-layout";

export default function AdminLeadsPage() {
  return (
    <AdminLayout title="Leads">
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-8 py-10 max-w-lg">
          <p className="text-2xl font-bold text-amber-800 mb-3">Leads Moved to NPF</p>
          <p className="text-sm text-amber-700 leading-relaxed">
            All enquiries and leads are now collected directly through{" "}
            <strong>NoPaperForms (NPF)</strong>. Please log in to your NPF dashboard
            to view and manage leads.
          </p>
          <a
            href="https://app.nopaperforms.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition"
          >
            Open NPF Dashboard ↗
          </a>
        </div>
      </div>
    </AdminLayout>
  );
}
