import Image from "next/image";
import Link from "next/link";
import {
  BarChart2,
  Download,
  FileBarChart,
  FileText,
  GraduationCap,
  IndianRupee,
  Phone,
} from "lucide-react";

import { getProgramAffiliations } from "@/lib/affiliationData";
import { PROGRAM_CATEGORIES, PROGRAM_TAGLINES } from "@/lib/program-meta";

import type { ProgramFacilityItem } from "@/components/programs/facilities";
import type { ProgramOutcomeItem } from "@/components/programs/outcomes";
import type { ProgramHighlightItem } from "@/components/programs/highlights";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProgramDetailData = {
  slug: string;
  title: string;
  department?: string | null;
  durationMonths: number;
  tuitionCents: number | null;
  mode?: string | null;
  shortDescription?: string | null;
  fullDescription?: string | null;
  eligibility?: string | null;
  highlights: ProgramHighlightItem[];
  curriculum: Record<string, string[]>;
  outcomes: ProgramOutcomeItem[];
  facilities: ProgramFacilityItem[];
  faqs?: ProgramFaqItem[];
  heroImage?: string | null;
};

export type ProgramFaqItem = {
  q: string;
  a: string;
};

type ProgramDetailPageProps = {
  program: ProgramDetailData;
};

// ─── Document links ───────────────────────────────────────────────────────────

const DOCS = {
  brochure: "/assets/docs/SVIET-Brochure-2025.pdf",
  feeStructure: "/assets/docs/Fee_Structure2026.pdf",
  placementReport: "/assets/docs/placement-report.pdf",
} as const;

// ─── Placement data ───────────────────────────────────────────────────────────

const PLACEMENT_STATS = [
  { label: "Highest Package", value: "60 LPA", sub: "offered to our students" },
  {
    label: "Average Package",
    value: "5.8 LPA",
    sub: "consistent year-on-year growth",
  },
  {
    label: "Recruiting Companies",
    value: "2,200+",
    sub: "hired SVGOI students",
  },
  { label: "Placement Rate", value: "95%+", sub: "students placed every year" },
] as const;

type PlacementStudent = {
  name: string;
  company: string;
  batch: string;
  image: string;
};

