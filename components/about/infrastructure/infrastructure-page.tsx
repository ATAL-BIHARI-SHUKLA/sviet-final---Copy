"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { CategoryTabs } from "@/components/about/infrastructure/category-tabs";
import { FacilityCard } from "@/components/about/infrastructure/facility-card";
import { ImageGrid } from "@/components/about/infrastructure/image-grid";
import { SectionHeader } from "@/components/about/infrastructure/section-header";
import { SectionWrapper } from "@/components/about/infrastructure/section-wrapper";

type FacilityCategory =
  | "Campus"
  | "Academic"
  | "Research"
  | "Sports"
  | "Sustainability";

type FacilityItem = {
  title: string;
  category: FacilityCategory;
  summary: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
};

const CATEGORY_TABS = [
  "All",
  "Campus",
  "Academic",
  "Research",
  "Sports",
  "Sustainability",
] as const;

const FACILITY_ITEMS: FacilityItem[] = [
  {
    title: "Campus Academic Zone",
    category: "Campus",
    summary:
      "Planned circulation and access systems designed for smooth academic movement.",
    highlights: [
      "Wide internal corridors",
      "Clear departmental zoning",
      "Student-first accessibility",
    ],
    imageSrc: "/assets/img/college/main_gate.png",
    imageAlt: "SVGOI campus academic zone and entry corridor",
  },
  {
    title: "Student Interaction Spaces",
    category: "Campus",
    summary:
      "Informal spaces for peer collaboration, clubs, and project discussions.",
    highlights: [
      "Collaborative seating",
      "Mentoring-friendly spaces",
      "Community engagement zones",
    ],
    imageSrc: "/assets/img/college/1st.png",
    imageAlt: "Student interaction areas across SVGOI campus",
  },
  {
    title: "Open Learning Courtyards",
    category: "Campus",
    summary:
      "Open-air learning pockets built for discussion-led and activity-led sessions.",
    highlights: [
      "Open study zones",
      "Event-ready pockets",
      "Ventilated common spaces",
    ],
    imageSrc: "/assets/img/campus-life/image2.png",
    imageAlt: "Open learning courtyards for student collaboration",
  },
  {
    title: "Classrooms & Lecture Halls",
    category: "Academic",
    summary:
      "Tech-enabled rooms built to support structured delivery and participative learning.",
    highlights: [
      "AV-enabled lecture rooms",
      "Flexible teaching setup",
      "High-capacity halls",
    ],
    imageSrc: "/assets/img/campus-life/audi.png",
    imageAlt: "Classrooms and lecture halls for structured learning",
  },
  {
    title: "Library & Study Resources",
    category: "Academic",
    summary:
      "Centralized resource support for coursework, references, and independent study.",
    highlights: [
      "Reference collections",
      "Reading spaces",
      "Digital learning support",
    ],
    imageSrc: "/assets/img/campus-life/image1.png",
    imageAlt: "Library and study resources for focused academic work",
  },
  {
    title: "Technical Laboratories",
    category: "Academic",
    summary:
      "Program-specific labs focused on hands-on skill development and experimentation.",
    highlights: [
      "Practice-ready lab setups",
      "Faculty-guided sessions",
      "Outcome-led practicals",
    ],
    imageSrc: "/assets/img/college/4th.png",
    imageAlt: "Program-specific technical laboratories at SVGOI",
  },
  {
    title: "Research Centres",
    category: "Research",
    summary:
      "Research spaces that support applied experimentation and prototype development.",
    highlights: [
      "Applied research culture",
      "Project mentorship",
      "Innovation-led activities",
    ],
    imageSrc: "/assets/img/college/8th.png",
    imageAlt: "Research centres for experimentation and applied learning",
  },
  {
    title: "Innovation Labs",
    category: "Research",
    summary:
      "Labs dedicated to ideation, prototyping, and student innovation challenges.",
    highlights: [
      "Prototype development",
      "Interdisciplinary projects",
      "Startup-oriented thinking",
    ],
    imageSrc: "/assets/img/college/global_recognition.png",
    imageAlt: "Innovation labs for student projects and prototyping",
  },
  {
    title: "Playgrounds",
    category: "Sports",
    summary:
      "Outdoor spaces designed for sports, fitness routines, and team-building activities.",
    highlights: [
      "Practice-friendly grounds",
      "Student sports engagement",
      "Wellness ecosystem",
    ],
    imageSrc: "/assets/img/campus-life/r1c2.png",
    imageAlt: "Campus playgrounds supporting sports and fitness",
  },
  {
    title: "Sports Facilities",
    category: "Sports",
    summary:
      "Dedicated facilities that strengthen discipline, teamwork, and physical well-being.",
    highlights: [
      "Multi-sport readiness",
      "Structured coaching support",
      "Active campus culture",
    ],
    imageSrc: "/assets/img/campus-life/r2c3.png",
    imageAlt: "Sports facilities promoting teamwork and well-being",
  },
  {
    title: "Solar Power Systems",
    category: "Sustainability",
    summary:
      "Renewable energy setup contributing to cleaner and more efficient campus operations.",
    highlights: [
      "Reduced energy dependency",
      "Sustainable operations",
      "Long-term resilience",
    ],
    imageSrc: "/assets/img/college/banner_95.png",
    imageAlt: "Solar power systems supporting sustainable campus operations",
  },
  {
    title: "Rain Water Harvesting",
    category: "Sustainability",
    summary:
      "Water conservation infrastructure supporting reuse and responsible consumption.",
    highlights: [
      "Groundwater recharge",
      "Conservation planning",
      "Campus water stewardship",
    ],
    imageSrc: "/assets/img/campus-life/image4.png",
    imageAlt: "Rain water harvesting infrastructure for water conservation",
  },
  {
    title: "Waste Management",
    category: "Sustainability",
    summary:
      "Structured segregation and waste handling practices integrated across campus.",
    highlights: [
      "Segregation process",
      "Recycling support",
      "Cleaner campus operations",
    ],
    imageSrc: "/assets/img/campus-life/r3c1.png",
    imageAlt: "Waste management systems with campus segregation practices",
  },
  {
    title: "Green Mobility",
    category: "Sustainability",
    summary:
      "Mobility systems and pathways planned for safe and accessible movement.",
    highlights: [
      "Pedestrian-first routes",
      "Transit point planning",
      "Safer movement corridors",
    ],
    imageSrc: "/assets/img/campus-life/r3c2.png",
    imageAlt: "Green mobility support infrastructure within campus",
  },
];

