import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import programCatalog from "@/data/data/data";
import { ProgramDetailPage } from "@/components/programs/program-page";
import { prisma } from "@/lib/prisma";
import type { ProgramFacilityItem } from "@/components/programs/facilities";
import type { ProgramHighlightItem } from "@/components/programs/highlights";
import type { ProgramOutcomeItem } from "@/components/programs/outcomes";

export const revalidate = 3600;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ProgramCatalogEntry = {
  category?: string;
  course_name?: string;
  event_type?: string;
  program_name?: string;
  program_description?: string;
  program_highlights?: unknown;
  program_outcomes?: unknown;
  labs?: unknown;
  eligibility_criteria?: { eligibility?: unknown } | null;
  header?: {
    title?: unknown;
    background_image?: unknown;
  } | null;
};

function parseStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function parseCurriculum(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {} as Record<string, string[]>;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, val]) => [
      key,
      Array.isArray(val)
        ? val.filter((item): item is string => typeof item === "string")
        : [],
    ]),
  );
}

function parseHeroImage(value: unknown) {
  if (!Array.isArray(value)) {
    return null;
  }

  const heroImageEntry = value.find(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "q" in item &&
      "a" in item &&
      (item as { q?: unknown }).q === "heroImage" &&
      typeof (item as { a?: unknown }).a === "string",
  ) as { a: string } | undefined;

  return heroImageEntry?.a ?? null;
}

function parseFaqEntries(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as Array<{ q: string; a: string }>;
  }

  return value
    .map((item) => {
      if (typeof item !== "object" || item === null) {
        return null;
      }

      const q = "q" in item && typeof item.q === "string" ? item.q : null;
      const a = "a" in item && typeof item.a === "string" ? item.a : null;

      if (!q || !a) {
        return null;
      }

      return { q, a };
    })
    .filter((item): item is { q: string; a: string } => Boolean(item));
}

