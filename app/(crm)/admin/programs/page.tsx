"use client";

import { useEffect, useState } from "react";

import { AdminLayout } from "@/components/admin/admin-layout";

type ProgramListItem = {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string | null;
  durationMonths: number;
  tuitionCents: number | null;
  isActive?: boolean;
};

type ProgramsResponse = {
  success?: boolean;
  data?: ProgramListItem[];
};

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<ProgramListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toggleUnavailable, setToggleUnavailable] = useState(false);
  const [toggleError, setToggleError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPrograms() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/programs", { cache: "no-store" });
        const payload = (await response.json()) as ProgramsResponse;

        if (!active) {
          return;
        }

        if (!response.ok || !payload?.success || !payload.data) {
          throw new Error("Could not load programs.");
        }

        setPrograms(payload.data);
      } catch {
        if (active) {
          setError("Could not load programs.");
          setPrograms([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPrograms();

    return () => {
      active = false;
    };
  }, []);

  async function handleToggleProgram(
    programSlug: string,
    currentIsActive: boolean,
  ) {
    if (toggleUnavailable) {
      return;
    }

    setToggleError(null);

    try {
      const response = await fetch(`/api/programs/${programSlug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentIsActive }),
      });

      if (response.status === 404 || response.status === 405) {
        setToggleUnavailable(true);
        setToggleError(
          "Toggle endpoint unavailable. Displaying programs in read-only mode.",
        );
        return;
      }

      if (!response.ok) {
        setToggleError("Could not update program status.");
        return;
      }

      setPrograms((previous) =>
        previous.map((program) =>
          program.slug === programSlug
            ? {
                ...program,
                isActive: !currentIsActive,
              }
            : program,
        ),
      );
    } catch {
      setToggleError("Could not update program status.");
    }
  }

  return (
    <AdminLayout title="Programs">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Programs</h2>
          <button
            type="button"
            onClick={() => window.alert("Coming soon")}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Add Program
          </button>
        </div>

        {error ? (
          <p className="text-sm font-medium text-rose-600">{error}</p>
        ) : null}
        {toggleError ? (
          <p className="text-sm font-medium text-amber-700">{toggleError}</p>
        ) : null}

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">
                    Fees
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">
                    Active
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      Loading programs...
                    </td>
                  </tr>
                ) : null}

                {!loading && programs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No programs found.
                    </td>
                  </tr>
                ) : null}

                {!loading
                  ? programs.map((program) => {
                      const active = program.isActive ?? true;
                      return (
                        <tr key={program.id} className="hover:bg-slate-50">
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                            {program.title}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                            {program.durationMonths} months
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                            {program.tuitionCents == null
                              ? "Contact Admissions"
                              : `₹${(program.tuitionCents / 100).toLocaleString("en-IN")}`}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold ${
                                active
                                  ? "bg-green-100 text-green-700"
                                  : "bg-slate-200 text-slate-700"
                              }`}
                            >
                              {active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            {toggleUnavailable ? (
                              <span className="text-sm font-medium text-slate-500">
                                Read-only
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  handleToggleProgram(program.slug, active)
                                }
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                              >
                                Toggle Active
                              </button>
                            )}
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
