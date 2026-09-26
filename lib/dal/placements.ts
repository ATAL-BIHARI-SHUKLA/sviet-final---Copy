import "server-only";

import { prisma } from "@/lib/db";

export type PlacementRecordRow = {
  id: string;
  name: string;
  year: number;
  company: string;
  packageValue: number;
  packageLabel: string;
  imageSrc: string | null;
  imageAlt: string | null;
  isShowcase: boolean;
  sortOrder: number;
};

export type PlacementTrendYearRow = {
  year: string;
  companiesVisited: number;
  highestPackageLpa: number;
  averagePackageLpa: number;
};

export type PlacementHighlightBannerRow = {
  id: string;
  badgeText: string;
  studentName: string;
  company: string;
  packageLabel: string;
  batchYear: string;
  imageSrc: string;
  imageAlt: string;
};

export type PlacementKeyStatRow = {
  id: string;
  value: string;
  label: string;
};

export type ShowcaseCard = PlacementRecordRow & {
  cardTone: string;
  badgeTone: string;
  imageAlt: string;
};

// ─── fallback data (used when DB tables are empty or migration not applied) ───

const FALLBACK_SHOWCASE_CARDS: ShowcaseCard[] = [
  { id: "f1", name: "Taniya Singh", year: 2027, company: "Caelius Consulting", packageValue: 12, packageLabel: "12 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443355/sviet_assets/stu/Taniya.png", imageAlt: "Taniya Singh placement highlight", isShowcase: true, sortOrder: 0, cardTone: "bg-[#0b3b8f]", badgeTone: "bg-[#fea700]" },
  { id: "f2", name: "Utkarsh Kumar", year: 2022, company: "Byju's", packageValue: 11, packageLabel: "11 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443352/sviet_assets/stu/Utkarsh.png", imageAlt: "Utkarsh Kumar placement highlight", isShowcase: true, sortOrder: 1, cardTone: "bg-[#fea700]", badgeTone: "bg-white" },
  { id: "f3", name: "Anam Rashid", year: 2025, company: "Skillkart / Ucertify / Dentsu", packageValue: 12, packageLabel: "12 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443360/sviet_assets/stu/Anam.png", imageAlt: "Anam Rashid placement highlight", isShowcase: true, sortOrder: 2, cardTone: "bg-[#0b3b8f]", badgeTone: "bg-[#0b3b8f]" },
  { id: "f4", name: "Pallavi Sharma", year: 2021, company: "Extra Marks", packageValue: 7.2, packageLabel: "7.2 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443357/sviet_assets/stu/Pallavi.png", imageAlt: "Pallavi Sharma placement highlight", isShowcase: true, sortOrder: 3, cardTone: "bg-[#fea700]", badgeTone: "bg-[#fea700]" },
  { id: "f5", name: "Naveen Jaiswal", year: 2025, company: "Entab Infotech Pvt Ltd", packageValue: 12, packageLabel: "12 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443358/sviet_assets/stu/Naveen.png", imageAlt: "Naveen Jaiswal placement highlight", isShowcase: true, sortOrder: 4, cardTone: "bg-[#0b3b8f]", badgeTone: "bg-white" },
  { id: "f6", name: "Priyanshi Sharma", year: 2025, company: "Caelius Consulting", packageValue: 12, packageLabel: "12 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443351/sviet_assets/stu/Priyanshi.png", imageAlt: "Priyanshi Sharma placement highlight", isShowcase: true, sortOrder: 5, cardTone: "bg-[#fea700]", badgeTone: "bg-[#0b3b8f]" },
  { id: "f7", name: "Shikhsa Singh", year: 2022, company: "Byju's", packageValue: 10, packageLabel: "10 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443352/sviet_assets/stu/Shikha.png", imageAlt: "Shikhsa Singh placement highlight", isShowcase: true, sortOrder: 6, cardTone: "bg-[#0b3b8f]", badgeTone: "bg-[#fea700]" },
  { id: "f8", name: "Prateek Kumar", year: 2022, company: "Byju's", packageValue: 8.2, packageLabel: "8.2 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443357/sviet_assets/stu/Prateek.png", imageAlt: "Prateek Kumar placement highlight", isShowcase: true, sortOrder: 7, cardTone: "bg-[#fea700]", badgeTone: "bg-white" },
  { id: "f9", name: "Parvesh Sharma", year: 2022, company: "Byju's", packageValue: 10, packageLabel: "10 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443358/sviet_assets/stu/Parvesh.png", imageAlt: "Parvesh Sharma placement highlight", isShowcase: true, sortOrder: 8, cardTone: "bg-[#0b3b8f]", badgeTone: "bg-[#0b3b8f]" },
  { id: "f10", name: "Fahad Shabir", year: 2026, company: "IQOL Technologies", packageValue: 9.1, packageLabel: "9.10 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443547/sviet_assets/students_placement/recent/Fahad%20Shabir.png", imageAlt: "Fahad Shabir placement highlight", isShowcase: true, sortOrder: 9, cardTone: "bg-[#fea700]", badgeTone: "bg-[#fea700]" },
  { id: "f11", name: "Prashant Kumar", year: 2026, company: "Hidani Tech", packageValue: 10, packageLabel: "10 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443547/sviet_assets/students_placement/recent/Prashant%20Kumar.png", imageAlt: "Prashant Kumar placement highlight", isShowcase: true, sortOrder: 10, cardTone: "bg-[#0b3b8f]", badgeTone: "bg-white" },
  { id: "f12", name: "Priyanshu Kumar", year: 2026, company: "IntelleWings", packageValue: 9, packageLabel: "9 LPA", imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443545/sviet_assets/students_placement/recent/Priyanshu%20Kumar.png", imageAlt: "Priyanshu Kumar placement highlight", isShowcase: true, sortOrder: 11, cardTone: "bg-[#fea700]", badgeTone: "bg-[#0b3b8f]" },
];

const FALLBACK_FEATURED: PlacementRecordRow[] = [
  { id: "fp1", name: "Taniya Singh", year: 2027, company: "Caelius Consulting", packageValue: 12, packageLabel: "12 LPA", imageSrc: null, imageAlt: null, isShowcase: true, sortOrder: 0 },
  { id: "fp2", name: "Kshitij Raj", year: 2027, company: "Caelius Consulting", packageValue: 12, packageLabel: "12 LPA", imageSrc: null, imageAlt: null, isShowcase: false, sortOrder: 0 },
];

const FALLBACK_BANNER: PlacementHighlightBannerRow = {
  id: "fallback",
  badgeText: "Top Placement · 2026",
  studentName: "Laxmi\nVaishnavi",
  company: "Caelius Consulting",
  packageLabel: "19 LPA",
  batchYear: "2026 Batch",
  imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443073/sviet_assets/students/11.png",
  imageAlt: "Laxmi and Vaishnavi — 19 LPA placement at Caelius Consulting",
};

const FALLBACK_KEY_STATS: PlacementKeyStatRow[] = [
  { id: "s1", value: "60 LPA", label: "Highest Package" },
  { id: "s2", value: "2,200+", label: "Recruiting Companies" },
];

const FALLBACK_TRENDS: PlacementTrendYearRow[] = [
  { year: "2022", companiesVisited: 260, highestPackageLpa: 19, averagePackageLpa: 3.6 },
  { year: "2023", companiesVisited: 285, highestPackageLpa: 28, averagePackageLpa: 3.5 },
  { year: "2024", companiesVisited: 315, highestPackageLpa: 45, averagePackageLpa: 4.8 },
  { year: "2025", companiesVisited: 320, highestPackageLpa: 50, averagePackageLpa: 5.5 },
  { year: "2026", companiesVisited: 350, highestPackageLpa: 60, averagePackageLpa: 5.8 },
];

// ─── helpers ─────────────────────────────────────────────────────────────────

function toCardTone(index: number): string {
  return index % 2 === 0 ? "bg-[#0b3b8f]" : "bg-[#fea700]";
}

function toBadgeTone(index: number): string {
  const cycle = index % 3;
  if (cycle === 0) return "bg-[#fea700]";
  if (cycle === 1) return "bg-white";
  return "bg-[#0b3b8f]";
}

// ─── public read functions ────────────────────────────────────────────────────

export async function getPlacementRecords(): Promise<PlacementRecordRow[]> {
  try {
    const rows = await prisma.placementRecord.findMany({
      where: { isActive: true },
      orderBy: [{ year: "desc" }, { packageValue: "desc" }],
      select: {
        id: true,
        name: true,
        year: true,
        company: true,
        packageValue: true,
        packageLabel: true,
        imageSrc: true,
        imageAlt: true,
        isShowcase: true,
        sortOrder: true,
      },
    });
    return rows;
  } catch {
    return [];
  }
}

export async function getShowcaseCards(): Promise<ShowcaseCard[]> {
  try {
    const rows = await prisma.placementRecord.findMany({
      where: { isActive: true, isShowcase: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        year: true,
        company: true,
        packageValue: true,
        packageLabel: true,
        imageSrc: true,
        imageAlt: true,
        isShowcase: true,
        sortOrder: true,
      },
    });

    return rows.map((row, index) => ({
      ...row,
      imageAlt: row.imageAlt ?? `${row.name} placement highlight`,
      cardTone: toCardTone(index),
      badgeTone: toBadgeTone(index),
    }));
  } catch {
    return FALLBACK_SHOWCASE_CARDS;
  }
}

export async function getFeaturedPlacements(
  limit = 2,
): Promise<PlacementRecordRow[]> {
  try {
    return await prisma.placementRecord.findMany({
      where: { isActive: true },
      orderBy: [{ packageValue: "desc" }, { year: "desc" }],
      take: limit,
      select: {
        id: true,
        name: true,
        year: true,
        company: true,
        packageValue: true,
        packageLabel: true,
        imageSrc: true,
        imageAlt: true,
        isShowcase: true,
        sortOrder: true,
      },
    });
  } catch {
    return FALLBACK_FEATURED.slice(0, limit);
  }
}

export async function getOverallAveragePackage(): Promise<number> {
  try {
    const result = await prisma.placementRecord.aggregate({
      where: { isActive: true },
      _avg: { packageValue: true },
    });
    return Number((result._avg.packageValue ?? 5.8).toFixed(1));
  } catch {
    return 5.8;
  }
}

export async function getPlacementTrends(): Promise<PlacementTrendYearRow[]> {
  try {
    const rows = await prisma.placementTrendYear.findMany({
      orderBy: { year: "asc" },
      select: {
        year: true,
        companiesVisited: true,
        highestPackageLpa: true,
        averagePackageLpa: true,
      },
    });
    if (rows.length === 0) return FALLBACK_TRENDS;
    return rows;
  } catch {
    return FALLBACK_TRENDS;
  }
}

export async function getHighlightBanner(): Promise<PlacementHighlightBannerRow> {
  try {
    const row = await prisma.placementHighlightBanner.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    if (!row) return FALLBACK_BANNER;
    return {
      id: row.id,
      badgeText: row.badgeText,
      studentName: row.studentName,
      company: row.company,
      packageLabel: row.packageLabel,
      batchYear: row.batchYear,
      imageSrc: row.imageSrc,
      imageAlt: row.imageAlt,
    };
  } catch {
    return FALLBACK_BANNER;
  }
}

export async function getPlacementKeyStats(): Promise<PlacementKeyStatRow[]> {
  try {
    const rows = await prisma.placementKeyStat.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, value: true, label: true },
    });
    if (rows.length === 0) return FALLBACK_KEY_STATS;
    return rows;
  } catch {
    return FALLBACK_KEY_STATS;
  }
}
