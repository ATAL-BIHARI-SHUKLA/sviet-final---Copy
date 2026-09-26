"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ACHIEVEMENT_STATS = [
  { value: "₹2.5 Cr+", label: "Total Grants Received" },
  { value: "50+", label: "Startups Incubated" },
  { value: "15+", label: "Initiatives Launched" },
  { value: "3", label: "Government Partnerships" },
];

const GOVERNMENT_PARTNERS = [
  {
    name: "ImPunjab",
    subtitle: "Govt. of Punjab",
    logo: "/assets/img/impunjab.png",
    bg: "bg-white",
    border: "border-blue-200",
  },
  {
    name: "Invest Punjab",
    subtitle: "Investment Facilitation",
    logo: "/assets/img/investpunjab.png",
    bg: "bg-white",
    border: "border-emerald-200",
  },
  {
    name: "Startup India",
    subtitle: "DPIIT Recognized",
    logo: "/assets/img/startip_india.png",
    bg: "bg-white",
    border: "border-orange-200",
  },
];

const INITIATIVE_TILES = [
  {
    title: "Startup Work Environment",
    description:
      "Students work on live products in a real startup-style lab — desks, dev tools, and deadlines included.",
    image: "/assets/img/section_card/Labo.jpeg",
  },
  {
    title: "Innovation & Incubation",
    description:
      "On-campus incubation with mentorship in product, marketing, and go-to-market strategy.",
    image: "/assets/img/section_card/ResearchCenter.jpeg",
  },
  {
    title: "BharatTech Xperience",
    description:
      "An annual tech-entrepreneurship festival where students pitch, hack, and build alongside industry leaders.",
    image: "/assets/img/section_card/BharatTech.JPG.jpeg",
  },
  {
    title: "Global Futures Summit",
    description:
      "Industry & HR leaders gather to shape the future workforce — students get front-row access.",
    image: "/assets/img/section_card/GFS.JPG",
  },
  {
    title: "Corporate & Startup Meets",
    description:
      "Regular roundtables with founders, VCs, and corporate leaders drive real-world exposure.",
    image: "/assets/img/section_card/GFS2.JPG",
  },
  {
    title: "Training & Skill Labs",
    description:
      "Structured programs in product thinking, lean startup, coding, and communication for aspiring founders.",
    image: "/assets/img/training_cell.jpeg",
  },
  {
    title: "Stand Up India Initiative",
    description:
      "SVGOI actively supports students under Stand Up India and related government-backed startup schemes.",
    image: "/assets/img/college/lab.jpeg",
  },
];

export function EntrepreneurshipSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#000000d7] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#f7941d]">
          Startup Zone
        </p>
        <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          SVGOI Startup Zone
        </h2>
        <h3 className="mt-1 text-xl font-light text-[#f7941d] md:text-2xl">
          Where Ideas Become Ventures
        </h3>
        <p className="mb-12 mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
          Backed by government grants, industry mentors, and a thriving
          innovation culture, SVGOI has built one of Punjab's most active
          student startup ecosystems — turning campus ideas into real, impactful
          ventures.
        </p>

        {/* Government Partnership Logos */}
        <div className="mb-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
            Supported By
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {GOVERNMENT_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${partner.bg} ${partner.border}`}
              >
                <div className="relative h-8 w-24">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {partner.name}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {partner.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENT_STATS.map((stat) => (
            <div
              key={stat.label}
              className="border-l-2 border-[#f7941d] bg-black/50 p-5 backdrop-blur"
            >
              <div className="text-3xl font-black text-[#f7941d]">
                {stat.value}
              </div>
              <p className="mt-1 text-sm font-semibold text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Divider label + nav */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1.5 bg-[#f7941d]" />
            <p className="text-sm font-semibold text-white">
              SVGOI innovation and entrepreneurship ecosystem
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f7941d] text-[#f7941d] transition hover:bg-[#f7941d] hover:text-white"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f7941d] text-[#f7941d] transition hover:bg-[#f7941d] hover:text-white"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Initiative Tiles Carousel */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {INITIATIVE_TILES.map((tile) => (
            <div
              key={tile.title}
              className="group relative w-72 shrink-0 overflow-hidden rounded-2xl"
            >
              {/* Background image */}
              <div className="relative h-52 w-full">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="288px"
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
              </div>
              {/* Text overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-sm font-bold leading-snug text-white">
                  {tile.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75 line-clamp-2">
                  {tile.description}
                </p>
              </div>
              {/* Orange top accent */}
              <div className="absolute left-0 top-0 h-1 w-12 bg-[#f7941d]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
