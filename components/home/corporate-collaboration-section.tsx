"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const CORPORATE_PARTNERS = [
  {
    name: "Infosys",
    logoSrc: "/assets/img/companies/infosys.png",
    mouImage: "/assets/img/section_card/T&P MOU.jpeg",
  },
  {
    name: "TCS",
    logoSrc: "/assets/img/companies/tcs.png",
    mouImage: "/assets/img/section_card/T&P MOU.jpeg",
  },
  {
    name: "Wipro",
    logoSrc: "/assets/img/companies/wipro.png",
    mouImage: "/assets/img/section_card/T&P MOU.jpeg",
  },
  {
    name: "Amazon",
    logoSrc: "/assets/img/companies/amazon.png",
    mouImage: "/assets/img/section_card/T&P MOU.jpeg",
  },
  {
    name: "Deloitte",
    logoSrc: "/assets/img/companies/deloitte.png",
    mouImage: "/assets/img/section_card/T&P MOU.jpeg",
  },
  {
    name: "Jio Digital",
    logoSrc: "/assets/img/companies/jio_digital.png",
    mouImage: "/assets/img/section_card/T&P MOU.jpeg",
  },
  {
    name: "Dabur",
    logoSrc: "/assets/img/companies/dabur.png",
    mouImage: "/assets/img/section_card/T&P MOU.jpeg",
  },
] as const;

const MOU_OUTCOMES = [
  "Co-designed workshops and domain bootcamps",
  "Live projects aligned to industry workflows",
  "Internship-to-placement pathways",
  "Expert-led sessions for practical upskilling",
] as const;

export function CorporateCollaborationSection() {
  const [selectedPartner, setSelectedPartner] = useState<
    (typeof CORPORATE_PARTNERS)[number]
  >(CORPORATE_PARTNERS[0]);
  const marqueePartners = [...CORPORATE_PARTNERS, ...CORPORATE_PARTNERS];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedPartner((prevPartner) => {
        const currentIndex = CORPORATE_PARTNERS.findIndex(
          (p) => p.name === prevPartner.name,
        );
        const nextIndex = (currentIndex + 1) % CORPORATE_PARTNERS.length;
        return CORPORATE_PARTNERS[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="border-y border-[#E5E7EB] bg-[#F8FAFF] px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl overflow-x-hidden">
        <div className="grid items-start gap-8">
          <div className="min-w-0 col-span-full">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">
              MOUs &amp; Academic Alliances
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#111827] md:text-4xl xl:text-[3rem]">
              Partnerships That Translate into Student Outcomes
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#6B7280] md:text-lg">
              SVGOI MOUs are built for execution, not just affiliation. These
              tie-ups strengthen curriculum relevance, practical exposure, and
              placement preparedness through structured collaboration.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {MOU_OUTCOMES.map((point) => (
                <article
                  key={point}
                  className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 text-base leading-snug text-[#4B5563]"
                >
                  {point}
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/placements"
                className="inline-flex items-center rounded-md bg-[#f7941d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d97706]"
              >
                Explore Placements
              </Link>
            </div>
          </div>

          <div className="min-w-0 col-span-full">
            <div className="space-y-4 lg:space-y-0 grid lg:grid-cols-[3fr_1fr] gap-4">
              <figure className="overflow-hidden rounded-3xl border border-[#DCE7FF] bg-white shadow-[0_10px_24px_rgba(30,42,120,0.08)] lg:h-96">
                <div className="relative aspect-video w-full overflow-hidden bg-[#EAF0FF] lg:aspect-auto lg:h-full">
                  <Image
                    src={selectedPartner.mouImage}
                    alt={`${selectedPartner.name} MOU collaboration`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover object-[center_30%]"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0f172a]/28 via-transparent to-transparent" />
                </div>
                <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E5E7EB] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                  <span>{selectedPartner.name} Partnership</span>
                  <span className="text-[#f7941d]">
                    Outcome-driven collaboration
                  </span>
                </figcaption>
              </figure>

              <div className="corporate-marquee-shell vertical rounded-2xl  p-3 lg:h-96 overflow-hidden">
                <div className="corporate-marquee vertical lg:h-96 flex flex-col overflow-hidden">
                  <div className="corporate-marquee-track vertical flex flex-col">
                    {marqueePartners.map((partner, index) => {
                      const isSelected = selectedPartner.name === partner.name;
                      return (
                        <button
                          key={`${partner.name}-${index}`}
                          onClick={() => setSelectedPartner(partner)}
                          title={`View ${partner.name} MOU details`}
                          className={`flex h-16 w-full flex-none items-center justify-center rounded-lg px-3 py-2 transition-all duration-300 ${
                            isSelected
                              ? "border-2 border-[#f7941d] bg-white shadow-md"
                              : "border border-transparent bg-[#F8FAFF] hover:bg-white hover:border-[#DCE7FF]"
                          }`}
                        >
                          <div className="relative h-8 w-24">
                            <Image
                              src={partner.logoSrc}
                              alt={`${partner.name} logo`}
                              fill
                              className={`object-contain transition-all ${
                                isSelected ? "grayscale-0" : "grayscale"
                              }`}
                              sizes="96px"
                              loading="lazy"
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