function normalizeProgramText(value: string) {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveCatalogSlug(item: ProgramCatalogEntry) {
  const category = normalizeProgramText(
    item.course_name ?? item.event_type ?? "",
  );
  const categoryCompact = category.replace(/\s+/g, "");
  const title = normalizeProgramText(
    item.program_name ?? item.header?.title?.toString() ?? "",
  );

  if (categoryCompact.includes("btech")) {
    if (title.includes("artificial intelligence")) return "btech-ai";
    if (title.includes("computer science")) return "btech-cse";
    if (title.includes("electronics") && title.includes("communication"))
      return "btech-ece";
    if (title.includes("electrical")) return "btech-ee";
    if (title.includes("mechanical")) return "btech-me";
    if (title.includes("civil")) return "btech-civil";
  }

  if (categoryCompact.includes("mtech")) {
    if (title.includes("computer science")) return "mtech-cse";
    if (title.includes("civil")) return "mtech-civil";
    if (title.includes("electrical")) return "mtech-ee";
  }

  if (categoryCompact.includes("diploma")) {
    if (title.includes("computer science")) return "diploma-cse";
    if (title.includes("electrical")) return "diploma-ee";
    if (title.includes("mechanical")) return "diploma-me";
    if (title.includes("civil")) return "diploma-civil";
  }

  if (categoryCompact.includes("business")) {
    if (title.includes("master of business administration")) return "mba";
    if (title.includes("business administration")) return "bba";
    if (title.includes("commerce")) return "bcom";
  }

  if (categoryCompact.includes("computerapp")) {
    if (title.includes("master of computer applications")) return "mca";
    if (title.includes("post graduate diploma in computer applications"))
      return "pgdca";
    if (title.includes("information technology")) return "bsc-it";
    if (title.includes("computer applications")) return "bca";
  }

  if (categoryCompact.includes("education")) {
    if (title.includes("master of education")) return "med";
    if (title.includes("bachelor of education")) return "bed";
    if (title.includes("b a program") || title === "ba program") return "ba";
    if (title.includes("bachelor of arts") || title.includes("arts"))
      return "education-arts";
  }

  if (categoryCompact.includes("hm")) {
    if (title.includes("mhmct")) return "mhmct";
    if (title.includes("catering")) return "catering-hospitality";
    if (title.includes("hospitality")) return "bvoc-hospitality";
    if (title.includes("nutrition")) return "bsc-hm";
  }

  if (categoryCompact.includes("law")) {
    if (title.includes("b a ll b") || title.includes("ll b")) return "ba-llb";
    if (title.includes("bachelor of law")) return "llb";
  }

  if (categoryCompact.includes("paramedical")) {
    if (title.includes("diploma in medical laboratory technology"))
      return "dmlt";
    if (title.includes("medical lab sciences")) return "paramedical-lab";
    if (title.includes("medical laboratory science")) return "mls";
    if (title.includes("radiology")) return "radiology";
    if (title.includes("optometry")) return "optometry";
    if (title.includes("physiotherapy")) return "physiotherapy";
    if (title.includes("cardiac")) return "paramedical-cardiac";
    if (title.includes("anesthesia") || title.includes("anasthesia"))
      return title.includes("technolog")
        ? "paramedical-anesthesia"
        : "paramedical-anasthesia";
    if (title.includes("operation theatre")) return "ot";
  }

  if (categoryCompact.includes("pharmacy")) {
    if (title.includes("master of pharmacy")) return "mpharm";
    if (title.includes("diploma in pharmacy")) return "dpharm";
    if (title.includes("pharm d")) return "pharmd";
    if (title.includes("bachelor of pharmacy")) return "bpharm";
  }

  if (categoryCompact.includes("science")) {
    if (title.includes("chemistry")) return "chemistry";
    if (title.includes("mathematics")) return "maths";
    if (title.includes("non medical")) return "non-medical";
    if (title.includes("physics")) return "physics";
  }

  if (title.includes("chartered accountancy")) {
    return "ca";
  }

  return null;
}

function normalizeHighlightItems(value: unknown): ProgramHighlightItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const highlights: ProgramHighlightItem[] = [];

  for (const item of value) {
    if (typeof item === "string") {
      const [rawTitle, ...rest] = item.split(":");
      const title = rawTitle.trim();

      if (!title) {
        continue;
      }

      highlights.push({
        title,
        description: rest.join(":").trim() || undefined,
      });
      continue;
    }

    if (typeof item !== "object" || item === null || !("title" in item)) {
      continue;
    }

    if (typeof item.title !== "string" || !item.title.trim()) {
      continue;
    }

    const description =
      "description" in item && typeof item.description === "string"
        ? item.description
        : "desc" in item && typeof item.desc === "string"
          ? item.desc
          : undefined;

    highlights.push({
      title: item.title,
      description,
    });
  }

  return highlights;
}

function normalizeOutcomeItems(value: unknown): ProgramOutcomeItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const outcomes: ProgramOutcomeItem[] = [];

  value.forEach((item, index) => {
    if (typeof item === "string") {
      outcomes.push({ title: item, description: undefined });
      return;
    }

    if (typeof item !== "object" || item === null) {
      return;
    }

    const title =
      "title" in item && typeof item.title === "string"
        ? item.title
        : `Outcome ${index + 1}`;
    const description =
      "desc" in item && typeof item.desc === "string"
        ? item.desc
        : "description" in item && typeof item.description === "string"
          ? item.description
          : undefined;
    const image =
      "image" in item &&
      typeof item.image === "string" &&
      item.image.startsWith("/")
        ? item.image
        : null;

    outcomes.push({ title, description, image });
  });

  return outcomes;
}

function normalizeFacilityItems(value: unknown): ProgramFacilityItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const facilities: ProgramFacilityItem[] = [];

  value.forEach((item, index) => {
    if (typeof item === "string") {
      facilities.push({ title: item, description: undefined, image: null });
      return;
    }

    if (typeof item !== "object" || item === null) {
      return;
    }

    const title =
      "title" in item && typeof item.title === "string"
        ? item.title
        : `Facility ${index + 1}`;
    const description =
      "description" in item && typeof item.description === "string"
        ? item.description
        : undefined;
    const image =
      "image" in item &&
      typeof item.image === "string" &&
      item.image.startsWith("/")
        ? item.image
        : null;

    facilities.push({ title, description, image });
  });

  return facilities;
}

