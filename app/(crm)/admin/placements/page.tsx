"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";

// ─── shared types ─────────────────────────────────────────────────────────────

type Tab = "records" | "trends" | "banner" | "stats";

type PlacementRecord = {
  id: string;
  name: string;
  year: number;
  company: string;
  packageValue: number;
  packageLabel: string;
  imageSrc: string | null;
  isShowcase: boolean;
  sortOrder: number;
  isActive: boolean;
};

type TrendYear = {
  id: string;
  year: string;
  companiesVisited: number;
  highestPackageLpa: number;
  averagePackageLpa: number;
};

type Banner = {
  id: string;
  badgeText: string;
  studentName: string;
  company: string;
  packageLabel: string;
  batchYear: string;
  imageSrc: string;
  imageAlt: string;
  isActive: boolean;
};

type KeyStat = {
  id: string;
  value: string;
  label: string;
  sortOrder: number;
};

// ─── shared helpers ───────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400";
const labelCls =
  "block text-xs font-semibold uppercase tracking-wide text-slate-500";

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function ErrorMsg({ msg }: { msg: string | null }) {
  if (!msg) return null;
  return <p className="text-sm font-medium text-rose-600">{msg}</p>;
}

// ─── Records tab ─────────────────────────────────────────────────────────────

type RecordForm = {
  name: string;
  year: string;
  company: string;
  packageValue: string;
  packageLabel: string;
  imageSrc: string;
  isShowcase: boolean;
  sortOrder: string;
  isActive: boolean;
};

const DEFAULT_RECORD_FORM: RecordForm = {
  name: "",
  year: String(new Date().getFullYear()),
  company: "",
  packageValue: "",
  packageLabel: "",
  imageSrc: "",
  isShowcase: false,
  sortOrder: "0",
  isActive: true,
};

