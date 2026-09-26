"use client";

import Image from "next/image";
import { useState } from "react";

const milestonePlacements = [
  {
    heading: "Career Outcomes That Matter",
    title: "₹19 LPA Top Package (2026)",
    description:
      "Two of our students, Laxmi and Vaishnavi, secured roles at Caelius Consulting-setting a new benchmark of excellence.",
    points: [
      "Average Package: 5.8 LPA",
      "Consistent placement support across multiple career paths.",
    ],
    tags: ["19lpa laxmi", "19lpa vaishnavi"],
    company: "Caelius Consulting",
    studentName: "Laxmi & Vaishnavi",
    position: "19 LPA Placements",
    studentImage: "/assets/img/students/11.png",
    companyLogo: "/assets/img/companies/cc.png",
  },
  {
    heading: "A Diverse & Thriving Campus",
    title: "50,000+ Full-Time Students",
    description:
      "A vibrant learning environment that brings together talent from across the globe.",
    points: [
      "35,000+ International Students",
      "75+ Nationalities",
      "28 States Represented",
    ],
    tags: [],
    company: "Campus Community",
    studentName: "Global Student Body",
    position: "75+ Nationalities | 28 States",
    studentImage: "/assets/img/students/22.png",
    companyLogo: "/assets/img/companies/amazon.png",
  },
  {
    heading: "Connecting Talent with Opportunity",
    title: "",
    description:
      "We bridge the gap between education and employment-aligning your skills with the expectations of modern industries and recruiters.",
    points: [],
    tags: [],
    company: "Industry Network",
    studentName: "Career Readiness",
    position: "Skills aligned with recruiter expectations",
    studentImage: "/assets/img/students/33.png",
    companyLogo: "/assets/img/companies/goldman_sachs.png",
  },
];

export function ExperiencesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % milestonePlacements.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + milestonePlacements.length) % milestonePlacements.length,
    );
  };

  const placement = milestonePlacements[currentSlide];

  return (
    <section className="bg-[#FFFFFF] px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 space-y-6">
          <h1 className="text-3xl font-bold leading-tight text-[#000000] md:text-5xl">
            Build Your Future with Confidence
          </h1>
          <h2 className="text-2xl font-light leading-tight text-[#111827] md:text-3xl">
            Turn your ambition into achievement.
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[#6B7280] md:text-base">
            At SVGOI , education goes beyond classrooms—blending strong
            academics with industry exposure to prepare you for meaningful
            careers.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          {/* Left Stat Card */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#6B7280]">
              <span className="text-lg">▶</span>
              <span className="text-sm md:text-base">
                Placement opportunities with packages up to
              </span>
            </div>
            <div className="text-5xl font-bold text-[#f7941d] md:text-6xl">
              60 Lakhs
            </div>
            <p className="text-sm text-[#6B7280] md:text-base">
              Highest package and average packages of{" "}
              <span className="text-[#f7941d]">5.8 LPA</span>.
            </p>
          </div>

          {/* Right Stat Card */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#6B7280]">
              <span className="text-lg">▶</span>
              <span className="text-sm md:text-base">Backed by</span>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#f7941d] md:text-6xl">
                2,200+
              </div>
              <div className="text-3xl font-bold text-[#111827] md:text-4xl">
                Recruiters
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Placements Carousel */}
        <div className="mt-16 space-y-8">
          {/* Carousel Card */}
          <div className="overflow-hidden rounded-2xl bg-[#F5F7FB] p-4 md:p-8">
            <div className="grid gap-4 md:h-72 md:gap-8 md:grid-cols-[1fr_1fr]">
              {/* Left Content */}
              <div className="space-y-3 flex flex-col justify-center md:pr-4">
                <div>
                  <h2 className="text-sm font-semibold text-[#f7941d] md:text-sm">
                    {placement.heading}
                  </h2>
                  {placement.title ? (
                    <h3 className="mt-1 text-xl font-bold leading-tight text-[#111827] md:text-2xl">
                      {placement.title}
                    </h3>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-[#4B5563] md:text-base">
                    {placement.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {placement.points.length > 0 ? (
                    <ul className="space-y-2">
                      {placement.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm text-[#111827] md:text-base"
                        >
                          <span className="mt-1 text-[#f7941d]">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {placement.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {placement.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#f7941d] bg-[#fff7ed] px-3 py-1 text-sm font-semibold text-[#b45309]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Right Side - Student Profile: hidden on mobile */}
              <div className="relative hidden items-end justify-between md:flex">
                <div className="relative shrink-0">
                  <div className="relative h-56 w-70">
                    <div className="relative z-10 top-4 md:top-8 h-full w-full overflow-hidden">
                      <Image
                        src={placement.studentImage}
                        alt={placement.studentName}
                        width={560}
                        height={424}
                        className="h-full w-w-full object-contain object-bottom"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-end space-y-2 pl-4">
                  {currentSlide === 0 ? (
                    <div className="relative h-10 w-28 md:h-12 md:w-36">
                      <Image
                        src={placement.companyLogo}
                        alt={placement.company}
                        fill
                        className="object-contain object-right"
                      />
                    </div>
                  ) : null}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#111827] md:text-base">
                      {placement.studentName}
                    </p>
                    <div className="space-y-0.5 text-sm leading-tight text-[#6B7280]">
                      <p className="font-medium">{placement.company}</p>
                      <p className="font-light line-clamp-2">
                        {placement.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-only: compact student/company info */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 md:hidden">
              {currentSlide === 0 ? (
                <div className="relative h-8 w-24">
                  <Image
                    src={placement.companyLogo}
                    alt={placement.company}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              ) : <div />}
              <div className="ml-auto text-right">
                <p className="text-sm font-semibold text-[#111827]">{placement.studentName}</p>
                <p className="text-xs text-[#6B7280]">{placement.company}</p>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous card"
              className="inline-flex h-10 w-10 items-center justify-center rounded bg-[#E5E7EB] transition hover:bg-[#D1D5DB]"
            >
              <span className="text-lg text-[#111827]">‹</span>
            </button>

            <div className="flex gap-2">
              {milestonePlacements.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to card ${index + 1}`}
                  className={`h-2 transition-all ${
                    index === currentSlide
                      ? "w-8 bg-[#f7941d]"
                      : "w-2 bg-[#D1D5DB]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next card"
              className="inline-flex h-10 w-10 items-center justify-center rounded bg-[#E5E7EB] transition hover:bg-[#D1D5DB]"
            >
              <span className="text-lg text-[#111827]">›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