function normalizeFaqItems(value: unknown) {
  return parseFaqEntries(value);
}

// Variant programs (institution-specific copies) redirect to their canonical page
// so users always see one unified page with all affiliations shown.
const SLUG_REDIRECTS: Record<string, string> = {
  "bachelor-of-computer-applications-svftm": "bachelor-of-computer-applications",
  "bachelor-of-computer-applications-svcmt": "bachelor-of-computer-applications",
  "bachelor-of-business-administration-svftm": "bachelor-of-business-administration",
  "bachelor-of-business-administration-svcmt": "bachelor-of-business-administration",
  "bsc-medical-lab-sciences-svftm": "bsc-medical-lab-sciences",
  "bsc-operation-theatre-technology-svftm": "bsc-hons-operation-theatre-technology",
  "bsc-radiology-svftm": "bsc-radiology-imaging-technology",
};

const PROGRAM_HERO_IMAGES: Record<string, string> = {
  // Pharmacy
  bpharmacy: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446537/sviet_assets/rest/j0j55brc2tytevyqqlmb.jpg",
  pharmad: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446547/sviet_assets/rest/ybhjnzsaytp8yuhqfa4h.jpg",
  "mpharmacy-pharmaceutics": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446534/sviet_assets/rest/jwsflovpeyzl6skdkcxc.jpg",
  "mpharmacy-pharmacology": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446534/sviet_assets/rest/jwsflovpeyzl6skdkcxc.jpg",
  // Diploma
  "diploma-in-pharmacy": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446529/sviet_assets/rest/gcv42guxihr1zjnylb5y.avif",
  "diploma-in-mechanical-engineering": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446432/sviet_assets/rest/ah5nm4pvyppj716r7h24.jpg",
  "diploma-in-civil-engineering":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446420/sviet_assets/rest/rybuxksorlw50h2wakx0.jpg",
  "diploma-in-electrical-engineering": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446428/sviet_assets/rest/rdw1wmzbpmrtgr7z7awx.jpg",
  "diploma-computer-science-engineering":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446423/sviet_assets/rest/ydweezeukwxrjsuakbty.jpg",
  "diploma-in-medical-lab-technology":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446503/sviet_assets/rest/e31prno30tkdogcyz5ls.avif",
  // B.Tech
  "btech-civil-engineering": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446338/sviet_assets/rest/ybgfnxmczfgpgiyj4zhg.jpg",
  "btech-computer-science-engineering":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446346/sviet_assets/rest/y6c9sgzd3onyxvvp8hyd.avif",
  "btech-electrical-engineering": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446373/sviet_assets/rest/qb3kslby9pgfv0cmzrng.jpg",
  "btech-electronics-communication-engineering":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446367/sviet_assets/rest/tcjjdnczabp8epjqhoix.avif",
  "btech-mechanical-engineering": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446389/sviet_assets/rest/vqylqkwvmlz6ymnglzc5.jpg",
  "btech-artificial-intelligence": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446346/sviet_assets/rest/y6c9sgzd3onyxvvp8hyd.avif",
  // M.Tech
  "mtech-computer-science-engineering": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446485/sviet_assets/rest/zgbr7kb25y03qmdti0xp.jpg",
  "mtech-mechanical-engineering": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446389/sviet_assets/rest/vqylqkwvmlz6ymnglzc5.jpg",
  "mtech-electronics-communication-engineering":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446489/sviet_assets/rest/aomtv6odg4m9hilwlsqe.jpg",
  "mtech-civil-engineering": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446480/sviet_assets/rest/wbibvyn6qam52mrzevs7.avif",
  // Computer Applications
  "master-of-computer-applications":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446415/sviet_assets/rest/fnbg7zkrqzzpvjngbfge.avif",
  "bachelor-of-computer-applications":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446407/sviet_assets/rest/g9dcvjg39hfeiibueqlo.jpg",
  "post-graduate-diploma-in-computer-application":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446417/sviet_assets/rest/bsinga8zt7slln2isomg.avif",
  "bsc-information-technology":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446412/sviet_assets/rest/vdnich2wbs1k5lyrzku2.jpg",
  "bachelor-of-arts-computer-science":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446437/sviet_assets/rest/z5e3oswqqgpzudzvclft.avif",
  // Management
  "master-of-business-administration": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446404/sviet_assets/rest/natuu0bauptuihbu3afi.avif",
  "bachelor-of-business-administration":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446393/sviet_assets/rest/c0bp6n53y16av0qtm6dn.jpg",
  // Commerce
  "master-of-commerce": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446400/sviet_assets/rest/oruvy8hjygf3yemhhh4q.jpg",
  "bachelor-of-commerce": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446397/sviet_assets/rest/wohhzpm1874iwfb1cnbr.avif",
  // Hotel Management
  "bachelor-of-hotel-management-catering-technology":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446458/sviet_assets/rest/uwjwmuotsmdrhehurux4.jpg",
  "master-of-hotel-management-catering-technology":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446473/sviet_assets/rest/ufs7r1qn3dhqk6xizzal.jpg",
  "bvoc-hotel-management-catering": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446454/sviet_assets/rest/egv1bpos7dkknaiod06w.jpg",
  "bsc-honors-in-nutrition-and-dietetics": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446449/sviet_assets/rest/ly64btgvfeaqrhavpgdj.jpg",
  // Medical Sciences & Allied Health
  "bsc-medical-lab-sciences": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446507/sviet_assets/rest/eez0dp16h8dagctjproi.avif",
  "bsc-radiology-imaging-technology":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446527/sviet_assets/rest/mnj62stxbfullm4ntwvb.jpg",
  "bsc-operation-theater-technology": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446519/sviet_assets/rest/hzpnfodaiur0d9et4kjq.avif",
  "bsc-cardiac-care-technology":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446500/sviet_assets/rest/sewokkzvmesxc0nfnkyy.avif",
  "bsc-hons-operation-theatre-technology":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446519/sviet_assets/rest/hzpnfodaiur0d9et4kjq.avif",
  "bsc-hons-anesthesia-technology":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446493/sviet_assets/rest/efr1bhkpslq0ymbdi2io.jpg",
  "bsc-hons-optometry": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446515/sviet_assets/rest/cardvojgsl9nifngbeie.avif",
  "msc-medical-lab-science-clinical-biochemistry":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446512/sviet_assets/rest/phjufkzrazyt08di1kxj.jpg",
  "msc-anesthesia-operation-theater-technology":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446491/sviet_assets/rest/cqg3kh2y2oylywzdhzmt.jpg",
  "bachelor-of-physiotherapy":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446521/sviet_assets/rest/lv0jyivndt5ouzb2uvi8.avif",
  "msc-cardiac-care-technology":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446500/sviet_assets/rest/sewokkzvmesxc0nfnkyy.avif",
  "msc-medical-microbiology": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446507/sviet_assets/rest/eez0dp16h8dagctjproi.avif",
  "msc-radiology-and-imaging-technology":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446527/sviet_assets/rest/mnj62stxbfullm4ntwvb.jpg",
  "bachelor-in-hospital-administration":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446507/sviet_assets/rest/eez0dp16h8dagctjproi.avif",
  "diploma-in-nursing-assistant":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446507/sviet_assets/rest/eez0dp16h8dagctjproi.avif",
  // Science
  "msc-physics": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446561/sviet_assets/rest/af47ipnkwshzmbwrf3au.avif",
  "msc-math": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446553/sviet_assets/rest/bjbiyfnfqadoyzvtudvl.avif",
  "msc-chemistry": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446551/sviet_assets/rest/lfghx2vgr4fly7jg04di.avif",
  "bsc-non-medical": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446557/sviet_assets/rest/xqaqr2swt6fltenmhgwg.avif",
  // Arts & Education
  "bachelor-of-arts": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446439/sviet_assets/rest/ccy1yzxfnnxjnfm8sgxy.avif",
  "ba-journalism-and-mass-communication":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446438/sviet_assets/rest/qrhnil80rlo6baftcw0f.avif",
  "bachelor-in-education": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446441/sviet_assets/rest/nfjqlokjo7ywch4n3s5y.jpg",
  "ma-education": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446443/sviet_assets/rest/kbccq27s2eulkrca4unz.avif",
  "masters-in-education": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446443/sviet_assets/rest/kbccq27s2eulkrca4unz.avif",
  // Law
  llb: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446479/sviet_assets/rest/vbobetbav3hln5ufl6ya.avif",
  "b-a-l-l-b": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446478/sviet_assets/rest/vmt5we3d5kagktejkdi6.avif",
  "ba-llb": "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446478/sviet_assets/rest/vmt5we3d5kagktejkdi6.avif",
  // SVFTM variants (same images as main programs)
  "bachelor-of-computer-applications-svftm":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446407/sviet_assets/rest/g9dcvjg39hfeiibueqlo.jpg",
  "bachelor-of-business-administration-svftm":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446393/sviet_assets/rest/c0bp6n53y16av0qtm6dn.jpg",
  "bsc-medical-lab-sciences-svftm":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446507/sviet_assets/rest/eez0dp16h8dagctjproi.avif",
  "bsc-operation-theatre-technology-svftm":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446519/sviet_assets/rest/hzpnfodaiur0d9et4kjq.avif",
  "bsc-radiology-svftm":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446527/sviet_assets/rest/mnj62stxbfullm4ntwvb.jpg",
  // SVCMT variants (same images as main programs)
  "bachelor-of-computer-applications-svcmt":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446407/sviet_assets/rest/g9dcvjg39hfeiibueqlo.jpg",
  "bachelor-of-business-administration-svcmt":
    "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446393/sviet_assets/rest/c0bp6n53y16av0qtm6dn.jpg",
};

