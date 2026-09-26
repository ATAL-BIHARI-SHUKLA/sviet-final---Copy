"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DOMAINS = [
  "All",
  "Pharma & Drug Discovery",
  "Healthcare & Biomedical",
  "Engineering & Materials",
  "CS & AI",
  "Environment & Sustainability",
] as const;
type Domain = (typeof DOMAINS)[number];

type Project = {
  id: number;
  domain: Domain;
  title: string;
  investigator: string;
  designation: string;
  grant: string;
  agency: string;
  status: "Ongoing" | "Under Review" | "Completed";
  year: string;
};

const PROJECTS: Project[] = [
  // Pharma & Drug Discovery
  {
    id: 1,
    domain: "Pharma & Drug Discovery",
    title:
      "Formulation and Optimization of pH-Responsive Nanoparticles for Targeted Colorectal Cancer Drug Delivery",
    investigator: "Dr. Meenakshi Rana",
    designation: "Associate Professor, SVCP",
    grant: "₹8.4 L",
    agency: "ICMR Minor Research Grant",
    status: "Ongoing",
    year: "2024",
  },
  {
    id: 2,
    domain: "Pharma & Drug Discovery",
    title:
      "Development of Mucoadhesive Nano-Liposomal Levocetirizine Syrup for Enhanced Oral Bioavailability",
    investigator: "Dr. Swikriti",
    designation: "Professor, SVCP",
    grant: "₹6.2 L",
    agency: "DST-SERB Fast Track",
    status: "Ongoing",
    year: "2024",
  },
  {
    id: 3,
    domain: "Pharma & Drug Discovery",
    title:
      "Design and Evaluation of Self-Emulsifying Drug Delivery System (SEDDS) for BCS Class II Antifungal Drugs",
    investigator: "Dr. Damit",
    designation: "Associate Professor, SVCP",
    grant: "₹7.8 L",
    agency: "AICTE Research Promotion",
    status: "Ongoing",
    year: "2023",
  },
  {
    id: 4,
    domain: "Pharma & Drug Discovery",
    title:
      "Co-loaded Topical Gel of Azelaic Acid and Sea Buckthorn Oil for Safe Management of Acne Vulgaris",
    investigator: "Ms. Eshna Bhatt",
    designation: "Assistant Professor, SVCP",
    grant: "₹4.5 L",
    agency: "UIAMS Seed Grant",
    status: "Under Review",
    year: "2025",
  },
  {
    id: 5,
    domain: "Pharma & Drug Discovery",
    title:
      "Nano-structured Transdermal Patches for Controlled Release of Insulin in Type-2 Diabetic Patients",
    investigator: "Dr. Ashok Kumar Tiwary",
    designation: "Professor, SVCP",
    grant: "₹12.6 L",
    agency: "DBT National Grant",
    status: "Ongoing",
    year: "2023",
  },
  // Healthcare & Biomedical
  {
    id: 6,
    domain: "Healthcare & Biomedical",
    title:
      "AI-Assisted Early Detection of Diabetic Retinopathy Using Fundus Imaging and Deep Convolutional Networks",
    investigator: "Dr. Rajesh Sharma",
    designation: "Professor, Department of CSE",
    grant: "₹18.5 L",
    agency: "ICMR-DST Joint Initiative",
    status: "Ongoing",
    year: "2024",
  },
  {
    id: 7,
    domain: "Healthcare & Biomedical",
    title:
      "Point-of-Care Biosensor for Rapid Detection of Dengue NS1 Antigen Using Electrochemical Impedance",
    investigator: "Dr. Priya Nair",
    designation: "Associate Professor, Applied Sciences",
    grant: "₹9.2 L",
    agency: "DST-INSPIRE Faculty Grant",
    status: "Ongoing",
    year: "2023",
  },
  {
    id: 8,
    domain: "Healthcare & Biomedical",
    title:
      "Clinical Evaluation of Standardized Herbal Formulations in Managing Glycemic Control in Type-2 DM",
    investigator: "Dr. Swikriti",
    designation: "Professor, SVCP",
    grant: "₹11.0 L",
    agency: "AYUSH Research Council",
    status: "Ongoing",
    year: "2024",
  },
  {
    id: 9,
    domain: "Healthcare & Biomedical",
    title:
      "Wearable ECG Patch with Edge-AI Anomaly Detection for Remote Cardiac Monitoring",
    investigator: "Dr. Amandeep Singh",
    designation: "Associate Professor, ECE",
    grant: "₹14.8 L",
    agency: "MeitY Healthcare Innovation Fund",
    status: "Under Review",
    year: "2025",
  },
  // Engineering & Materials
  {
    id: 10,
    domain: "Engineering & Materials",
    title:
      "High-Efficiency Solar-Thermal Hybrid Energy Modules for Off-Grid Rural Electrification in Punjab",
    investigator: "Dr. Harpreet Kaur",
    designation: "Professor, Mechanical Engineering",
    grant: "₹22.3 L",
    agency: "MNRE Research Grant",
    status: "Ongoing",
    year: "2023",
  },
  {
    id: 11,
    domain: "Engineering & Materials",
    title:
      "Structural Performance of Geopolymer Concrete Incorporating Industrial Fly-Ash and GGBS as Binders",
    investigator: "Dr. Sunil Verma",
    designation: "Associate Professor, Civil Engineering",
    grant: "₹8.7 L",
    agency: "CSIR-CBRI Collaborative Grant",
    status: "Ongoing",
    year: "2024",
  },
  {
    id: 12,
    domain: "Engineering & Materials",
    title:
      "IoT-Enabled Real-Time Structural Health Monitoring Framework for Aging Bridge Infrastructure",
    investigator: "Dr. Gurpreet Bhatia",
    designation: "Assistant Professor, Civil Engineering",
    grant: "₹6.9 L",
    agency: "NITI Aayog Smart Infrastructure",
    status: "Ongoing",
    year: "2024",
  },
  {
    id: 13,
    domain: "Engineering & Materials",
    title:
      "Development of Shape Memory Alloy Actuators for Adaptive Morphing Aerospace Structures",
    investigator: "Dr. Vikram Arora",
    designation: "Professor, Mechanical Engineering",
    grant: "₹19.6 L",
    agency: "DRDO ERIP Grant",
    status: "Ongoing",
    year: "2023",
  },
  // CS & AI
  {
    id: 14,
    domain: "CS & AI",
    title:
      "Federated Learning Framework for Privacy-Preserving Medical Image Analysis Across Distributed Hospital Networks",
    investigator: "Dr. Arjun Mehta",
    designation: "Associate Professor, CSE",
    grant: "₹24.0 L",
    agency: "DST-SERB Core Research Grant",
    status: "Ongoing",
    year: "2024",
  },
  {
    id: 15,
    domain: "CS & AI",
    title:
      "Explainable AI-Based Crop Disease Detection Using Edge Computing for Precision Smart Agriculture",
    investigator: "Dr. Kavita Patel",
    designation: "Professor, CSE & AI",
    grant: "₹16.4 L",
    agency: "ICAR-IARI Digital Agriculture Grant",
    status: "Ongoing",
    year: "2024",
  },
  {
    id: 16,
    domain: "CS & AI",
    title:
      "Deep Reinforcement Learning for Autonomous Traffic Signal Optimization in Smart City Deployments",
    investigator: "Dr. Naveen Joshi",
    designation: "Associate Professor, CSE",
    grant: "₹13.2 L",
    agency: "MeitY AI Research Grant",
    status: "Ongoing",
    year: "2023",
  },
  {
    id: 17,
    domain: "CS & AI",
    title:
      "Blockchain-Enabled Tamper-Proof Framework for Electronic Health Record Management and Interoperability",
    investigator: "Dr. Simran Grewal",
    designation: "Assistant Professor, CSE",
    grant: "₹9.8 L",
    agency: "NHA Digital Health Innovation Fund",
    status: "Under Review",
    year: "2025",
  },
  // Environment & Sustainability
  {
    id: 18,
    domain: "Environment & Sustainability",
    title:
      "Phytoremediation of Heavy Metal-Contaminated Agricultural Soils Using Engineered Rhizobacterial Consortia",
    investigator: "Dr. Manpreet Kaur",
    designation: "Associate Professor, Applied Sciences",
    grant: "₹11.5 L",
    agency: "MOEF&CC Research Grant",
    status: "Ongoing",
    year: "2024",
  },
  {
    id: 19,
    domain: "Environment & Sustainability",
    title:
      "Biodegradable Polymer Composites from Agricultural Waste for Sustainable Food Packaging Applications",
    investigator: "Dr. Rohit Jain",
    designation: "Professor, Chemical Engineering",
    grant: "₹14.3 L",
    agency: "DST-TARE Research Grant",
    status: "Ongoing",
    year: "2023",
  },
  {
    id: 20,
    domain: "Environment & Sustainability",
    title:
      "Assessment and Mitigation of Microplastic Contamination in Freshwater Ecosystems of Punjab Region",
    investigator: "Dr. Sunita Verma",
    designation: "Associate Professor, Applied Sciences",
    grant: "₹8.1 L",
    agency: "Punjab Pollution Control Board",
    status: "Ongoing",
    year: "2024",
  },
];