const SUSTAINABILITY_ITEMS = [
  {
    title: "Renewable Energy Generation",
    description:
      "Distributed solar systems support academic blocks and utilities, reducing dependency on conventional energy.",
    imageSrc: "/assets/img/college/scholarship.png",
    imageAlt: "Renewable energy generation systems at SVGOI",
  },
  {
    title: "Waste Water Treatment",
    description:
      "Treatment and reuse systems are designed to optimize water use across landscaping and non-potable needs.",
    imageSrc: "/assets/img/campus-life/image3.png",
    imageAlt: "Waste water treatment setup on the campus",
  },
  {
    title: "Tree Plantation",
    description:
      "Green belt planning and periodic plantation drives improve campus microclimate and ecological balance.",
    imageSrc: "/assets/img/college/1st.png",
    imageAlt: "Tree plantation initiatives in the SVGOI campus",
  },
  {
    title: "Rain Water Harvesting",
    description:
      "Catchment and storage systems support groundwater recharge and long-term water conservation goals.",
    imageSrc: "/assets/img/campus-life/image4.png",
    imageAlt: "Rain water harvesting systems at SVGOI",
  },
  {
    title: "Waste Recycling",
    description:
      "Segregation and recycling practices help reduce landfill impact and build responsible campus habits.",
    imageSrc: "/assets/img/campus-life/r2c1.png",
    imageAlt: "Waste recycling facilities on campus",
  },
  {
    title: "Mobility Support Infrastructure",
    description:
      "Pedestrian-first pathways and organized transit points improve accessibility and safer campus movement.",
    imageSrc: "/assets/img/campus-life/r1c1.png",
    imageAlt: "Mobility support infrastructure for students and staff",
  },
];

