"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TABS = [
  "All",
  "Industry & IT",
  "Healthcare",
  "Pharma",
  "Research",
  "International",
  "Placements",
] as const;
type Tab = (typeof TABS)[number];

type MouCard = {
  name: string;
  year: string;
  image: string;
  type: string;
  category: Tab;
};

const TAB_CARDS: MouCard[] = [
  // Industry & IT
  {
    name: "Butterfly Labs Pvt. Ltd., Mohali",
    year: "2023",
    image: "/assets/img/SVIET/SVIET%20Photos/Amcare/IMG_8485.JPG",
    type: "Seminar / Training",
    category: "Industry & IT",
  },
  {
    name: "Ellocent Lab IT Solution Pvt. Ltd., Mohali",
    year: "2023",
    image:
      "/assets/img/SVIET/SVIET%20Photos/Kreativan%20Technologies/DSC02285.JPG",
    type: "Research Projects / Placement",
    category: "Industry & IT",
  },
  {
    name: "Solitaire Infosys Pvt. Ltd., Mohali",
    year: "2022",
    image:
      "/assets/img/SVIET/SVIET%20Photos/MWIDM%20India%20Pvt.%20Ltd/DSC00221.JPG",
    type: "Training / Placement",
    category: "Industry & IT",
  },
  {
    name: "Codevision.io, Mohali",
    year: "2021",
    image:
      "/assets/img/SVIET/SVIET%20Photos/Mou%20with%20HdWM%20%26%20IB/DSC03765.JPG",
    type: "Technical Training",
    category: "Industry & IT",
  },
  {
    name: "MindCode Lab Pvt. Ltd., Mohali",
    year: "2019",
    image: "/assets/img/SVIET/SVIET%20Photos/Coder%20Roots/DSC01017.JPG",
    type: "Summer Industrial Training",
    category: "Industry & IT",
  },
  {
    name: "SV Technologies, Chandigarh",
    year: "2019",
    image: "/assets/img/SVIET/SVIET%20Photos/Learning%20Roots/IMG_2002.JPG",
    type: "Hardware & Network Training",
    category: "Industry & IT",
  },
  {
    name: "Anvian Solutions Pvt. Ltd., Mohali",
    year: "2022",
    image: "/assets/img/SVIET/SVIET%20Photos/Sortiq/DSC06587.JPG",
    type: "Training / Placement",
    category: "Industry & IT",
  },
  {
    name: "AGCL Technologies, Zirakpur",
    year: "2018",
    image:
      "/assets/img/SVIET/SVIET%20Photos/Placement/WhatsApp%20Image%202025-05-21%20at%206.37.10%20AM%20(2).jpeg",
    type: "Expert Lectures / Training",
    category: "Industry & IT",
  },
  {
    name: "Uproar ERP Pvt. Ltd., Mohali",
    year: "2018",
    image: "/assets/img/SVIET/SVIET%20Photos/Sortiq/DSC06639.JPG",
    type: "Technical Training",
    category: "Industry & IT",
  },
  // Healthcare
  {
    name: "Paras Healthcare, Panchkula, Haryana",
    year: "2025",
    image: "/assets/img/SVCP/MOU%20Pics/Paras%20Pharma/paras.jpg",
    type: "Clinical Training",
    category: "Healthcare",
  },
  {
    name: "Amicus Healthcare Pvt. Ltd",
    year: "2026",
    image: "/assets/img/SVCP/MOU%20Pics/Amicus%20Healthcare/ami.jpg",
    type: "Industry Collaboration",
    category: "Healthcare",
  },
  {
    name: "Ion Healthcare, Baddi, HP",
    year: "2025",
    image:
      "/assets/img/SVCP/MOU%20Pics/Paras%20Pharma/559961972_1197183242241635_8347532131443638689_n%20(1).jpg",
    type: "Industry Collaboration",
    category: "Healthcare",
  },
  {
    name: "Philadelphia Hospital, Ambala",
    year: "2022",
    image:
      "/assets/img/SVCP/MOU%20Pics/Amicus%20Healthcare/GMC16012026_141200.jpg",
    type: "Clinical Exposure",
    category: "Healthcare",
  },
  {
    name: "Krisa Healthcare, Baddi, HP",
    year: "2025",
    image:
      "/assets/img/SVCP/MOU%20Pics/Dharmayu%20Wellness/558109701_1194380205855272_7387256740285227281_n.jpg",
    type: "Industry Collaboration",
    category: "Healthcare",
  },
  // Pharma
  {
    name: "Dharmayu Wellness, Derabassi, Punjab",
    year: "2025",
    image: "/assets/img/SVCP/MOU%20Pics/Dharmayu%20Wellness/dharmayu.jpg",
    type: "Wellness & Pharma",
    category: "Pharma",
  },
  {
    name: "Katherine & Kyoor Pharmaceuticals, Baddi, HP",
    year: "2025",
    image:
      "/assets/img/SVCP/MOU%20Pics/Paras%20Pharma/559123212_1197183238908302_7702935883636893618_n.jpg",
    type: "Pharmaceutical Collaboration",
    category: "Pharma",
  },
  {
    name: "DS Cosmeceuticals Pvt. Ltd, Ludhiana",
    year: "2025",
    image: "/assets/img/SVCP/MOU%20Pics/DS%20Comoceuticals/ds.jpeg",
    type: "Pharma / Cosmetics",
    category: "Pharma",
  },
  {
    name: "Koul Pharmaceutical Distributors, Jammu",
    year: "2024",
    image:
      "/assets/img/SVCP/MOU%20Pics/Gautam%20College%20of%20Pharmacy/WhatsApp%20Image%202025-11-17%20at%204.20.21%20PM.jpeg",
    type: "Pharma Distribution",
    category: "Pharma",
  },
  // Research
  {
    name: "Edupyramids / IIT Bombay SINE",
    year: "2025",
    image:
      "/assets/img/SVCP/MOU%20Pics/Amicus%20Healthcare/20260116_21111PMByGPSMapCamera.jpg",
    type: "Research Collaboration",
    category: "Research",
  },
  {
    name: "Gautam College of Pharmacy, Hamirpur, HP",
    year: "2025",
    image:
      "/assets/img/SVCP/MOU%20Pics/Gautam%20College%20of%20Pharmacy/gautam.jpeg",
    type: "Academic Research",
    category: "Research",
  },
  {
    name: "Chandigarh Agritech Pvt. Ltd",
    year: "2026",
    image: "/assets/img/SVCP/MOU%20Pics/Amicus%20Healthcare/ami.jpg",
    type: "Agri-tech Research",
    category: "Research",
  },
  // International
  {
    name: "Focus College, Canada",
    year: "2023",
    image:
      "/assets/img/SVIET/SVIET%20Photos/Mou%20with%20HdWM%20%26%20IB/DSC03756.JPG",
    type: "Student Exchange",
    category: "International",
  },
  {
    name: "Focus College, Surrey, BC, Canada",
    year: "2023",
    image:
      "/assets/img/SVCP/MOU%20Pics/DS%20Comoceuticals/WhatsApp%20Image%202025-12-12%20at%201.56.37%20PM.jpeg",
    type: "Academic Exchange",
    category: "International",
  },
  // Placements
  {
    name: "Career Guidance & Placements, Jammu",
    year: "2023",
    image: "/assets/img/SVIET/SVIET%20Photos/Coder%20Roots/DSC00975.JPG",
    type: "Placement Support",
    category: "Placements",
  },
  {
    name: "Quipr HR Services, Zirakpur",
    year: "2018",
    image:
      "/assets/img/SVIET/SVIET%20Photos/MWIDM%20India%20Pvt.%20Ltd/DSC00285.JPG",
    type: "Training & Placement",
    category: "Placements",
  },
  {
    name: "Rise n Shine, Punjab",
    year: "2022",
    image:
      "/assets/img/SVIET/SVIET%20Photos/Placement/WhatsApp%20Image%202025-05-21%20at%206.34.07%20AM.jpeg",
    type: "Industrial Training / Research",
    category: "Placements",
  },
  {
    name: "Abroad Educare, Zirakpur",
    year: "2021",
    image:
      "/assets/img/SVIET/SVIET%20Photos/Kreativan%20Technologies/DSC02286.JPG",
    type: "Faculty Development",
    category: "Placements",
  },
];

