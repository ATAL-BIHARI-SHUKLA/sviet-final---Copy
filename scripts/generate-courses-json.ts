import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";

import {
  COURSE_CATALOG,
  inferSpecialization,
  toSlug,
} from "../lib/course-catalog";

const outputPath = resolve(process.cwd(), "data", "courses.json");
const sourcePath = resolve(process.cwd(), "data", "data", "data.js");
const publicAssetPrefix = "/assets/programs/";

const departments = new Map<string, { name: string; slug: string }>();

function normalizeComparableTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/&/g, " and ")
    .replace(/\b(bachelor|master|masters)\b/g, (match) => {
      if (match.startsWith("b")) {
        return "b";
      }
      return "m";
    })
    .replace(/\bb\. ?tech\b/g, "btech")
    .replace(/\bm\. ?tech\b/g, "mtech")
    .replace(/\bb\. ?sc\b/g, "bsc")
    .replace(/\bm\. ?sc\b/g, "msc")
    .replace(/\bb\. ?voc\b/g, "bvoc")
    .replace(/\bb\. ?a\.?\b/g, "ba")
    .replace(/\bm\. ?a\.?\b/g, "ma")
    .replace(/\bm\. ?pharm\.?d\b/g, "pharmd")
    .replace(/\bm\. ?pharmacy\b/g, "mpharmacy")
    .replace(/\bb\. ?pharmacy\b/g, "bpharmacy")
    .replace(/\bpost graduate diploma\b/g, "pgd")
    .replace(/\bdiploma in\b/g, "diploma")
    .replace(/\blaboratory\b/g, "lab")
    .replace(/\btheatre\b/g, "theater")
    .replace(/\beducation\b/g, "education")
    .replace(/\bof\b|\bin\b|\band\b|\bprogram\b|\bcourse\b|\bthe\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function parseDurationMonths(value: string | undefined) {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase();
  const yearsMatch = normalized.match(/([\d.]+)\s*years?/);
  const monthsMatch = normalized.match(/([\d.]+)\s*months?/);

  if (yearsMatch) {
    return Math.round(Number(yearsMatch[1]) * 12);
  }

  if (monthsMatch) {
    return Math.round(Number(monthsMatch[1]));
  }

  return null;
}

function parseFeesToCents(value: string | undefined) {
  if (!value) {
    return null;
  }

  const clean = value.replace(/[^\d.]/g, "");
  if (!clean) {
    return null;
  }

  const amount = Number(clean);
  if (Number.isNaN(amount)) {
    return null;
  }

  return Math.round(amount * 100);
}

function loadSourceCatalog() {
  const source = readFileSync(sourcePath, "utf8")
    .replace(/export default data;\s*$/, "")
    .replace(/^const data\s*=\s*/, "module.exports = ");

  const sandbox = { module: { exports: {} }, exports: {} } as const;
  vm.runInNewContext(source, sandbox, { timeout: 1000 });

  return (sandbox.module.exports as unknown[]).map(
    (entry) => entry as Record<string, unknown>,
  );
}

const SOURCE_CATALOG = loadSourceCatalog();

const SOURCE_ALIAS_MAP: Record<string, string> = {
  "Pharma.D": "Pharm.D",
  "Bachelor of Pharmacy": "Bachelor of Pharmacy (B.Pharm)",
  "Master of Pharmacy (Pharmaceutics)": "Master of Pharmacy (M.Pharm)",
  "Master of Pharmacy (Pharmacology)": "Master of Pharmacy (M.Pharm)",
  "Bachelor of Computer Applications": "Bachelor of Computer Applications",
  "Master of Computer Applications": "Master of Computer Applications",
  "Post Graduate Diploma in Computer Application": "PGDCA",
  "Bachelor of Hotel Management & Catering Technology":
    "Bachelor of Hotel Management and Catering Technology (BHMCT)",
  "Master of Hotel Management & Catering Technology":
    "Master of Hotel Management & Catering Technology (MHMCT)",
  "B.Voc (Hospitality & Catering Management)":
    "B.Voc in Hospitality and Catering Management",
  "B.Sc Honors in Nutrition and Dietetics": "B.Sc in Nutrition and Dietetics",
  "B.Sc Medical Lab Sciences": "B.Sc. in Medical Laboratory Science",
  "B.Sc Radiology & Imaging Technology": "B.Sc. in Radio Imaging Technology",
  "B.Sc (Operation Theater Technology)":
    "B.Sc. in Operation Theatre Technology",
  "B.Sc Cardiac Care Technology": "B.Sc. in Cardiac Care Technology",
  "B.Sc (Hons.) Operation Theatre Technology":
    "B.Sc. in Operation Theatre Technology",
  "B.Sc (Hons.) Anesthesia Technology": "B.Sc. in Anesthesia",
  "B.Sc (Hons.) Optometry": "B.Sc. in Optometry",
  "M.Sc Medical Lab Science (Clinical Biochemistry)":
    "M.Sc in Medical Laboratory Science - Clinical Biochemistry",
  "M.Sc Anesthesia & Operation Theater Technology":
    "M.Sc in Anesthesia and Operation Theatre Technology",
  "Bachelor of Physiotherapy": "B.Sc. in Physiotherapy",
  "M.Sc Cardiac Care Technology": "M.Sc. in Cardiac Care Technology",
  "M.Sc (Medical Microbiology)":
    "M.Sc in Medical Laboratory Science - Medical Microbiology",
  "M.Sc (Radiology and Imaging Technology)":
    "M.Sc. in Radio Imaging Technology",
  "Diploma In Nursing Assistant": "Diploma in Nursing",
  "M.Sc Math": "M.Sc. in Mathematics",
  "Bachelor in Education": "Bachelor of Education (B.Ed)",
  "M.A Education": "Master of Arts in Education",
  "Masters in Education": "Master of Education (M.Ed.)",
  "Bachelor of Arts": "Bachelor of Arts (B.A.)",
  "B.A. (Journalism and Mass Communication)":
    "B.Sc Mass Communication & Journalism",
  LLB: "Bachelor of Law",
  "B.A. L.L.B": "Bachelor of Arts + Bachelor of Law",
  "Welder(G&E)": "Welder Certification Program",
  Plumber: "Plumbing Certification Program",
  COPA: "Computer Operator and Programming Assistant",
};

const sourceLookupByComparableTitle = new Map<
  string,
  Record<string, unknown>
>();

for (const entry of SOURCE_CATALOG) {
  const title = String(
    entry.program_name ?? entry.title ?? entry.course_name ?? "",
  );
  if (title) {
    sourceLookupByComparableTitle.set(normalizeComparableTitle(title), entry);
  }
}

function resolveSourceEntry(title: string) {
  const alias = SOURCE_ALIAS_MAP[title];
  if (alias) {
    const directMatch = SOURCE_CATALOG.find(
      (entry) =>
        String(entry.program_name ?? entry.title ?? entry.course_name ?? "") ===
        alias,
    );
    if (directMatch) {
      return directMatch;
    }
  }

  const comparable = normalizeComparableTitle(title);
  return sourceLookupByComparableTitle.get(comparable) ?? null;
}

function stringifyMaybe(value: unknown) {
  return typeof value === "string" ? value : null;
}

function normalizeAssetPath(value: unknown): unknown {
  if (typeof value !== "string") {
    return value;
  }

  const normalized = value.replace(/^\.\.?\/Courses\//, publicAssetPrefix);
  return normalized.replace(/^\.\/?/, "/");
}

function normalizeAssetTree<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeAssetTree(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nested]) => [
        key,
        normalizeAssetTree(nested),
      ]),
    ) as T;
  }

  return normalizeAssetPath(value) as T;
}