const PLACEMENT_POOL: Record<string, PlacementStudent[]> = {
  cse: [
    {
      name: "Prateek Kumar",
      company: "Byju's",
      batch: "2022",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443357/sviet_assets/stu/Prateek.png",
    },
    {
      name: "Naveen Jaiswal",
      company: "Entab Infotech",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443358/sviet_assets/stu/Naveen.png",
    },
    {
      name: "Kshitij Raj",
      company: "Caelius Consulting",
      batch: "2027",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443364/sviet_assets/stu/Kshiti.png",
    },
    {
      name: "Shikha Singh",
      company: "Byju's",
      batch: "2022",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443352/sviet_assets/stu/Shikha.png",
    },
  ],
  mba: [
    {
      name: "Utkarsh Kumar",
      company: "Byju's",
      batch: "2022",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443352/sviet_assets/stu/Utkarsh.png",
    },
    {
      name: "Pallavi Sharma",
      company: "Extra Marks",
      batch: "2021",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443357/sviet_assets/stu/Pallavi.png",
    },
    {
      name: "Priyanshi Sharma",
      company: "Caelius Consulting",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443351/sviet_assets/stu/Priyanshi.png",
    },
    {
      name: "Anam Rashid",
      company: "Skillkart",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443360/sviet_assets/stu/Anam.png",
    },
  ],
  mca: [
    {
      name: "Parvesh Sharma",
      company: "Byju's",
      batch: "2022",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443358/sviet_assets/stu/Parvesh.png",
    },
    {
      name: "Naveen Jaiswal",
      company: "Entab Infotech",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443358/sviet_assets/stu/Naveen.png",
    },
    {
      name: "Taniya Singh",
      company: "Caelius Consulting",
      batch: "2027",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443355/sviet_assets/stu/Taniya.png",
    },
    {
      name: "Mantasha",
      company: "Healthcare",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443364/sviet_assets/stu/Mantasha.png",
    },
  ],
  civil: [
    {
      name: "Kshitij Raj",
      company: "Caelius Consulting",
      batch: "2027",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443364/sviet_assets/stu/Kshiti.png",
    },
    {
      name: "Prateek Kumar",
      company: "Byju's",
      batch: "2022",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443357/sviet_assets/stu/Prateek.png",
    },
    {
      name: "Naveen Jaiswal",
      company: "Entab Infotech",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443358/sviet_assets/stu/Naveen.png",
    },
    {
      name: "Parvesh Sharma",
      company: "Byju's",
      batch: "2022",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443358/sviet_assets/stu/Parvesh.png",
    },
  ],
  pharmacy: [
    {
      name: "Anam Rashid",
      company: "Ucertify",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443360/sviet_assets/stu/Anam.png",
    },
    {
      name: "Parveen Jaiswal",
      company: "Entab Infotech",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443357/sviet_assets/stu/Parveen.png",
    },
    {
      name: "Mantasha",
      company: "Healthcare",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443364/sviet_assets/stu/Mantasha.png",
    },
    {
      name: "Muntaha Tabassum",
      company: "Healthcare",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443360/sviet_assets/stu/Muntaha.png",
    },
  ],
  default: [
    {
      name: "Taniya Singh",
      company: "Caelius Consulting",
      batch: "2027",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443355/sviet_assets/stu/Taniya.png",
    },
    {
      name: "Kshitij Raj",
      company: "Caelius Consulting",
      batch: "2027",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443364/sviet_assets/stu/Kshiti.png",
    },
    {
      name: "Mantasha",
      company: "Healthcare",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443364/sviet_assets/stu/Mantasha.png",
    },
    {
      name: "Parveen Jaiswal",
      company: "Entab Infotech",
      batch: "2025",
      image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443357/sviet_assets/stu/Parveen.png",
    },
  ],
};

function getPlacementData(slug: string) {
  if (
    slug === "btech-computer-science-engineering" ||
    slug === "btech-artificial-intelligence" ||
    slug === "mtech-computer-science-engineering"
  )
    return PLACEMENT_POOL.cse;
  if (
    slug === "master-of-computer-applications" ||
    slug === "bachelor-of-computer-applications" ||
    slug === "bsc-information-technology" ||
    slug === "post-graduate-diploma-in-computer-application" ||
    slug === "bachelor-of-arts-computer-science"
  )
    return PLACEMENT_POOL.mca;
  if (slug.includes("civil")) return PLACEMENT_POOL.civil;
  if (
    slug === "master-of-business-administration" ||
    slug === "bachelor-of-business-administration" ||
    slug === "master-of-commerce" ||
    slug === "bachelor-of-commerce"
  )
    return PLACEMENT_POOL.mba;
  if (
    slug === "bpharmacy" ||
    slug === "pharmad" ||
    slug === "mpharmacy-pharmaceutics" ||
    slug === "mpharmacy-pharmacology" ||
    slug === "diploma-in-pharmacy"
  )
    return PLACEMENT_POOL.pharmacy;
  return PLACEMENT_POOL.default;
}

// ─── Activities data ──────────────────────────────────────────────────────────

type ActivityCard = { title: string; description: string; image: string };
type FeaturedActivity = { title: string; date: string; description: string };
type ActivityPool = { cards: ActivityCard[]; featured: FeaturedActivity };