const PARTNER_LOGOS_ROW_1 = [
  { name: "Butterfly Labs", src: "/assets/img/mou/butterfly_labs.png" },
  { name: "Focus College", src: "/assets/img/mou/Focus_College.png" },
  { name: "Ellocent Lab IT", src: "/assets/img/mou/ellocent_labs_logo.jpg" },
  { name: "Solitaire Infosys", src: "/assets/img/mou/Solitaire_Infosys.png" },
  { name: "Anviam Solutions", src: "/assets/img/mou/anviam.png" },
  { name: "Ominnos Technologies", src: "/assets/img/mou/Ominnos_Technologies.png" },
  { name: "Codevision.io", src: "/assets/img/mou/Codevision.io.webp" },
  { name: "MindCode Lab", src: "/assets/img/mou/mindcodelab.jpg" },
  { name: "Talent O Mind", src: "/assets/img/mou/TalentOMind.png" },
  { name: "SV Technologies", src: "/assets/img/mou/svtechnoogy.png" },
  { name: "AGCL Technologies", src: "/assets/img/mou/agcl_technologies_logo.jpg" },
];

const PARTNER_LOGOS_ROW_2 = [
  { name: "Paras Healthcare", src: "/assets/img/mou/Paras_Healthcare.svg" },
  { name: "Dharmayu Wellness", src: "/assets/img/mou/Dharmayu_Wellness.jpg" },
  { name: "IIT Bombay SINE", src: "/assets/img/mou/IIT_Bombay_SINE.png" },
  { name: "Gautam College of Pharmacy", src: "/assets/img/mou/GautamCollegeofPharmacy.png" },
  { name: "Krisa Healthcare", src: "/assets/img/mou/krisa-healthcare.webp" },
  { name: "Ion Healthcare", src: "/assets/img/mou/Ion_Healthcare.png" },
  { name: "DS Cosmeceuticals", src: "/assets/img/mou/DS_Cosmeceuticals.avif" },
  { name: "Philadelphia Hospital", src: "/assets/img/mou/Philadelphia_Hospital.png" },
];