function normalizeFields(course: {
  title: string;
  department: string;
  level: string;
  durationMonths: number;
  isFeatured?: boolean;
}) {
  const department = departments.get(course.department) ?? {
    name: course.department,
    slug: toSlug(course.department),
  };

  departments.set(course.department, department);

  const source = resolveSourceEntry(course.title);
  const sourceHeader =
    (source?.header as Record<string, unknown> | undefined) ?? null;
  const sourceEligibility =
    (source?.eligibility_criteria as Record<string, unknown> | undefined) ??
    null;
  const sourceAffiliation =
    (source?.affiliation as Record<string, unknown> | undefined) ?? null;

  const sourceProgramDescription = stringifyMaybe(source?.program_description);
  const sourceProgramHighlights = Array.isArray(source?.program_highlights)
    ? source.program_highlights
    : null;
  const sourceProgramOutcomes = Array.isArray(source?.program_outcomes)
    ? source.program_outcomes
    : null;
  const sourceLabs = Array.isArray(source?.labs) ? source.labs : null;
  const sourceMajorTracks = Array.isArray(source?.major_tracks)
    ? source.major_tracks
    : null;

  const specializations = inferSpecialization(course.title);

  return {
    slug: toSlug(course.title),
    title: course.title,
    department,
    level: course.level,
    specializations: specializations
      ? [
          {
            name: specializations,
            slug: toSlug(specializations),
          },
        ]
      : [],
    shortDescription: stringifyMaybe(sourceHeader?.subtitle),
    fullDescription: sourceProgramDescription,
    durationMonths: source
      ? (parseDurationMonths(stringifyMaybe(source.duration) ?? undefined) ??
        course.durationMonths)
      : course.durationMonths,
    tuitionCents: source
      ? parseFeesToCents(stringifyMaybe(source.fees) ?? undefined)
      : null,
    mode: stringifyMaybe(source?.mode_of_admission) ? null : null,
    eligibility: stringifyMaybe(sourceEligibility?.eligibility),
    highlights: normalizeAssetTree(sourceProgramHighlights),
    outcomes: normalizeAssetTree(sourceProgramOutcomes),
    facilities: normalizeAssetTree(sourceLabs),
    curriculum: null,
    faqs: null,
    seoTitle: stringifyMaybe(source?.program_name) ?? course.title,
    seoDescription:
      sourceProgramDescription ?? stringifyMaybe(sourceHeader?.subtitle),
    metadata: {
      sourceTitle: stringifyMaybe(
        source?.program_name ?? source?.title ?? source?.course_name,
      ),
      courseName: stringifyMaybe(source?.course_name),
      eventType: stringifyMaybe(source?.event_type),
      header: normalizeAssetTree(sourceHeader),
      affiliation: normalizeAssetTree(sourceAffiliation),
      modeOfAdmission: stringifyMaybe(source?.mode_of_admission),
      majorTracks: normalizeAssetTree(sourceMajorTracks),
      durationLabel: stringifyMaybe(source?.duration),
      feeLabel: stringifyMaybe(source?.fees),
      eligibilityCriteria: normalizeAssetTree(sourceEligibility),
      programHighlights: normalizeAssetTree(sourceProgramHighlights),
      programOutcomes: normalizeAssetTree(sourceProgramOutcomes),
      labs: normalizeAssetTree(sourceLabs),
    },
    isFeatured: course.isFeatured ?? false,
  };
}

const courses = COURSE_CATALOG.map(normalizeFields);

writeFileSync(outputPath, `${JSON.stringify(courses, null, 2)}\n`, "utf8");

console.log(`Wrote ${courses.length} normalized courses to ${outputPath}`);