const ACTIVITIES_POOL: Record<string, ActivityPool> = {
  engineering: {
    cards: [
      {
        title: "Industrial Visit",
        description:
          "Live industry exposure at leading tech & manufacturing plants",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443193/sviet_assets/section_card/Industrial%20Visit.jpg",
      },
      {
        title: "ISTE Convention 2025",
        description: "National summit for engineering educators and innovators",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445126/sviet_assets/section_card/ISTE25.JPG.jpg",
      },
      {
        title: "TEDx SVIET",
        description: "Ideas worth spreading — campus TED experience",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445120/sviet_assets/section_card/TEDx.jpg",
      },
    ],
    featured: {
      title: "IDS Infotech Campus Drive",
      date: "Feb 4, 2024",
      description:
        "Industry leaders from IDS Infotech visited campus for a direct recruitment drive. Students from B.Tech, MCA, and BCA participated in technical assessments and HR rounds, with multiple offer letters rolled out on the same day.",
    },
  },
  management: {
    cards: [
      {
        title: "Elevate — Leadership Meet",
        description:
          "Industry leaders share insights on strategy and leadership",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445130/sviet_assets/section_card/Elevate.jpg",
      },
      {
        title: "Global Finance Summit",
        description: "Perspectives on global markets, banking, and finance",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443238/sviet_assets/section_card/GFS.jpg",
      },
      {
        title: "Industry Interaction",
        description: "Live interaction sessions with corporate professionals",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443264/sviet_assets/section_card/Dev2.jpg",
      },
    ],
    featured: {
      title: "Elevate Leadership Conclave 2025",
      date: "March 15, 2025",
      description:
        "Senior executives from Fortune 500 companies joined SVIET's annual leadership conclave, sharing real-world insights on management, entrepreneurship, and the evolving business landscape for the 2025 batch.",
    },
  },
  medical: {
    cards: [
      {
        title: "Research Centre",
        description:
          "Hands-on sessions at SVIET's advanced research laboratory",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443152/sviet_assets/section_card/ResearchCenter.jpg",
      },
      {
        title: "Laboratory Sessions",
        description: "Practical training in state-of-the-art pharma labs",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443183/sviet_assets/section_card/Labo.jpg",
      },
      {
        title: "Industrial Visit",
        description: "Visits to hospitals, clinics, and pharmaceutical plants",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443193/sviet_assets/section_card/Industrial%20Visit.jpg",
      },
    ],
    featured: {
      title: "Healthcare Industry Interaction",
      date: "Jan 20, 2025",
      description:
        "Senior healthcare professionals and hospital administrators visited campus for a panel discussion on emerging trends in allied health sciences, diagnostics, and pharmaceutical research opportunities for students.",
    },
  },
  hospitality: {
    cards: [
      {
        title: "Spontaneous Events",
        description:
          "Surprise challenges that build real-time hospitality skills",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443172/sviet_assets/section_card/Spont.jpg",
      },
      {
        title: "Elevate — Leadership Meet",
        description: "Grooming future leaders in tourism and hotel management",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445127/sviet_assets/section_card/Elevate2.jpg",
      },
      {
        title: "Campus Life",
        description: "Cultural fests, food fairs, and lifetime campus memories",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443178/sviet_assets/section_card/LifetimeMemory.jpg",
      },
    ],
    featured: {
      title: "International Tourism Week 2025",
      date: "Feb 12, 2025",
      description:
        "SVIET's Hotel Management department hosted a week-long industry immersion with chefs, hotel GMs, and travel executives sharing live insights on hospitality operations, guest experience, and career pathways.",
    },
  },
  law: {
    cards: [
      {
        title: "Convocation Ceremony",
        description:
          "Annual celebration of academic excellence and achievement",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445138/sviet_assets/section_card/Convo.jpg",
      },
      {
        title: "Industry Interaction",
        description:
          "Legal professionals share real-world courtroom experience",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443266/sviet_assets/section_card/Dev3.jpg",
      },
      {
        title: "TEDx SVIET",
        description:
          "Thought leadership talks covering justice, policy, and law",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445122/sviet_assets/section_card/TEDx3.jpg",
      },
    ],
    featured: {
      title: "National Moot Court Competition",
      date: "April 5, 2025",
      description:
        "Students from law schools across North India competed at SVIET's annual Moot Court. High Court advocates served as judges, evaluating legal arguments and courtroom advocacy skills in a real-world courtroom simulation.",
    },
  },
  default: {
    cards: [
      {
        title: "TEDx SVIET",
        description: "Ideas worth spreading — campus TED experience",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445120/sviet_assets/section_card/TEDx.jpg",
      },
      {
        title: "Industrial Visit",
        description:
          "Live industry exposure at leading plants and organisations",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443193/sviet_assets/section_card/Industrial%20Visit.jpg",
      },
      {
        title: "Elevate — Leadership Meet",
        description: "Industry leaders share insights on strategy and careers",
        image: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445130/sviet_assets/section_card/Elevate.jpg",
      },
    ],
    featured: {
      title: "TEDx SVIET 2025",
      date: "March 10, 2025",
      description:
        "SVIET's flagship TEDx event brought together innovators, entrepreneurs, and academics to share transformative ideas. Students engaged in live Q&A sessions with speakers from technology, social impact, and creative industries.",
    },
  },
};