export function InfrastructurePage() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORY_TABS)[number]>("All");
  const [selectedTitle, setSelectedTitle] = useState<string>(
    FACILITY_ITEMS[0]?.title ?? "",
  );

  const filteredFacilities = useMemo(() => {
    if (activeCategory === "All") {
      return FACILITY_ITEMS;
    }

    return FACILITY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (!filteredFacilities.some((item) => item.title === selectedTitle)) {
      setSelectedTitle(filteredFacilities[0]?.title ?? "");
    }
  }, [filteredFacilities, selectedTitle]);

  const selectedFacility = useMemo(
    () =>
      filteredFacilities.find((item) => item.title === selectedTitle) ??
      filteredFacilities[0],
    [filteredFacilities, selectedTitle],
  );

  return (
    <main className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)]">
      <SectionWrapper
        aria-labelledby="infrastructure-heading"
        className="relative overflow-hidden border-b border-[#E5E7EB] bg-[linear-gradient(130deg,#EEF4FF_0%,#FFFFFF_52%,#F5F9FF_100%)]"
      >
        <div
          className="absolute -right-32 -top-25 hidden h-72 w-72 bg-[#BFDBFE]/30 blur-3xl md:block"
          aria-hidden="true"
        />
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f7941d]">
              About SVGOI
            </p>
            <h1
              id="infrastructure-heading"
              className="mt-3 text-4xl font-bold tracking-tight text-[#f7941d] md:text-5xl"
            >
              Infrastructure
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#6B7280]">
              Campus facilities are designed to support academic growth,
              practical learning, innovation, and student well-being through
              integrated spaces for study, experimentation, and development.
            </p>
          </div>

          <span className="inline-flex items-center rounded-md border border-[#BFDBFE] bg-white px-4 py-2 text-sm font-semibold text-[#f7941d]">
            Virtual Background
          </span>
        </div>
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="campus-facilities-heading"
        className="border-b border-[#E5E7EB]"
      >
        <SectionHeader
          id="campus-facilities-heading"
          title="Explore Campus Infrastructure"
        />

        <CategoryTabs
          categories={[...CATEGORY_TABS]}
          activeCategory={activeCategory}
          onCategoryChange={(category) =>
            setActiveCategory(category as typeof activeCategory)
          }
        />

        <ImageGrid
          items={filteredFacilities}
          activeTitle={selectedFacility?.title}
          onSelectItem={setSelectedTitle}
        />

        {selectedFacility ? (
          <article className="mt-8 rounded-2xl border border-[#DCE7FF] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] p-6 shadow-[0_10px_26px_rgba(30,42,120,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f7941d]">
              Selected Infrastructure
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[#111827]">
              {selectedFacility.title}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6B7280]">
              {selectedFacility.summary}
            </p>
            <ul className="mt-5 grid gap-3 text-sm text-[#4B5563] sm:grid-cols-3">
              {selectedFacility.highlights.map((point) => (
                <li
                  key={point}
                  className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2"
                >
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-[#f7941d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d97706]"
              >
                Schedule a Campus Visit
              </Link>
            </div>
          </article>
        ) : null}
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="sustainability-heading"
        className="bg-[#F5F7FB]"
      >
        <SectionHeader
          id="sustainability-heading"
          title="Sustainability & Responsible Operations"
          description="SVGOI strengthens environmentally responsible campus systems across energy, water, waste, and mobility to support long-term resilience."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUSTAINABILITY_ITEMS.map((item) => (
            <FacilityCard
              key={item.title}
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
            />
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}
