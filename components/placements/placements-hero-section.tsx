"use client";

import Image from "next/image";
import Link from "next/link";

export function PlacementsHeroSection() {
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="relative aspect-[16/11] min-h-56 w-full sm:aspect-video sm:min-h-80 md:aspect-16/7 md:min-h-130 lg:min-h-155">
          <Image
            src="/assets/img/banner/bannerplace.jpeg"
            alt="SVGOI placements banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            draggable={false}
          />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:pointer-events-none md:absolute md:inset-0 md:flex md:items-start md:px-6 md:py-0">
          <div className="w-full md:pointer-events-auto md:pt-20 lg:pt-10">
            <p className="text-xs font-semibold tracking-wide text-[#1f2937] sm:text-sm md:text-sm">
              <Link href="/" className="hover:text-[#111827]">
                Home
              </Link>{" "}
              / Placements
            </p>

            <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="https://admission.sviet.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-md bg-[#f7941d] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#d97706] sm:w-auto sm:px-5"
              >
                Explore Placement Opportunities
              </a>
              <a
                href="tel:+919465233333"
                className="w-full rounded-md border border-[#111827] bg-white/90 px-4 py-2 text-center text-sm font-semibold text-[#111827] transition hover:bg-white sm:w-auto sm:px-5"
              >
                Call: +91 94652 33333
              </a>
            </div>
          </div>
        </div>
      </section>

      <a
        href="https://admission.sviet.ac.in"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Apply now"
        className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 rounded-l-xl bg-[#f7941d] px-3 py-5 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_24px_rgba(247,148,29,0.35)] transition hover:bg-[#d97706] lg:block"
      >
        Apply Now
      </a>

      <a
        href="https://admission.sviet.ac.in"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Apply now"
        className="fixed inset-x-4 bottom-4 z-50 rounded-xl bg-[#f7941d] px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_24px_rgba(247,148,29,0.35)] transition hover:bg-[#d97706] lg:hidden"
      >
        Apply Now
      </a>
    </>
  );
}