const DOMAIN_STYLE: Record<
  Domain,
  { accent: string; badge: string; active: string }
> = {
  All: {
    accent: "border-black",
    badge: "bg-white text-black border-black",
    active: "bg-[#f7941d] text-white border-[#f7941d]",
  },
  "Pharma & Drug Discovery": {
    accent: "border-black",
    badge: "bg-white text-black border-black",
    active: "bg-[#db2777] text-white border-[#db2777]",
  },
  "Healthcare & Biomedical": {
    accent: "border-black",
    badge: "bg-white text-black border-black",
    active: "bg-[#059669] text-white border-[#059669]",
  },
  "Engineering & Materials": {
    accent: "border-black",
    badge: "bg-white text-black border-black",
    active: "bg-[#d97706] text-white border-[#d97706]",
  },
  "CS & AI": {
    accent: "border-black",
    badge: "bg-white text-black border-black",
    active: "bg-[#2563eb] text-white border-[#2563eb]",
  },
  "Environment & Sustainability": {
    accent: "border-black",
    badge: "bg-white text-black border-black",
    active: "bg-[#16a34a] text-white border-[#16a34a]",
  },
};

const STATUS_STYLE: Record<Project["status"], string> = {
  Ongoing: "bg-[#ecfdf5] text-[#059669]",
  "Under Review": "bg-[#fff7ed] text-[#d97706]",
  Completed: "bg-[#f0f9ff] text-[#0284c7]",
};