function getActivities(slug: string): ActivityPool {
  if (
    slug.includes("engineering") ||
    slug.includes("btech") ||
    slug.includes("mtech") ||
    slug.includes("diploma") ||
    slug.includes("information-technology") ||
    slug.includes("computer-applications") ||
    slug.includes("master-of-computer") ||
    slug.includes("bachelor-of-computer")
  )
    return ACTIVITIES_POOL.engineering;
  if (
    slug.includes("business") ||
    slug.includes("commerce") ||
    slug.includes("mba") ||
    slug.includes("bba")
  )
    return ACTIVITIES_POOL.management;
  if (
    slug.includes("pharmacy") ||
    slug.includes("pharma") ||
    slug.includes("medical") ||
    slug.includes("physiotherapy") ||
    slug.includes("cardiac") ||
    slug.includes("radiology") ||
    slug.includes("anesthesia") ||
    slug.includes("optometry") ||
    slug.includes("operation") ||
    slug.includes("microbiology") ||
    slug.includes("nursing") ||
    slug.includes("hospital")
  )
    return ACTIVITIES_POOL.medical;
  if (
    slug.includes("hotel") ||
    slug.includes("catering") ||
    slug.includes("bvoc") ||
    slug.includes("nutrition")
  )
    return ACTIVITIES_POOL.hospitality;
  if (slug.includes("llb") || slug.includes("law") || slug.includes("b-a-l"))
    return ACTIVITIES_POOL.law;
  return ACTIVITIES_POOL.default;
}


// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(months: number) {
  const y = months / 12;
  return Number.isInteger(y) ? `${y} Years` : `${y.toFixed(1)} Years`;
}

function formatFees(cents: number | null) {
  if (!cents) return "Contact Admissions";
  return `₹${(cents / 100).toLocaleString("en-IN")} / Year`;
}

