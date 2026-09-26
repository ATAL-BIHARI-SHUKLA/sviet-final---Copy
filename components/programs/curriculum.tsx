"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

import { CURRICULUM_BY_YEAR } from "@/components/programs/data";

type CurriculumMap = Record<string, string[]>;

type ProgramCurriculumSectionProps = {
  curriculum: CurriculumMap;
};

function normalizeCurriculum(curriculum: CurriculumMap) {
  const entries = Object.entries(curriculum);

  if (entries.length === 0) {
    return Object.fromEntries(
      Object.entries(CURRICULUM_BY_YEAR).map(([year, rows]) => [
        year,
        rows.map(([code, course, credits]) => ({ code, course, credits })),
      ]),
    );
  }

  return Object.fromEntries(
    entries.map(([year, courses]) => [
      year,
      courses.map((course, index) => ({
        code: `${year.replace(/[^0-9]/g, "") || "Y"}${String(index + 1).padStart(2, "0")}`,
        course,
        credits: "-",
      })),
    ]),
  );
}

export function ProgramCurriculumSection({
  curriculum,
}: ProgramCurriculumSectionProps) {
  const normalizedCurriculum = normalizeCurriculum(curriculum);
  const yearTabs = Object.keys(normalizedCurriculum);
  const [activeYear, setActiveYear] = useState<string>(yearTabs[0] ?? "Year 1");

  const activeRows = normalizedCurriculum[activeYear] ?? [];

  return (
    <section className="mx-auto mt-30 w-full max-w-300 px-3 md:px-5">
      <p className="text-sm font-semibold tracking-[0.08em] text-[#f7941d] uppercase">
        Curriculum
      </p>
      <h2 className="mt-2 text-4xl font-extrabold">What You&apos;ll Study</h2>
      <p className="mt-5 text-sm text-[#555]">
        160 credits across 8 semesters · Updated to industry standards
      </p>
      <div className="mt-12 inline-flex gap-1 rounded-xl border border-[#eaeaea] bg-[#f5f5f5] p-1">
        {yearTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveYear(tab)}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition ${activeYear === tab ? "bg-[#f7941d] text-white" : "text-[#666]"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border border-[#e7e7e7] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#fafafa] text-[#666]">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Course Name</th>
              <th className="px-4 py-3">Credits</th>
            </tr>
          </thead>
          <tbody>
            {activeRows.map((row) => (
              <tr key={row.code} className="border-t border-[#efefef]">
                <td className="px-4 py-3">
                  <span className="rounded bg-[#fff4ec] px-2 py-1 text-sm font-semibold text-[#f7941d]">
                    {row.code}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-[#ccc]" />
                    <span>{row.course}</span>
                  </div>
                </td>
                <td className="px-4 py-4">{row.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex items-center justify-between text-sm text-[#777]">
        <p>
          Showing {activeRows.length} courses for {activeYear}
        </p>
        <a href="#" className="font-medium text-[#f7941d]">
          Download full syllabus →
        </a>
      </div>
    </section>
  );
}