export function OngoingResearchProjectsSection() {
  const [active, setActive] = useState<Domain>("All");
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.domain === active);
  const totalGrant = "₹13L+ / year";

  const scroll = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#f4f4f4] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 bg-[#f7941d]" />
            <h2 className="text-2xl font-bold text-[#121217] md:text-3xl">
              Ongoing Research Projects
            </h2>
          </div>
          <p className="mt-2 text-sm font-semibold text-[#374151] md:text-base">
            Total Grant: More than {totalGrant} research grant and funding by
            government &amp; non-government agencies
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-center shadow-sm">
              <p className="text-lg font-black text-[#f7941d]">25+</p>
              <p className="text-[10px] font-semibold text-[#6b7280]">
                Active Projects
              </p>
            </div>
            <div className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-center shadow-sm">
              <p className="text-lg font-black text-[#f7941d]">₹60 Lac+</p>
              <p className="text-[10px] font-semibold text-[#6b7280]">
                Total Grants
              </p>
            </div>
            <div className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-center shadow-sm">
              <p className="text-lg font-black text-[#f7941d]">5</p>
              <p className="text-[10px] font-semibold text-[#6b7280]">
                Research Domains
              </p>
            </div>
            <div className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-center shadow-sm">
              <p className="text-lg font-black text-[#f7941d]">25+</p>
              <p className="text-[10px] font-semibold text-[#6b7280]">
                Funding Agencies
              </p>
            </div>
          </div>
        </div>

        {/* Domain Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {DOMAINS.map((domain) => {
            const style = DOMAIN_STYLE[domain];
            const isActive = active === domain;
            return (
              <button
                key={domain}
                type="button"
                onClick={() => setActive(domain)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? style.active
                    : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#f7941d]/40 hover:text-[#f7941d]"
                }`}
              >
                {domain}
                {domain !== "All" && (
                  <span className="ml-1 opacity-70">
                    ({PROJECTS.filter((p) => p.domain === domain).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>

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

        {/* Project Cards Carousel */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filtered.map((project) => {
            const domainStyle = DOMAIN_STYLE[project.domain];
            return (
              <article
                key={project.id}
                className={`w-72 shrink-0 flex flex-col rounded-2xl border-l-4 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5 duration-200 ${domainStyle.accent}`}
              >
                <div className="flex flex-col flex-1 p-5">
                  {/* Domain + Status */}
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${domainStyle.badge}`}
                    >
                      {project.domain.split(" & ")[0]}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold leading-snug text-[#111827] line-clamp-3">
                    {project.title}
                  </h3>

                  {/* Investigator */}
                  <div className="mt-3 flex-1">
                    <p className="text-sm font-semibold text-[#374151]">
                      {project.investigator}
                    </p>
                    <p className="text-[11px] text-[#6b7280]">
                      {project.designation}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 border-t border-[#f3f4f6] pt-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                          Grant
                        </p>
                        <p className="text-sm font-black text-[#f7941d]">
                          {project.grant}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                          Year
                        </p>
                        <p className="text-sm font-semibold text-[#374151]">
                          {project.year}
                        </p>
                      </div>
                    </div>
                    <p className="mt-1.5 text-[10px] text-[#9ca3af] line-clamp-1">
                      {project.agency}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-sm text-[#9ca3af]">
          * Projects funded through ICMR, DST-SERB, DRDO, MNRE, MeitY, AICTE,
          DBT, AYUSH and other national research agencies.
        </p>
      </div>
    </section>
  );
}