function formatMode(mode?: string | null) {
  if (!mode) return "Full-time";
  return mode
    .toLowerCase()
    .split("_")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function getHeroImage(heroImage?: string | null) {
  return heroImage && heroImage.startsWith("/") ? heroImage : null;
}

function isAutonomousProgram(slug: string) {
  const s = String(slug).toLowerCase();
  return (
    s.includes("btech") ||
    s.includes("mtech") ||
    s.includes("master-of-business") ||
    s.includes("mba") ||
    s.includes("master-of-computer") ||
    s.includes("mca")
  );
}

const AICTE_SLUGS = new Set([
  // B.Tech
  "btech-civil-engineering", "btech-civil",
  "btech-cse", "btech-computer-science-engineering",
  "btech-electrical-engineering", "btech-ee",
  "btech-ece", "btech-electronics-communication-engineering",
  "btech-mechanical-engineering", "btech-me",
  "btech-artificial-intelligence", "btech-ai",
  // M.Tech
  "mtech-civil", "mtech-civil-engineering",
  "mtech-cse", "mtech-computer-science-engineering",
  "mtech-electronics-communication-engineering",
  "mtech-mechanical-engineering",
  // MBA / MCA
  "mba", "master-of-business-administration", "masters-in-business-administration",
  "mca", "master-of-computer-applications", "masters-in-computer-applications",
  // BBA / BCA
  "bba",
  "bachelor-of-business-administration", "bachelor-of-business-administration-svcmt",
  "bachelor-of-business-administration-svftm", "bachelor-in-business-administration",
  "bca",
  "bachelor-of-computer-applications", "bachelor-of-computer-applications-svcmt",
  "bachelor-of-computer-applications-svftm", "bachelor-in-computer-application",
  // Diploma
  "diploma-civil", "diploma-in-civil-engineering",
  "diploma-me", "diploma-in-mechanical-engineering",
  "diploma-cse", "diploma-in-computer-science-engineering", "diploma-computer-science-engineering",
  "diploma-ee", "diploma-in-electrical-engineering",
  "diploma-in-medical-lab-technology", "dmlt",
]);

const NCTE_SLUGS = new Set([
  "bed", "bachelor-in-education",
  "med", "masters-in-education",
]);

const PCI_SLUGS = new Set([
  "dpharm", "diploma-in-pharmacy",
  "bpharmacy", "bpharm",
  "mpharmacy-pharmacology", "mpharmacology",
  "mpharmacy-pharmaceutics", "mpharmaceutics", "mpharm",
  "pharmad", "pharmd",
]);

const BCI_SLUGS = new Set([
  "llb",
  "ba-llb",
]);

function getApprovalBody(slug: string): string | null {
  if (AICTE_SLUGS.has(slug)) return "AICTE";
  if (NCTE_SLUGS.has(slug)) return "NCTE";
  if (PCI_SLUGS.has(slug)) return "PCI";
  if (BCI_SLUGS.has(slug)) return "BCI";
  return null;
}

function parseEligibility(eligibility?: string | null) {
  if (!eligibility) return [];
  const str = String(eligibility);

  // Prefer explicit newline separators (clean data format)
  if (str.includes("\n")) {
    return str
      .split(/\r?\n/)
      .map((p) => p.replace(/^[\s\-•*]+/, "").trim())
      .filter(Boolean);
  }

  // Legacy fallback: split on semicolons, leading dashes, or sentence endings
  const normalized = str
    .replace(/\s*;\s*/g, "\n")
    .replace(/\r\n|\r/g, "\n");

  return normalized
    .split(/\n|(?<=[.?!])\s+(?=[A-Z])/)
    .map((p) => p.replace(/^[-–—•]\s*/, "").trim())
    .filter(Boolean);
}

// ─── Accent header helper ─────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1 w-8 rounded-full bg-[#f7941d]" />
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f7941d]">
        {text}
      </p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProgramDetailPage({ program }: ProgramDetailPageProps) {
  const heroImage = getHeroImage(program.heroImage);
  const students = getPlacementData(program.slug);
  const activityPool = getActivities(program.slug);
  const approvalBody = getApprovalBody(program.slug);
  const affiliations = getProgramAffiliations(program.slug);
  const overviewCopy =
    program.fullDescription ?? program.shortDescription ?? "";
  const majorTracks = program.outcomes
    .slice(0, 8)
    .map((o) => o.title)
    .filter(Boolean);

  return (
    <main className="bg-white text-[#111827]">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="-mt-30 w-full bg-[#050d1f] pt-30 text-white">
        <div className="relative min-h-125 w-full overflow-hidden md:min-h-145 lg:min-h-170">
          {heroImage && (
            <Image
              src={heroImage}
              alt={program.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
          {/* Decorative rings */}
          <div className="pointer-events-none absolute -right-28 -top-28 h-[480px] w-[480px] rounded-full border border-white/5" />
          <div className="pointer-events-none absolute -right-14 -top-14 h-72 w-72 rounded-full border border-white/5" />
          <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/78 to-black/30" />

          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-16 pt-28 md:px-6 md:pb-20 md:pt-36 lg:grid-cols-[1.2fr_340px] lg:items-end lg:pb-24 lg:pt-44">
            <div>
              {(PROGRAM_CATEGORIES[program.slug] ?? program.department) && (
                <span className="inline-block rounded-full border border-[#f7941d]/40 bg-[#f7941d]/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#f7941d]">
                  {PROGRAM_CATEGORIES[program.slug] ?? program.department}
                </span>
              )}
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                {program.title}
              </h1>
              <p className="mt-4 text-sm font-bold tracking-[0.18em] uppercase text-[#f7941d]/90 md:text-base">
                {PROGRAM_TAGLINES[program.slug] ?? program.shortDescription ?? "CONTACT ADMISSIONS FOR FULL PROGRAM DETAILS"}
              </p>

              {/* 3 CTA buttons */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://admission.sviet.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#f7941d] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#e07b12]"
                >
                  <GraduationCap className="h-4 w-4" />
                  Apply Now
                </a>
                <a
                  href={DOCS.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/30 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/15"
                >
                  <Download className="h-4 w-4" />
                  Download Brochure
                </a>
                <a
                  href={DOCS.feeStructure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#f7941d]/40 bg-[#f7941d]/10 px-6 py-3 text-sm font-semibold text-[#fbbf6f] backdrop-blur-sm transition hover:bg-[#f7941d]/20"
                >
                  <IndianRupee className="h-4 w-4" />
                  Fee Structure
                </a>
              </div>

              {/* Quick facts */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm text-white/55">
                <span>⏱ {formatDuration(program.durationMonths)}</span>
                {approvalBody && <span>✓ {approvalBody} Approved</span>}
                {affiliations.length > 0
                  ? affiliations.map((uni) => (
                      <span key={uni}>🏛 {uni} Affiliated</span>
                    ))
                  : <span>🏛 Affiliation info not available</span>}
                {isAutonomousProgram(program.slug) && (
                  <span>Autonomous Institute</span>
                )}
              </div>
            </div>

            {/* Sidebar quick-info card */}
            <aside className="border border-white/12 bg-black/52 p-5 backdrop-blur-md">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#f7941d]">
                Program Details
              </p>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-white/8 pb-3">
                  <dt className="text-white/48">Duration</dt>
                  <dd className="font-semibold text-white">
                    {formatDuration(program.durationMonths)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-3">
                  <dt className="text-white/48">Mode</dt>
                  <dd className="font-semibold text-white">
                    {formatMode(program.mode)}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-2 border-b border-white/8 pb-3">
                  <dt className="shrink-0 text-white/48">Affiliation</dt>
                  <dd className="flex flex-wrap justify-end gap-1">
                    {affiliations.length > 0
                      ? affiliations.map((uni) => (
                          <span
                            key={uni}
                            className="rounded bg-white/10 px-2 py-0.5 text-xs font-semibold text-white"
                          >
                            {uni}
                          </span>
                        ))
                      : <span className="text-xs font-semibold text-white/60">
                          Affiliation info not available
                        </span>}
                  </dd>
                </div>
                {approvalBody && (
                  <div className="flex items-center justify-between border-b border-white/8 pb-3">
                    <dt className="text-white/48">Approval</dt>
                    <dd className="font-semibold text-white">
                      {approvalBody} Approved
                    </dd>
                  </div>
                )}
                {isAutonomousProgram(program.slug) && (
                  <div className="flex items-center justify-between">
                    <dt className="text-white/48">Status</dt>
                    <dd className="font-semibold text-white">
                      Autonomous Institute
                    </dd>
                  </div>
                )}
              </dl>
              <Link
                href={`/admissions?program=${program.slug}`}
                className="mt-4 block w-full bg-[#f7941d] py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#e07b12]"
              >
                Apply for 2026-27
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Program Overview ──────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
            <div>
              <SectionLabel text="Program Overview" />
              <h2 className="mt-3 text-3xl font-extrabold text-[#0b3b8f] md:text-4xl">
                {program.title}
              </h2>
              {overviewCopy && (
                <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-[1.05rem]">
                  {overviewCopy}
                </p>
              )}
              {majorTracks.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Major Tracks / Specialisations
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {majorTracks.map((track) => (
                      <span
                        key={track}
                        className="rounded-full border border-[#0b3b8f]/20 bg-[#0b3b8f]/5 px-4 py-1.5 text-sm font-medium text-[#0b3b8f] transition hover:bg-[#0b3b8f]/10"
                      >
                        {track}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {program.eligibility && (
                <div className="rounded-2xl border-l-4 border-[#f7941d] bg-[#fff8f0] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f7941d]">
                    Eligibility Criteria
                  </p>
                  {(() => {
                    const points = parseEligibility(program.eligibility);
                    if (points.length > 0) {
                      return (
                        <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc pl-5">
                          {points.map((pt, i) =>
                            pt.trim() === "OR" ? (
                              <li key={i} className="list-none -ml-5 font-semibold text-[#f7941d]">
                                OR
                              </li>
                            ) : (
                              <li key={i} className="leading-relaxed">
                                {pt.replace(/[.\s]+$/, "")}
                              </li>
                            )
                          )}
                        </ul>
                      );
                    }
                    return (
                      <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        {program.eligibility}
                      </p>
                    );
                  })()}
                </div>
              )}
              <div className="rounded-2xl border-l-4 border-[#0b3b8f] bg-[#f0f5ff] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b3b8f]">
                  Affiliations &amp; Approval
                </p>
                <div className="mt-2 space-y-1 text-sm font-medium text-gray-700">
                  {affiliations.length > 0
                    ? affiliations.map((uni) => (
                        <p key={uni}>Affiliated to {uni}</p>
                      ))
                    : <p>Affiliation info not available</p>}
                  {approvalBody && <p>Approved by {approvalBody}</p>}
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Mode of Admission
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  Apply online or visit campus. Admissions open for 2026-27.
                </p>
                <a
                  href="https://admission.sviet.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#f7941d] hover:underline"
                >
                  Apply Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Career Outcomes ───────────────────────────────────────────────────── */}
      {program.outcomes.length > 0 && (
        <section className="bg-[#f8faff] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionLabel text="Career Pathways" />
            <h2 className="mt-3 text-3xl font-extrabold text-[#0b3b8f] md:text-4xl">
              What can you become?
            </h2>
            {program.shortDescription && (
              <p className="mt-2 max-w-2xl text-base text-gray-500">
                {program.shortDescription}
              </p>
            )}
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {program.outcomes.map((outcome, i) => (
                <article
                  key={outcome.title}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {outcome.image && outcome.image.startsWith("/") ? (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={outcome.image}
                        alt={outcome.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded-full bg-[#f7941d] px-2.5 py-0.5 text-xs font-bold text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  ) : (
                    <div className="flex h-20 items-center bg-linear-to-br from-[#0b3b8f]/8 to-[#f7941d]/8 px-4">
                      <span className="text-4xl font-black text-[#0b3b8f]/15">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-[#111827]">
                      {outcome.title}
                    </h3>
                    {outcome.description && (
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                        {outcome.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Program Highlights ────────────────────────────────────────────────── */}
      {program.highlights.length > 0 && (
        <section className="relative overflow-hidden bg-[#0b3b8f] py-16 text-white md:py-20">
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full border-2 border-white/10" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full border border-white/8" />
          <div className="pointer-events-none absolute -right-16 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-[#f7941d]/15" />

          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
              <div className="flex flex-col">
                <SectionLabel text="Why This Program" />
                <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
                  Program
                  <br />
                  Highlights
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  Built to develop industry-ready professionals through
                  structured learning and real-world exposure.
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {program.highlights.map((h) => (
                  <li
                    key={h.title}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f7941d] text-xs font-bold text-white">
                      ✓
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {h.title}
                      </p>
                      {h.description && (
                        <p className="mt-0.5 text-xs text-white/50">
                          {h.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ── Laboratories & Facilities ─────────────────────────────────────────── */}
      {program.facilities.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionLabel text="Infrastructure" />
            <h2 className="mt-3 text-3xl font-extrabold text-[#0b3b8f] md:text-4xl">
              Laboratories &amp; Facilities
            </h2>
            <p className="mt-1 text-base text-gray-400">
              Where theories meet hands-on practice
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {program.facilities.map((facility) => (
                <article
                  key={facility.title}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-lg hover:ring-[#0b3b8f]/25"
                >
                  {facility.image && facility.image.startsWith("/") ? (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-24 items-center justify-center bg-linear-to-br from-[#f0f5ff] to-[#e8f0fe]">
                      <span className="text-3xl">🔬</span>
                    </div>
                  )}
                  <div className="border-t-2 border-[#f7941d] p-4">
                    <h3 className="font-bold text-[#111827]">
                      {facility.title}
                    </h3>
                    {facility.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {facility.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Placement Overview ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#050d1f] py-16 text-white md:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full border border-[#f7941d]/12" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 rounded-full border border-[#f7941d]/8" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <SectionLabel text="Placement Spotlight" />
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
            Placement Overview
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/50">
            Key takeaways from 2022–26 placement sessions
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[360px_1fr]">
            {/* Left — stats + actions */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-3">
                {PLACEMENT_STATS.map(({ label, value, sub }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <p className="text-2xl font-extrabold text-[#f7941d]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-white/80">
                      {label}
                    </p>
                    <p className="text-[10px] text-white/38">{sub}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm leading-relaxed text-white/55">
                Our students consistently secure roles at leading organisations.
                The Training &amp; Placement Cell bridges academic learning with
                industry expectations through structured preparation and
                corporate connect.
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={DOCS.placementReport}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#f7941d] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#e07b12]"
                >
                  <FileBarChart className="h-4 w-4" />
                  View Placement Report
                </a>
                <Link
                  href="/placements"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  See All Placements →
                </Link>
              </div>
            </div>

            {/* Right — 2×2 student photo grid */}
            <div className="grid grid-cols-2 gap-4">
              {students.map((student) => (
                <div
                  key={student.name}
                  className="group relative overflow-hidden rounded-2xl bg-gray-900"
                >
                  <div className="relative h-64 w-full overflow-hidden md:h-72">
                    <Image
                      src={student.image}
                      alt={student.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 20vw"
                      className="object-contain object-top transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-bold leading-tight text-white">
                      {student.name}
                    </p>
                    <div className="mt-1.5 inline-flex items-center rounded-full bg-[#f7941d] px-2.5 py-0.5">
                      <span className="text-[11px] font-bold text-white">
                        {student.company}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] font-medium text-white/48">
                      Class of {student.batch}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Activities & Events ───────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionLabel text="Campus Life" />
          <h2 className="mt-3 text-3xl font-extrabold text-[#0b3b8f] md:text-4xl">
            Activities &amp; Events
          </h2>
          <p className="mt-3 max-w-2xl text-base text-gray-500">
            Life at SVIET extends beyond the classroom — through expert talks,
            industry interactions, cultural festivals, and more.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_300px] lg:items-stretch">
            {/* Left — 3 image cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {activityPool.cards.map((card) => (
                <div
                  key={card.title}
                  className="group relative overflow-hidden rounded-2xl shadow-sm"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 22vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-bold leading-tight">
                      {card.title}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-black/68">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — featured event (dark navy) */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#0b3b8f] p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-5 -top-5 h-22 w-22 rounded-full border border-white/8" />
              <div>
                <span className="inline-block rounded-full bg-[#f7941d]/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#f7941d]">
                  {activityPool.featured.date}
                </span>
                <h3 className="mt-3 text-xl font-extrabold leading-tight text-white">
                  {activityPool.featured.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/62">
                  {activityPool.featured.description}
                </p>
              </div>
              <Link
                href="/events"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#f7941d] py-3 text-sm font-bold text-white transition hover:bg-[#e07b12]"
              >
                Know More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA Strip ───────────────────────────────────────────────────── */}
      <section className="bg-[#0b3b8f] py-6 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/48">
              Admissions Open · 2026-27
            </p>
            <p className="mt-0.5 text-lg font-bold">
              Apply for {program.title} before seats fill
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={DOCS.feeStructure}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/22 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Fee Structure
            </a>
            <a
              href={DOCS.placementReport}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/22 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Placement Report
            </a>
            <a
              href="https://admission.sviet.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f7941d] px-7 py-2.5 text-sm font-bold text-white transition hover:bg-[#e07b12]"
            >
              Apply Now →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
