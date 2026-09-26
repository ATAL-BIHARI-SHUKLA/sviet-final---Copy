"use client";

import Image from "next/image";
import {
  Award,
  BriefcaseBusiness,
  ChartLine,
  GraduationCap,
} from "lucide-react";
import { useEffect } from "react";

import { AWARDS_RECORDS } from "@/components/about/awards/awards-data";

type AwardsCategory = {
  id: string;
  title: string;
  icon: typeof ChartLine;
  recordIds: string[];
};

const AWARDS_CATEGORIES: AwardsCategory[] = [
  {
    id: "rankings",
    title: "Rankings",
    icon: ChartLine,
    recordIds: [
      "qs-asia-band",
      "r-world-institutional",
      "impact-rank-band",
      "qs-i-gauge-diamond",
      "nirf-innovation-top-50",
      "nirf-pharmacy-rank",
      "nirf-101-150",
    ],
  },
  {
    id: "academic-excellence",
    title: "Academic Excellence",
    icon: GraduationCap,
    recordIds: ["centre-of-excellence", "et-business-award"],
  },
  {
    id: "placements-industry",
    title: "Placements & Industry Recognition",
    icon: BriefcaseBusiness,
    recordIds: ["times-interdisciplinary-2026"],
  },
  {
    id: "institutional-recognition",
    title: "Institutional Recognition",
    icon: Award,
    recordIds: ["ugc-category-1", "iic-4-star"],
  },
];

const awardRecordById = new Map(
  AWARDS_RECORDS.map((record) => [record.id, record]),
);

const LOGO_STRIP_ITEMS = Array.from(
  new Map(AWARDS_RECORDS.map((record) => [record.logoSrc, record])).values(),
)
  .filter((record) => Boolean(record.logoSrc?.trim()))
  .slice(0, 8);

const getYearBadge = (title: string) => {
  const yearMatches = title.match(/\b(19|20)\d{2}\b/g);
  if (!yearMatches || yearMatches.length === 0) {
    return null;
  }

  return yearMatches[yearMatches.length - 1];
};

const isExternalImage = (src: string) => /^https?:\/\//.test(src);

export function AwardsGridSection() {
  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-award-reveal]"),
    );

    if (revealElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-5");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <h2 className="text-4xl font-extrabold leading-tight text-[#111827] md:text-6xl">
          Explore Our
          <span className="text-[#111827]"> Recognition Highlights</span>
        </h2>

        <div className="mt-8 inline-flex rounded-full border border-[#c7d2fe] bg-[#eef2ff] px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#1e3a8a]">
          Institutional Milestones
        </div>

        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#374151] opacity-80 md:text-base">
          Recognized by leading national and global institutions
        </p>

        <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-3 py-3 md:px-4">
          <div className="grid grid-cols-4 items-center gap-3 md:grid-cols-8">
            {LOGO_STRIP_ITEMS.map((logo) => (
              <div
                key={logo.id}
                className="relative mx-auto h-8 w-20 md:h-9 md:w-24"
              >
                <Image
                  src={logo.logoSrc}
                  alt={logo.logoAlt}
                  fill
                  unoptimized={isExternalImage(logo.logoSrc)}
                  sizes="96px"
                  className="object-contain grayscale opacity-65"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 flex items-center gap-2 text-lg font-semibold text-[#111827]">
          <span className="text-[#24b4be]">▸</span>
          Awards, Rankings and Quality Distinctions
        </p>

        <div className="mt-10 space-y-16 md:mt-12 md:space-y-20">
          {AWARDS_CATEGORIES.map((category) => {
            const CategoryIcon = category.icon;
            const records = category.recordIds
              .map((recordId) => awardRecordById.get(recordId))
              .filter((record): record is (typeof AWARDS_RECORDS)[number] =>
                Boolean(record),
              );

            if (records.length === 0) {
              return null;
            }

            return (
              <section
                key={category.id}
                data-award-reveal
                className="translate-y-5 opacity-0 transition-all duration-700 ease-out"
                aria-label={category.title}
              >
                <div className="mb-6 flex items-center gap-3 md:mb-8">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#c7d2fe] bg-[#eef2ff] text-[#1d4ed8]">
                    <CategoryIcon className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-[#111827] md:text-3xl">
                    {category.title}
                  </h3>
                </div>

                <div className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {records.map((item) => {
                    const yearBadge = getYearBadge(item.title);
                    const hasLogo = Boolean(item.logoSrc?.trim());

                    return (
                      <article
                        key={item.id}
                        data-award-reveal
                        className="group translate-y-5 opacity-0 transition-all duration-700 ease-out"
                      >
                        <div className="h-full rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-[0_14px_28px_rgba(15,23,42,0.12)] md:p-6">
                          <div className="relative flex h-full flex-col rounded-2xl bg-white">
                            {yearBadge ? (
                              <span className="absolute right-0 top-0 inline-flex rounded-full bg-[#f7941d] px-3 py-1 text-[11px] font-semibold text-white shadow-[0_6px_14px_rgba(247,148,29,0.25)]">
                                {yearBadge}
                              </span>
                            ) : null}

                            {hasLogo ? (
                              <div className="relative h-12 w-32">
                                <Image
                                  src={item.logoSrc}
                                  alt={item.logoAlt}
                                  fill
                                  unoptimized={isExternalImage(item.logoSrc)}
                                  sizes="128px"
                                  className="object-contain object-left"
                                />
                              </div>
                            ) : null}

                            <h4
                              className={`pr-14 text-xl font-extrabold leading-snug text-[#111827] ${
                                hasLogo ? "mt-6" : "mt-0"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p className="mt-3 text-sm leading-relaxed text-[#1f2937] opacity-80">
                              {item.description}
                            </p>
                            {item.assetSrc ? (
                              <div className="mt-4 flex items-center gap-3">
                                {item.assetType === "image" ? (
                                  <a
                                    href={item.assetSrc}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-3"
                                  >
                                    <div className="h-12 w-20 overflow-hidden rounded-md border">
                                      <Image
                                        src={item.assetSrc}
                                        alt={item.assetAlt ?? item.title}
                                        width={160}
                                        height={96}
                                        unoptimized={isExternalImage(
                                          item.assetSrc,
                                        )}
                                        className="object-cover"
                                      />
                                    </div>
                                    <span className="text-sm font-semibold text-[#1d4ed8]">
                                      View
                                    </span>
                                  </a>
                                ) : (
                                  <a
                                    href={item.assetSrc}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-3"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-8 w-8 text-[#ef4444]"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={1.5}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M12 2v12" />
                                      <path d="M7 7l5-5 5 5" />
                                      <rect
                                        x="3"
                                        y="13"
                                        width="18"
                                        height="8"
                                        rx="2"
                                      />
                                    </svg>
                                    <span className="text-sm font-semibold text-[#1d4ed8]">
                                      Open PDF
                                    </span>
                                  </a>
                                )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
