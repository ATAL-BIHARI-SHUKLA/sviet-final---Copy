import type { Metadata } from "next";
import Link from "next/link";

import { TrainingCurriculumSection } from "@/components/placements/training-curriculum-section";

export const metadata: Metadata = {
  title: "Training Curriculum | Placements | SVGOI",
  description:
    "Explore SVGOI's phase-wise placement training curriculum from foundation learning to advanced role readiness.",
};

export default function TrainingCurriculumPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-[#E5E7EB] bg-[linear-gradient(130deg,#EEF4FF_0%,#FFFFFF_52%,#F5F9FF_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">Placement Preparation</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#111827] md:text-5xl">Training Curriculum</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#6B7280]">
            A structured pathway that builds student capability in stages, from fundamentals to hiring-readiness.
          </p>
        </div>
      </section>

      <TrainingCurriculumSection />

      <section className="border-t border-[#E5E7EB] bg-[#F8FAFF]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-12 md:flex-row md:items-center md:px-6">
          <p className="text-sm text-[#4B5563]">Need help selecting the right training track for your program?</p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md bg-[#f7941d] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#d97706]"
          >
            Connect with Training Cell
          </Link>
        </div>
      </section>
    </main>
  );
}
