"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, ArrowRight, ChevronDown, X, SlidersHorizontal } from "lucide-react";

import { PROGRAM_TAGLINES, PROGRAM_CATEGORIES } from "@/lib/program-meta";

export type ProgramItem = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string | null;
  department: string | null;
  level: string | null;
  durationMonths: number;
  isFeatured: boolean;
};

const LEVEL_LABEL: Record<string, string> = {
  UG: "Undergraduate",
  PG: "Postgraduate",
  DIPLOMA: "Diploma",
  VOCATIONAL: "Vocational",
  PROFESSIONAL: "Professional",
  CERTIFICATE: "Certificate",
};

const LEVEL_ORDER = ["UG", "PG", "PROFESSIONAL", "DIPLOMA", "VOCATIONAL", "CERTIFICATE"];

function formatDuration(months: number) {
  const y = months / 12;
  return `${Number.isInteger(y) ? y : y.toFixed(1)} Yrs`;
}

// ── Sidebar accordion section ─────────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface ProgramsGridProps {
  programs: ProgramItem[];
}

export function ProgramsGrid({ programs }: ProgramsGridProps) {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    for (const p of programs) {
      const cat = PROGRAM_CATEGORIES[p.slug] ?? p.department;
      if (cat) seen.add(cat);
    }
    return Array.from(seen).sort();
  }, [programs]);

  const levels = useMemo(() => {
    const seen = new Set<string>();
    for (const p of programs) {
      if (p.level) seen.add(p.level);
    }
    return LEVEL_ORDER.filter((l) => seen.has(l));
  }, [programs]);

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      if (activeCategories.size > 0) {
        const cat = PROGRAM_CATEGORIES[p.slug] ?? p.department;
        if (!cat || !activeCategories.has(cat)) return false;
      }
      if (activeLevel && p.level !== activeLevel) return false;
      return true;
    });
  }, [programs, activeCategories, activeLevel]);

  const featured = filtered.filter((p) => p.isFeatured);
  const hasFilters = activeCategories.size > 0 || activeLevel !== null;
  const activeFilterCount = activeCategories.size + (activeLevel ? 1 : 0);

  function toggleCategory(cat: string) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function clearFilters() {
    setActiveCategories(new Set());
    setActiveLevel(null);
  }

  const sidebar = (
    <aside className="w-full space-y-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-900">Filters</span>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="Category">
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const checked = activeCategories.has(cat);
            return (
              <label
                key={cat}
                onClick={() => toggleCategory(cat)}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-50 transition"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                    checked
                      ? "border-[#f7941d] bg-[#f7941d]"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {checked && (
                    <svg viewBox="0 0 10 8" className="h-2.5 w-2.5 fill-white">
                      <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className={checked ? "font-semibold text-slate-900" : ""}>
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Level">
        <div className="space-y-1.5">
          {levels.map((lvl) => {
            const checked = activeLevel === lvl;
            return (
              <label
                key={lvl}
                onClick={() => setActiveLevel(checked ? null : lvl)}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-50 transition"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                    checked
                      ? "border-[#f7941d] bg-[#f7941d]"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <span className={checked ? "font-semibold text-slate-900" : ""}>
                  {LEVEL_LABEL[lvl] ?? lvl}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>
    </aside>
  );

  return (
    <div>
      {/* Mobile filter toggle */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-900">{filtered.length}</span> programs
        </p>
        <button
          type="button"
          onClick={() => setMobileSidebarOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f7941d] text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-base font-bold text-slate-900">Filters</span>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                aria-label="Close filters"
                className="rounded-full bg-slate-100 p-1.5 text-slate-600 hover:bg-slate-200"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            {sidebar}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="mt-4 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white"
            >
              Show {filtered.length} programs
            </button>
          </div>
        </div>
      )}

      {/* Desktop layout: sidebar + grid */}
      <div className="flex gap-8">
        {/* Sidebar — desktop only */}
        <div className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-24">{sidebar}</div>
        </div>

        {/* Program grid */}
        <div className="min-w-0 flex-1">
          {/* Result count */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
              of {programs.length} programs
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-3 inline-flex items-center gap-1 text-xs font-semibold text-[#f7941d] hover:underline"
                >
                  <X className="h-3 w-3" />
                  Clear
                </button>
              )}
            </p>
          </div>

          {/* Featured — only when no filters active */}
          {!hasFilters && featured.length > 0 && (
            <section id="featured" className="mb-10 scroll-mt-24">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  Featured
                </span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {featured.map((p) => (
                  <ProgramCard key={p.id} program={p} large />
                ))}
              </div>
            </section>
          )}

          {/* All / Filtered */}
          <section id="all" className="scroll-mt-24">
            {!hasFilters && (
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  All Programs
                </span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-sm text-slate-500">
                No programs match the selected filters.
                <br />
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-3 text-[#f7941d] font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filtered.map((p) => (
                  <ProgramCard key={p.id} program={p} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

function ProgramCard({ program, large = false }: { program: ProgramItem; large?: boolean }) {
  const tagline = PROGRAM_TAGLINES[program.slug];
  const category = PROGRAM_CATEGORIES[program.slug] ?? program.department;
  const levelLabel = LEVEL_LABEL[program.level ?? ""] ?? program.level ?? "";

  if (large) {
    return (
      <article className="flex flex-col overflow-hidden rounded-2xl border border-orange-200/60 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className="h-1 w-full bg-black" />
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-1.5">
            {category && (
              <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-semibold text-orange-700 ring-1 ring-orange-200">
                {category}
              </span>
            )}
            {levelLabel && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                {levelLabel}
              </span>
            )}
          </div>
          <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900">
            {program.title}
          </h3>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f7941d]/80">
            {tagline ?? "CONTACT ADMISSIONS FOR DETAILS"}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            {formatDuration(program.durationMonths)}
          </div>
          <div className="mt-5 flex gap-2">
            <Link
              href={`/programs/${program.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
            >
              Explore Program <ArrowRight className="h-3 w-3" />
            </Link>
            <a
              href="https://admission.sviet.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#f7941d] px-3 py-2 text-xs font-semibold text-[#f7941d] transition hover:bg-orange-50"
            >
              Apply Now
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex flex-wrap items-center gap-1.5">
        {category && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
            {category}
          </span>
        )}
        {levelLabel && (
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600">
            {levelLabel}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-base font-bold leading-snug text-slate-900">
        {program.title}
      </h3>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#f7941d]/80">
        {tagline ?? "CONTACT ADMISSIONS FOR DETAILS"}
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
        <Clock className="h-3.5 w-3.5" />
        {formatDuration(program.durationMonths)}
      </div>
      <div className="mt-4 flex gap-2">
        <Link
          href={`/programs/${program.slug}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
        >
          Explore <ArrowRight className="h-3 w-3" />
        </Link>
        <a
          href="https://admission.sviet.ac.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#f7941d] hover:text-[#f7941d]"
        >
          Apply Now
        </a>
      </div>
    </article>
  );
}