// ─── Per-program content overrides ───────────────────────────────────────────
// Used to supply or correct content that is wrong/missing/truncated in the DB.

type ProgramContentOverride = {
  shortDescription?: string;
  fullDescription?: string;
  eligibility?: string;
  outcomes?: ProgramOutcomeItem[];
};

const PROGRAM_CONTENT_OVERRIDES: Record<string, ProgramContentOverride> = {
  "bachelor-of-computer-applications": {
    shortDescription:
      "Bachelor of Computer Application (BCA) is an undergraduate degree course that offers a blend of theoretical and practical knowledge in computer applications.",
    fullDescription:
      "Bachelor of Computer Application (BCA) is an undergraduate degree course that offers a blend of theoretical and practical knowledge in computer applications. This program provides students with in-depth understanding and extensive knowledge about various aspects of computer applications, software development, and IT infrastructure.\n\nThe BCA program covers core subjects including programming languages (C, C++, Java, Python), database management systems, data structures, web technologies, networking, and software engineering. Students also gain hands-on experience through lab sessions and project work.\n\nUpon completing BCA, graduates can pursue careers as software developers, web developers, system analysts, database administrators, and IT consultants. They can also opt for higher studies such as MCA or MBA (IT).",
  },
  "bachelor-of-commerce": {
    shortDescription:
      "Bachelor of Commerce [B.Com (H)] is a three-year undergraduate program that provides comprehensive knowledge of commerce, accounting, finance, taxation, and business management.",
    fullDescription:
      "Bachelor of Commerce [B.Com (H)] is a three-year undergraduate program that provides comprehensive knowledge of commerce, accounting, finance, taxation, and business management. The program is designed to equip students with strong analytical and financial skills required for careers in banking, finance, accounting, and corporate management.\n\nCore subjects include Financial Accounting, Business Economics, Corporate Law, Income Tax, Cost Accounting, Auditing, Business Statistics, and Entrepreneurship Development.\n\nGraduates of B.Com (H) are eligible for careers as Chartered Accountants (CA), Company Secretaries (CS), Cost Accountants (CMA), tax consultants, financial analysts, and banking professionals. The degree also serves as a foundation for MBA (Finance) and other postgraduate programs.",
    eligibility:
      "Passed 10+2 (or equivalent) from a recognized board\nMust have studied Commerce/any stream with English as a subject\nMinimum 45% aggregate marks (relaxation for SC/ST as per norms)\nAdmission through merit or entrance test as per university guidelines",
  },
  "copa": {
    eligibility:
      "The minimum educational qualification may vary depending on the specific ITI trade and applicable government regulations.",
  },
  "plumber": {
    eligibility:
      "The minimum educational qualification may vary depending on the specific ITI trade and applicable government regulations.",
  },
  "welderge": {
    eligibility:
      "The minimum educational qualification may vary depending on the specific ITI trade and applicable government regulations.",
  },
  "msc-anesthesia-operation-theater-technology": {
    eligibility:
      "Candidates must have completed B.Sc. in Anesthesia & Operation Theatre Technology.",
  },
  "bachelor-of-arts": {
    fullDescription:
      "Bachelor of Arts (B.A.) is an undergraduate program that focuses on the study of humanities, social sciences, languages, and related disciplines. The program is designed to develop critical thinking, communication, analytical, and problem-solving skills, preparing students for diverse professional and academic opportunities.\n\nIt offers a broad educational foundation while allowing students to specialize in areas of interest. Graduates can pursue careers in fields such as education, journalism, media and communication, advertising, public administration, civil services, law, social work, community development, library and information science, business process outsourcing (BPO), professional writing, and other public and private sector organizations.\n\nThe program also provides a strong foundation for higher studies and research in various disciplines.",
    eligibility:
      "Passed the 10+2 examination from the Punjab School Education Board (PSEB) or any other equivalent recognized board\nMinimum aggregate of 33% to 50% marks depending on the specific subject choices and reserved category status",
  },
  "bsc-radiology-imaging-technology": {
    eligibility:
      "Candidates must have passed Senior Secondary (10+2) examination in Science stream with Physics and Chemistry as compulsory subjects.\nCandidates must have secured a minimum of 50% aggregate marks (45% for candidates belonging to reserved categories) in the qualifying examination.\nOR\nCandidates must possess a Diploma in the relevant field from a recognized institution.",
  },
  "msc-radiology-and-imaging-technology": {
    eligibility:
      "Candidates must have a Bachelor's degree in B.Sc. Radiology & Imaging Technology or related disciplines such as Medical Radiology, Radiological Technology, Radiography, Life Sciences, Medical Laboratory Technology (BMLT), or Physics.\nOR\nCandidates with a Bachelor's degree in Science along with a relevant diploma in Medical Radiology & Imaging Technology and required clinical experience (as per institutional norms).",
  },
  "bachelor-in-hospital-administration": {
    shortDescription:
      "Bachelor in Hospital Administration (BHA) is a three-year undergraduate program that trains students in the management and administration of hospitals, clinics, and other healthcare institutions.",
    fullDescription:
      "Bachelor in Hospital Administration (BHA) is a three-year undergraduate program that trains students in the management and administration of hospitals, clinics, and other healthcare institutions. The program bridges the gap between healthcare services and management principles, producing professionals who can efficiently run medical establishments.\n\nThe curriculum covers Hospital Management, Healthcare Finance, Medical Ethics, Health Laws & Regulations, Human Resource Management in Healthcare, Medical Terminology, Pharmaceutical Management, Patient Care Administration, and Health Information Systems.\n\nGraduates of BHA are in high demand across corporate hospitals, government health departments, NGOs, insurance companies, and healthcare consulting firms.",
    eligibility:
      "Passed 10+2 (or equivalent) from a recognized board\nScience stream preferred, Commerce/Arts students also eligible\nMinimum 45% aggregate marks\nAdmission through merit or entrance test as per IKGPTU guidelines",
    outcomes: [
      {
        title: "Hospital Operations Management",
        description:
          "Lead and manage day-to-day operations in hospitals and healthcare facilities.",
      },
      {
        title: "Healthcare Finance & Billing",
        description:
          "Handle financial management, billing systems, and budgeting in healthcare organizations.",
      },
      {
        title: "Patient Care Administration",
        description:
          "Oversee patient services, admissions, and care coordination across departments.",
      },
      {
        title: "Health Information Systems",
        description:
          "Manage health records, digital health data, and hospital information systems.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (SLUG_REDIRECTS[slug]) return {};

  const program = await prisma.program.findUnique({ where: { slug } });

  if (!program) {
    return {};
  }

  return {
    title: `${program.title} | SVGOI`,
    description: program.shortDescription ?? undefined,
    openGraph: {
      title: `${program.title} | SVGOI`,
      description: program.shortDescription ?? undefined,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      select: { slug: true },
    });

    return programs.map((program) => ({ slug: program.slug }));
  } catch (error) {
    // If database is unavailable (e.g., during build), return empty array
    // Pages will be generated on-demand with dynamicParams = true
    console.warn("Failed to generate static params for programs:", error);
    return [];
  }
}

export default async function ProgramSlugPage({ params }: PageProps) {
  const { slug } = await params;

  const canonicalSlug = SLUG_REDIRECTS[slug];
  if (canonicalSlug) {
    redirect(`/programs/${canonicalSlug}`);
  }

  const program = await prisma.program.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      department: {
        select: {
          name: true,
          slug: true,
        },
      },
      durationMonths: true,
      tuitionCents: true,
      mode: true,
      shortDescription: true,
      fullDescription: true,
      eligibility: true,
      highlights: true,
      curriculum: true,
      outcomes: true,
      facilities: true,
      faqs: true,
      isActive: true,
    },
  });

  if (!program || !program.isActive) {
    notFound();
  }

  const contentOverride = PROGRAM_CONTENT_OVERRIDES[slug];

  const catalogProgram = programCatalog
    .map((item) => ({
      ...(item as ProgramCatalogEntry),
      slug: resolveCatalogSlug(item as ProgramCatalogEntry),
    }))
    .find((item) => item.slug === slug);

  const enrichedProgram = {
    slug: program.slug,
    title: program.title,
    department: program.department?.name ?? catalogProgram?.category ?? null,
    durationMonths: program.durationMonths,
    tuitionCents: program.tuitionCents,
    mode: program.mode,
    shortDescription:
      contentOverride?.shortDescription ??
      program.shortDescription ??
      catalogProgram?.program_description ??
      null,
    fullDescription:
      contentOverride?.fullDescription ??
      program.fullDescription ??
      catalogProgram?.program_description ??
      null,
    eligibility:
      contentOverride?.eligibility ??
      program.eligibility ??
      (catalogProgram?.eligibility_criteria &&
      typeof catalogProgram.eligibility_criteria === "object"
        ? typeof catalogProgram.eligibility_criteria.eligibility === "string"
          ? catalogProgram.eligibility_criteria.eligibility
          : null
        : null),
    highlights: normalizeHighlightItems(
      catalogProgram?.program_highlights ?? program.highlights,
    ),
    curriculum: parseCurriculum(program.curriculum),
    outcomes:
      contentOverride?.outcomes !== undefined
        ? contentOverride.outcomes
        : normalizeOutcomeItems(
            catalogProgram?.program_outcomes ?? program.outcomes,
          ),
    facilities: normalizeFacilityItems(
      catalogProgram?.labs ?? program.facilities,
    ),
    faqs: normalizeFaqItems(program.faqs),
    heroImage:
      parseHeroImage(program.faqs) ?? PROGRAM_HERO_IMAGES[program.slug] ?? null,
  };

  return <ProgramDetailPage program={enrichedProgram} />;
}