function RecordsTab() {
  const [records, setRecords] = useState<PlacementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<RecordForm>(DEFAULT_RECORD_FORM);
  const [formError, setFormError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/crm/placements/records", { cache: "no-store" });
      const payload = await res.json() as { ok?: boolean; data?: PlacementRecord[]; error?: { message?: string } };
      if (!res.ok || !payload.ok) throw new Error(payload.error?.message ?? "Failed to load.");
      setRecords(payload.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  const years = [...new Set(records.map((r) => r.year))].sort((a, b) => b - a);
  const filtered = records.filter((r) => {
    if (yearFilter !== "all" && r.year !== Number(yearFilter)) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.company.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function startCreate() {
    setEditingId(null);
    setForm(DEFAULT_RECORD_FORM);
    setFormError(null);
    setShowForm(true);
  }

  function startEdit(r: PlacementRecord) {
    setEditingId(r.id);
    setForm({
      name: r.name,
      year: String(r.year),
      company: r.company,
      packageValue: String(r.packageValue),
      packageLabel: r.packageLabel,
      imageSrc: r.imageSrc ?? "",
      isShowcase: r.isShowcase,
      sortOrder: String(r.sortOrder),
      isActive: r.isActive,
    });
    setFormError(null);
    setShowForm(true);
  }

  function resetForm() {
    setEditingId(null);
    setShowForm(false);
    setForm(DEFAULT_RECORD_FORM);
    setFormError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    try {
      const body = {
        name: form.name.trim(),
        year: Number(form.year),
        company: form.company.trim(),
        packageValue: Number(form.packageValue),
        packageLabel: form.packageLabel.trim(),
        imageSrc: form.imageSrc.trim() || undefined,
        isShowcase: form.isShowcase,
        sortOrder: Number(form.sortOrder),
        isActive: form.isActive,
      };
      const res = await fetch(
        editingId ? `/api/crm/placements/records/${editingId}` : "/api/crm/placements/records",
        { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
      );
      const payload = await res.json() as { ok?: boolean; error?: { message?: string } };
      if (!res.ok || !payload.ok) { setFormError(payload.error?.message ?? "Could not save."); return; }
      await load();
      resetForm();
    } catch {
      setFormError("Could not save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this placement record?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/crm/placements/records/${id}`, { method: "DELETE" });
      const payload = await res.json() as { ok?: boolean; error?: { message?: string } };
      if (!res.ok || !payload.ok) { setError(payload.error?.message ?? "Could not delete."); return; }
      setRecords((prev) => prev.filter((r) => r.id !== id));
      if (editingId === id) resetForm();
    } catch {
      setError("Could not delete.");
    } finally {
      setDeletingId(null);
    }
  }

  async function toggleShowcase(r: PlacementRecord) {
    try {
      await fetch(`/api/crm/placements/records/${r.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isShowcase: !r.isShowcase }),
      });
      setRecords((prev) => prev.map((rec) => rec.id === r.id ? { ...rec, isShowcase: !r.isShowcase } : rec));
    } catch {
      setError("Could not toggle marquee.");
    }
  }

  return (
    <div className={`relative ${showForm ? "xl:pr-136" : ""}`}>
      <section className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Placement Records</h2>
          <button type="button" onClick={startCreate} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Add Record
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or company…"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 w-56"
          />
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
          >
            <option value="all">All years</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <ErrorMsg msg={error} />

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["Name", "Year", "Company", "Package", "Marquee", "Active", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-500">Loading…</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-500">No records found.</td></tr>
                ) : filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{r.name}</td>
                    <td className="px-4 py-3 text-slate-600">{r.year}</td>
                    <td className="px-4 py-3 text-slate-600">{r.company}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{r.packageLabel}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleShowcase(r)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition ${r.isShowcase ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}
                      >
                        {r.isShowcase ? "Yes" : "No"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.isActive ? "bg-green-50 text-green-700" : "bg-rose-50 text-rose-600"}`}>
                        {r.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => startEdit(r)} className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100">Edit</button>
                        <button type="button" onClick={() => handleDelete(r.id)} disabled={deletingId === r.id} className="rounded-md border border-rose-200 px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60">
                          {deletingId === r.id ? "…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {showForm && (
        <>
          <button type="button" aria-label="Close form" className="fixed inset-0 top-16.25 z-40 bg-slate-900/40 xl:cursor-default" onClick={resetForm} />
          <aside className="fixed right-0 top-16.25 z-50 h-[calc(100vh-65px)] w-full overflow-y-auto border-l border-slate-200 bg-white shadow-2xl sm:max-w-md lg:max-w-lg xl:w-136">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h3 className="text-base font-semibold text-slate-900">{editingId ? "Edit Record" : "Add Placement Record"}</h3>
              <button type="button" onClick={resetForm} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Close</button>
            </div>
            <form className="space-y-4 px-5 py-4" onSubmit={handleSubmit}>
              <FormField label="Student Name *">
                <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required className={inputCls} placeholder="Full name" />
              </FormField>
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="Year *">
                  <input value={form.year} onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))} required type="number" min="2000" max="2100" className={inputCls} />
                </FormField>
                <FormField label="Package Value (LPA) *">
                  <input value={form.packageValue} onChange={(e) => setForm((p) => ({ ...p, packageValue: e.target.value }))} required type="number" step="0.1" min="0" className={inputCls} placeholder="e.g. 12" />
                </FormField>
              </div>
              <FormField label="Company *">
                <input value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} required className={inputCls} placeholder="Company name" />
              </FormField>
              <FormField label="Package Label *">
                <input value={form.packageLabel} onChange={(e) => setForm((p) => ({ ...p, packageLabel: e.target.value }))} required className={inputCls} placeholder="e.g. 12 LPA" />
              </FormField>
              <FormField label="Photo URL (for marquee card)">
                <input value={form.imageSrc} onChange={(e) => setForm((p) => ({ ...p, imageSrc: e.target.value }))} className={inputCls} placeholder="/assets/img/stu/name.png" />
              </FormField>
              <FormField label="Sort Order (marquee position)">
                <input value={form.sortOrder} onChange={(e) => setForm((p) => ({ ...p, sortOrder: e.target.value }))} type="number" min="0" className={inputCls} />
              </FormField>
              <div className="flex flex-wrap gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                  <input type="checkbox" checked={form.isShowcase} onChange={(e) => setForm((p) => ({ ...p, isShowcase: e.target.checked }))} />
                  <span className="font-semibold">Show in marquee</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                  <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} />
                  <span className="font-semibold">Active (visible on site)</span>
                </label>
              </div>
              <ErrorMsg msg={formError} />
              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={saving} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
                  {saving ? "Saving…" : editingId ? "Update" : "Add Record"}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button>
                )}
              </div>
            </form>
          </aside>
        </>
      )}
    </div>
  );
}