const TAB_ACCENT: Record<Tab, string> = {
  All: "bg-[#f7941d] text-white",
  "Industry & IT": "bg-[#7c3aed] text-white",
  Healthcare: "bg-[#059669] text-white",
  Pharma: "bg-[#db2777] text-white",
  Research: "bg-[#1d4ed8] text-white",
  International: "bg-[#f7941d] text-white",
  Placements: "bg-[#d97706] text-white",
};

const TAB_BADGE: Record<Tab, string> = {
  All: "text-[#f7941d] bg-[#fff7ed] border-[#fed7aa]",
  "Industry & IT": "text-[#7c3aed] bg-[#f5f3ff] border-[#ddd6fe]",
  Healthcare: "text-[#059669] bg-[#ecfdf5] border-[#a7f3d0]",
  Pharma: "text-[#db2777] bg-[#fdf2f8] border-[#fbcfe8]",
  Research: "text-[#1d4ed8] bg-[#eff6ff] border-[#bfdbfe]",
  International: "text-[#f7941d] bg-[#fff7ed] border-[#fed7aa]",
  Placements: "text-[#d97706] bg-[#fffbeb] border-[#fde68a]",
};

export function MOUImpactSection() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeTab === "All"
      ? TAB_CARDS
      : TAB_CARDS.filter((c) => c.category === activeTab);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes mouSlideLeft {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes mouSlideRight {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        .mou-animate-left {
          animation: mouSlideLeft 28s linear infinite;
          will-change: transform;
        }
        .mou-animate-right {
          animation: mouSlideRight 28s linear infinite;
          will-change: transform;
        }
      `}</style>

      <section className="bg-[#f4f7fb] px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Part 1 — Description Block */}
          <div className="mb-12 grid gap-10 lg:grid-cols-[1fr_340px] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f7941d]">
                MoU Network
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#111827] md:text-4xl lg:text-5xl">
                Building Global
                <br />
                <span className="text-[#f7941d]">Partnerships</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6b7280] md:text-lg">
                SVGOI has established{" "}
                <strong className="text-[#111827]">37+ active MoUs</strong> with
                leading industry partners, academic institutions, and research
                organizations across India and internationally — fostering
                knowledge exchange, placement pathways, and collaborative
                innovation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "37+", label: "Active MoUs" },
                { value: "2026", label: "Latest Partnership" },
                { value: "Global Reach" },
                { value: "2018", label: "Partnership Since" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#e5e7eb]  p-4 text-center"
                >
                  <p className="text-xl font-black text-[#f7941d] md:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#6b7280]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Part 2 — Tabbed Partnership Grid */}
          <div className="mb-14">
            {/* Tab bar */}
            {/* <div className="mb-6 flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150 border ${
                    activeTab === tab
                      ? TAB_ACCENT[tab]
                      : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#f7941d]/40 hover:text-[#f7941d]"
                  }`}
                >
                  {tab}
                  {tab !== "All" && (
                    <span className="ml-1.5 opacity-70">
                      ({TAB_CARDS.filter((c) => c.category === tab).length})
                    </span>
                  )}
                </button>
              ))}
            </div> */}

            {/* Nav buttons */}
            <div className="mb-4 flex gap-2">
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

            {/* Carousel track */}
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filtered.map((card) => (
                <article
                  key={`${card.name}-${card.year}`}
                  className="w-64 shrink-0 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={`${card.name} MoU signing`}
                      fill
                      sizes="256px"
                      className="object-cover transition-all duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#374151]">
                      {card.year}
                    </div>
                  </div>
                  <div className="p-4">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${TAB_BADGE[card.category]}`}
                    >
                      {card.category}
                    </span>
                    <h3 className="mt-2 text-sm font-bold leading-snug text-[#111827]">
                      {card.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#6b7280]">{card.type}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Part 3 — Partner Logo Marquee */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#9ca3af]">
              Our Partner Network
            </p>
            <div className="space-y-4 overflow-hidden">
              <div className="overflow-hidden">
                <div className="flex gap-4 mou-animate-left">
                  {[...PARTNER_LOGOS_ROW_1, ...PARTNER_LOGOS_ROW_1].map(
                    (logo, i) => (
                      <div
                        key={`r1-${i}`}
                        className="shrink-0 flex h-16 w-36 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-4 py-2 shadow-sm"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={120}
                          height={48}
                          className="h-10 w-auto max-w-full object-contain"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex gap-4 mou-animate-right">
                  {[...PARTNER_LOGOS_ROW_2, ...PARTNER_LOGOS_ROW_2].map(
                    (logo, i) => (
                      <div
                        key={`r2-${i}`}
                        className="shrink-0 flex h-16 w-36 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-4 py-2 shadow-sm"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={120}
                          height={48}
                          className="h-10 w-auto max-w-full object-contain"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
