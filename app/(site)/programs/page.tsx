import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { ProgramsGrid } from "@/components/programs/programs-grid";

export const metadata: Metadata = {
  title: "Programs | SVGOI",
  description:
    "Explore undergraduate and postgraduate programs at SVGOI. Find the right program for your career goals.",
};

export default async function ProgramsPage() {
  let programs: Parameters<typeof ProgramsGrid>[0]["programs"] = [];

  try {
    const rawPrograms = await prisma.program.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { title: "asc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        shortDescription: true,
        level: true,
        department: { select: { name: true } },
        durationMonths: true,
        isFeatured: true,
      },
    });

    // Deduplicate by title — keep first occurrence (primary slug, no institution suffix)
    const seen = new Set<string>();
    programs = rawPrograms
      .map((p) => ({ ...p, department: p.department?.name ?? null }))
      .filter((p) => {
        if (seen.has(p.title)) return false;
        seen.add(p.title);
        return true;
      });
  } catch {
    /* db unavailable — grid shows empty state */
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Hero */}
      <div className="bg-[#0f172a] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f7941d]">
            Academics
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
            Our Programs
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            Future-focused degrees built with industry collaboration, practical
            learning, and strong career outcomes — across engineering, health,
            management, law, arts, and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#featured"
              className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition"
            >
              Featured Programs
            </a>
            <a
              href="#all"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/50"
            >
              Browse All
            </a>
          </div>
        </div>
      </div>

      {/* Filters + grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <ProgramsGrid programs={programs} />
      </div>
    </div>
  );
}