// ─── Trends tab ───────────────────────────────────────────────────────────────

type TrendForm = {
  year: string;
  companiesVisited: string;
  highestPackageLpa: string;
  averagePackageLpa: string;
};

const DEFAULT_TREND_FORM: TrendForm = { year: "", companiesVisited: "", highestPackageLpa: "", averagePackageLpa: "" };

function TrendsTab() {
  const [trends, setTrends] = useState<TrendYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingYear, setDeletingYear] = useState<string | null>(null);
  const [editingYear, setEditingYear] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<TrendForm>(DEFAULT_TREND_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/crm/placements/trends", { cache: "no-store" });
      const payload = await res.json() as { ok?: boolean; data?: TrendYear[]; error?: { message?: string } };
      if (!res.ok || !payload.ok) throw new Error(payload.error?.message ?? "Failed to load.");
      setTrends(payload.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  function startCreate() {
    setEditingYear(null);
    setForm(DEFAULT_TREND_FORM);
    setFormError(null);
    setShowForm(true);
  }

  function startEdit(t: TrendYear) {
    setEditingYear(t.year);
    setForm({ year: t.year, companiesVisited: String(t.companiesVisited), highestPackageLpa: String(t.highestPackageLpa), averagePackageLpa: String(t.averagePackageLpa) });
    setFormError(null);
    setShowForm(true);
  }

  function resetForm() {
    setEditingYear(null);
    setShowForm(false);
    setForm(DEFAULT_TREND_FORM);
    setFormError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    try {
      const body = { year: form.year.trim(), companiesVisited: Number(form.companiesVisited), highestPackageLpa: Number(form.highestPackageLpa), averagePackageLpa: Number(form.averagePackageLpa) };
      const res = editingYear
        ? await fetch(`/api/crm/placements/trends/${editingYear}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        : await fetch("/api/crm/placements/trends", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const payload = await res.json() as { ok?: boolean; error?: { message?: string } };
      if (!res.ok || !payload.ok) { setFormError(payload.error?.message ?? "Could not save."); return; }
      await load();
      resetForm();
    } catch {
      setFormError("Could not save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(year: string) {
    if (!window.confirm(`Delete trend data for ${year}?`)) return;
    setDeletingYear(year);
    try {
      const res = await fetch(`/api/crm/placements/trends/${year}`, { method: "DELETE" });
      const payload = await res.json() as { ok?: boolean; error?: { message?: string } };
      if (!res.ok || !payload.ok) { setError(payload.error?.message ?? "Could not delete."); return; }
      setTrends((prev) => prev.filter((t) => t.year !== year));
      if (editingYear === year) resetForm();
    } catch {
      setError("Could not delete.");
    } finally {
      setDeletingYear(null);
    }
  }

  return (
    <div className={`relative ${showForm ? "xl:pr-136" : ""}`}>
      <section className="min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Year-wise Trend Data</h2>
            <p className="text-sm text-slate-500">Controls the 3 graphs on the placements page.</p>
          </div>
          <button type="button" onClick={startCreate} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Add Year</button>
        </div>

        <ErrorMsg msg={error} />

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Year", "Companies Visited", "Highest Package (LPA)", "Avg Package (LPA)", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">Loading…</td></tr>
              ) : trends.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">No trend data yet.</td></tr>
              ) : trends.map((t) => (
                <tr key={t.year} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-900">{t.year}</td>
                  <td className="px-4 py-3 text-slate-700">{t.companiesVisited}</td>
                  <td className="px-4 py-3 text-slate-700">{t.highestPackageLpa} LPA</td>
                  <td className="px-4 py-3 text-slate-700">{t.averagePackageLpa} LPA</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => startEdit(t)} className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100">Edit</button>
                      <button type="button" onClick={() => handleDelete(t.year)} disabled={deletingYear === t.year} className="rounded-md border border-rose-200 px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60">
                        {deletingYear === t.year ? "…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showForm && (
        <>
          <button type="button" aria-label="Close form" className="fixed inset-0 top-16.25 z-40 bg-slate-900/40 xl:cursor-default" onClick={resetForm} />
          <aside className="fixed right-0 top-16.25 z-50 h-[calc(100vh-65px)] w-full overflow-y-auto border-l border-slate-200 bg-white shadow-2xl sm:max-w-md lg:max-w-lg xl:w-136">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h3 className="text-base font-semibold text-slate-900">{editingYear ? `Edit ${editingYear}` : "Add Trend Year"}</h3>
              <button type="button" onClick={resetForm} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Close</button>
            </div>
            <form className="space-y-4 px-5 py-4" onSubmit={handleSubmit}>
              <FormField label="Year *">
                <input value={form.year} onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))} required disabled={!!editingYear} placeholder="e.g. 2027" className={inputCls} />
              </FormField>
              <FormField label="Companies Visited *">
                <input value={form.companiesVisited} onChange={(e) => setForm((p) => ({ ...p, companiesVisited: e.target.value }))} required type="number" min="0" className={inputCls} placeholder="350" />
              </FormField>
              <FormField label="Highest Package (LPA) *">
                <input value={form.highestPackageLpa} onChange={(e) => setForm((p) => ({ ...p, highestPackageLpa: e.target.value }))} required type="number" step="0.1" min="0" className={inputCls} placeholder="60" />
              </FormField>
              <FormField label="Average Package (LPA) *">
                <input value={form.averagePackageLpa} onChange={(e) => setForm((p) => ({ ...p, averagePackageLpa: e.target.value }))} required type="number" step="0.1" min="0" className={inputCls} placeholder="5.8" />
              </FormField>
              <ErrorMsg msg={formError} />
              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={saving} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
                  {saving ? "Saving…" : editingYear ? "Update" : "Add Year"}
                </button>
                {editingYear && <button type="button" onClick={resetForm} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button>}
              </div>
            </form>
          </aside>
        </>
      )}
    </div>
  );
}

// ─── Banner tab ───────────────────────────────────────────────────────────────

type BannerForm = {
  badgeText: string;
  studentName: string;
  company: string;
  packageLabel: string;
  batchYear: string;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_BANNER_FORM: BannerForm = {
  badgeText: "Top Placement · 2026",
  studentName: "",
  company: "",
  packageLabel: "",
  batchYear: "2026 Batch",
  imageSrc: "",
  imageAlt: "",
};

function BannerTab() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<BannerForm>(DEFAULT_BANNER_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/crm/placements/banner", { cache: "no-store" });
      const payload = await res.json() as { ok?: boolean; data?: Banner[]; error?: { message?: string } };
      if (!res.ok || !payload.ok) throw new Error(payload.error?.message ?? "Failed to load.");
      setBanners(payload.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  function startCreate() {
    setEditingId(null);
    setForm(DEFAULT_BANNER_FORM);
    setFormError(null);
    setShowForm(true);
  }

  function startEdit(b: Banner) {
    setEditingId(b.id);
    setForm({ badgeText: b.badgeText, studentName: b.studentName, company: b.company, packageLabel: b.packageLabel, batchYear: b.batchYear, imageSrc: b.imageSrc, imageAlt: b.imageAlt });
    setFormError(null);
    setShowForm(true);
  }

  function resetForm() {
    setEditingId(null);
    setShowForm(false);
    setForm(DEFAULT_BANNER_FORM);
    setFormError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    try {
      const body = { ...form, isActive: true };
      const res = editingId
        ? await fetch(`/api/crm/placements/banner/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        : await fetch("/api/crm/placements/banner", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const payload = await res.json() as { ok?: boolean; error?: { message?: string } };
      if (!res.ok || !payload.ok) { setFormError(payload.error?.message ?? "Could not save."); return; }
      await load();
      resetForm();
    } catch {
      setFormError("Could not save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleActivate(id: string) {
    try {
      await fetch(`/api/crm/placements/banner/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: true }) });
      await load();
    } catch {
      setError("Could not activate banner.");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this banner?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/crm/placements/banner/${id}`, { method: "DELETE" });
      const payload = await res.json() as { ok?: boolean; error?: { message?: string } };
      if (!res.ok || !payload.ok) { setError(payload.error?.message ?? "Could not delete."); return; }
      setBanners((prev) => prev.filter((b) => b.id !== id));
      if (editingId === id) resetForm();
    } catch {
      setError("Could not delete.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className={`relative ${showForm ? "xl:pr-136" : ""}`}>
      <section className="min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Highlight Banner</h2>
            <p className="text-sm text-slate-500">The large "Top Placement" banner on the placements page. Only one can be active.</p>
          </div>
          <button type="button" onClick={startCreate} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">New Banner</button>
        </div>

        <ErrorMsg msg={error} />

        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-slate-500">Loading…</p>
          ) : banners.length === 0 ? (
            <p className="text-sm text-slate-500">No banners yet. Using built-in fallback.</p>
          ) : banners.map((b) => (
            <div key={b.id} className={`rounded-xl border p-4 ${b.isActive ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900">{b.studentName.replace("\n", " / ")}</p>
                    {b.isActive && <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">ACTIVE</span>}
                  </div>
                  <p className="mt-0.5 text-sm text-slate-600">{b.company} · {b.packageLabel} · {b.batchYear}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{b.badgeText}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!b.isActive && (
                    <button type="button" onClick={() => handleActivate(b.id)} className="rounded-md border border-blue-300 px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50">
                      Set Active
                    </button>
                  )}
                  <button type="button" onClick={() => startEdit(b)} className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100">Edit</button>
                  <button type="button" onClick={() => handleDelete(b.id)} disabled={deletingId === b.id} className="rounded-md border border-rose-200 px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60">
                    {deletingId === b.id ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showForm && (
        <>
          <button type="button" aria-label="Close form" className="fixed inset-0 top-16.25 z-40 bg-slate-900/40 xl:cursor-default" onClick={resetForm} />
          <aside className="fixed right-0 top-16.25 z-50 h-[calc(100vh-65px)] w-full overflow-y-auto border-l border-slate-200 bg-white shadow-2xl sm:max-w-md lg:max-w-lg xl:w-136">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h3 className="text-base font-semibold text-slate-900">{editingId ? "Edit Banner" : "New Banner"}</h3>
              <button type="button" onClick={resetForm} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Close</button>
            </div>
            <form className="space-y-4 px-5 py-4" onSubmit={handleSubmit}>
              <FormField label="Badge Text *">
                <input value={form.badgeText} onChange={(e) => setForm((p) => ({ ...p, badgeText: e.target.value }))} required className={inputCls} placeholder="Top Placement · 2027" />
              </FormField>
              <FormField label="Student Name * (use \n for line break)">
                <input value={form.studentName} onChange={(e) => setForm((p) => ({ ...p, studentName: e.target.value }))} required className={inputCls} placeholder="Laxmi\nVaishnavi" />
                <p className="mt-1 text-xs text-slate-400">Use \n to split name across two lines on the banner.</p>
              </FormField>
              <FormField label="Company *">
                <input value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} required className={inputCls} placeholder="Caelius Consulting" />
              </FormField>
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="Package Label *">
                  <input value={form.packageLabel} onChange={(e) => setForm((p) => ({ ...p, packageLabel: e.target.value }))} required className={inputCls} placeholder="19 LPA" />
                </FormField>
                <FormField label="Batch Year *">
                  <input value={form.batchYear} onChange={(e) => setForm((p) => ({ ...p, batchYear: e.target.value }))} required className={inputCls} placeholder="2026 Batch" />
                </FormField>
              </div>
              <FormField label="Student Photo URL *">
                <input value={form.imageSrc} onChange={(e) => setForm((p) => ({ ...p, imageSrc: e.target.value }))} required className={inputCls} placeholder="/assets/img/students/photo.png" />
              </FormField>
              <FormField label="Image Alt Text *">
                <input value={form.imageAlt} onChange={(e) => setForm((p) => ({ ...p, imageAlt: e.target.value }))} required className={inputCls} placeholder="Student name — package at company" />
              </FormField>
              <ErrorMsg msg={formError} />
              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={saving} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
                  {saving ? "Saving…" : editingId ? "Update Banner" : "Create & Activate"}
                </button>
                {editingId && <button type="button" onClick={resetForm} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button>}
              </div>
            </form>
          </aside>
        </>
      )}
    </div>
  );
}

// ─── Key Stats tab ────────────────────────────────────────────────────────────

function StatsTab() {
  const [stats, setStats] = useState<KeyStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [drafts, setDrafts] = useState<{ value: string; label: string }[]>([]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/crm/placements/key-stats", { cache: "no-store" });
      const payload = await res.json() as { ok?: boolean; data?: KeyStat[]; error?: { message?: string } };
      if (!res.ok || !payload.ok) throw new Error(payload.error?.message ?? "Failed to load.");
      const data = payload.data ?? [];
      setStats(data);
      setDrafts(data.map((s) => ({ value: s.value, label: s.label })));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  function updateDraft(index: number, field: "value" | "label", val: string) {
    setDrafts((prev) => prev.map((d, i) => i === index ? { ...d, [field]: val } : d));
  }

  function addStat() {
    setDrafts((prev) => [...prev, { value: "", label: "" }]);
  }

  function removeStat(index: number) {
    setDrafts((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (drafts.some((d) => !d.value.trim() || !d.label.trim())) {
      setError("All stats must have both a value and a label.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const body = { stats: drafts.map((d, i) => ({ value: d.value.trim(), label: d.label.trim(), sortOrder: i })) };
      const res = await fetch("/api/crm/placements/key-stats", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const payload = await res.json() as { ok?: boolean; error?: { message?: string } };
      if (!res.ok || !payload.ok) { setError(payload.error?.message ?? "Could not save."); return; }
      await load();
    } catch {
      setError("Could not save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Key Stats</h2>
        <p className="text-sm text-slate-500">The headline numbers shown in the "Placement Achievements" strip (e.g. 60 LPA, 2,200+ companies).</p>
      </div>

      <ErrorMsg msg={error} />

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <form onSubmit={handleSave} className="space-y-3">
          {drafts.map((d, i) => (
            <div key={i} className="flex items-end gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex-1">
                <label className={labelCls}>Value</label>
                <input value={d.value} onChange={(e) => updateDraft(i, "value", e.target.value)} className={`mt-1 ${inputCls}`} placeholder="60 LPA" />
              </div>
              <div className="flex-1">
                <label className={labelCls}>Label</label>
                <input value={d.label} onChange={(e) => updateDraft(i, "label", e.target.value)} className={`mt-1 ${inputCls}`} placeholder="Highest Package" />
              </div>
              <button type="button" onClick={() => removeStat(i)} className="mb-0.5 rounded-md border border-rose-200 px-2.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50">✕</button>
            </div>
          ))}

          <button type="button" onClick={addStat} className="text-sm font-semibold text-slate-600 hover:text-slate-900">+ Add stat</button>

          <button type="submit" disabled={saving} className="block rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
            {saving ? "Saving…" : "Save Stats"}
          </button>
        </form>
      )}

      {stats.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Current live values</p>
          <div className="flex flex-wrap gap-3">
            {stats.map((s) => (
              <div key={s.id} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-center shadow-sm">
                <p className="text-lg font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: "records", label: "Student Records" },
  { id: "trends", label: "Graph Data" },
  { id: "banner", label: "Highlight Banner" },
  { id: "stats", label: "Key Stats" },
];

export default function AdminPlacementsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("records");

  return (
    <AdminLayout title="Placements">
      <div className="space-y-6">
        {/* Tab bar */}
        <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "records" && <RecordsTab />}
        {activeTab === "trends" && <TrendsTab />}
        {activeTab === "banner" && <BannerTab />}
        {activeTab === "stats" && <StatsTab />}
      </div>
    </AdminLayout>
  );
}
