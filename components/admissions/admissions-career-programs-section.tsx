"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, GraduationCap, Search } from "lucide-react";

import type { ProgramOption } from "@/components/admissions/types";

type AdmissionsCareerProgramsSectionProps = {
  programs: ProgramOption[];
};

function detectLevel(title: string) {
  const text = title.toLowerCase();

  if (
    text.includes("master") ||
    text.includes("mba") ||
    text.includes("m.tech")
  ) {
    return "Postgraduate";
  }

  if (text.includes("diploma")) {
    return "Diploma";
  }

  return "Undergraduate";
}

function formatLevel(level?: string | null, title?: string) {
  if (level === "PG") {
    return "Postgraduate";
  }

  if (level === "UG") {
    return "Undergraduate";
  }

  if (level === "DIPLOMA") {
    return "Diploma";
  }

  if (level === "VOCATIONAL") {
    return "Vocational";
  }

  return detectLevel(title ?? "");
}

function cardSummary(program: ProgramOption) {
  return (
    program.eligibility ||
    program.shortDescription ||
    "Eligibility details available on the program page."
  );
}

export function AdmissionsCareerProgramsSection({
  programs,
}: AdmissionsCareerProgramsSectionProps) {
  const [keyword, setKeyword] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All levels");
  const [selectedFaculty, setSelectedFaculty] = useState("All Programs");
  const [expanded, setExpanded] = useState(false);

  const levels = useMemo(() => {
    const values = new Set(
      programs.map((program) => formatLevel(program.level, program.title)),
    );
    return ["All levels", ...Array.from(values)];
  }, [programs]);

  const faculties = useMemo(() => {
    const values = new Set(
      programs
        .map((program) => program.department?.trim())
        .filter((value): value is string => Boolean(value && value.length > 0)),
    );

    return ["All Programs", ...Array.from(values)];
  }, [programs]);

  const visiblePrograms = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return programs.filter((program) => {
      const matchesKeyword =
        normalizedKeyword.length === 0 ||
        program.title.toLowerCase().includes(normalizedKeyword) ||
        (program.shortDescription || "")
          .toLowerCase()
          .includes(normalizedKeyword);

      const matchesLevel =
        selectedLevel === "All levels" ||
        formatLevel(program.level, program.title) === selectedLevel;
      const matchesFaculty =
        selectedFaculty === "All Programs" ||
        (program.department || "Unassigned").trim() === selectedFaculty;

      return matchesKeyword && matchesLevel && matchesFaculty;
    });
  }, [keyword, programs, selectedFaculty, selectedLevel]);

  return (
    <section className="bg-[#f5f7fb] py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <h2 className="text-center text-4xl font-bold leading-tight text-[#1a1a1f] md:text-6xl">
          Explore Academic
          <br />
          <span className="text-[#f7941d]">Pathways</span>
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-[#4f4f5f] md:text-base">
          Choose from a wide range of programs designed for future-ready
          careers. Each program is aligned with industry requirements and career
          outcomes.
        </p>

        <div className="mx-auto mt-6 flex max-w-2xl items-center rounded-full bg-[#eaf1ff] px-4 py-2">
          <Search className="h-4 w-4 text-[#2563EB]" />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Type a keyword. Find your fit."
            className="w-full bg-transparent px-3 text-sm text-[#2c2c34] outline-none placeholder:text-[#7c7c8e]"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#d7d6e2] pb-4">
          <div className="flex flex-wrap gap-3">
            <label className="relative">
              <select
                title="Select level"
                value={selectedLevel}
                onChange={(event) => setSelectedLevel(event.target.value)}
                className="appearance-none rounded-md border border-[#d7d6e2] bg-white px-3 py-2 pr-8 text-sm text-[#222]"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-[#7a7991]" />
            </label>

            <label className="relative">
              <select
                title="Select faculty"
                value={selectedFaculty}
                onChange={(event) => setSelectedFaculty(event.target.value)}
                className="appearance-none rounded-md border border-[#d7d6e2] bg-white px-3 py-2 pr-8 text-sm text-[#222]"
              >
                {faculties.map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-[#7a7991]" />
            </label>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((previous) => !previous)}
            className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]"
          >
            {expanded ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <div
          className={`mt-5 grid gap-3 pr-1 md:grid-cols-4 ${expanded ? "max-h-none overflow-visible" : "max-h-130 overflow-y-auto"}`}
        >
          {visiblePrograms.map((program) => (
            <Link
              key={program.id}
              href={program.slug ? `/programs/${program.slug}` : "/programs"}
              className="block border border-[#d7d6e2] bg-white p-4 transition hover:border-[#c4c2d7] hover:bg-[#fafbff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
            >
              <article>
                <GraduationCap className="h-4 w-4 text-[#f7941d]" />
                <h3 className="mt-3 text-sm font-bold leading-snug text-[#1e1e24]">
                  {program.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed text-[#4b4b57] ${expanded ? "line-clamp-none" : "line-clamp-4"}`}
                >
                  {cardSummary(program)}
                </p>
              </article>
            </Link>
          ))}
          {visiblePrograms.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#d7d6e2] bg-white p-6 text-sm text-[#555] md:col-span-4">
              No programs match your filters.
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/program-finder"
            className="bg-[#f7941d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d97706]"
          >
            Take me to course finder
          </Link>
        </div>
      </div>
    </section>
  );
}
