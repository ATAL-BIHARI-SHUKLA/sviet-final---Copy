import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

async function main() {
  const dataJsPath = resolve(process.cwd(), "data", "data", "data.js");
  const coursesPath = resolve(process.cwd(), "data", "courses.json");

  const fileUrl = pathToFileURL(dataJsPath).href;
  const mod = await import(fileUrl);
  const source = mod.default as any[];

  const raw = readFileSync(coursesPath, "utf8");
  const courses = JSON.parse(raw) as any[];

  const targets = [
    "bpharmacy",
    "mpharmacy-pharmaceutics",
    "mpharmacy-pharmacology",
    "master-of-computer-applications",
    "bachelor-of-computer-applications",
    "bsc-hons-anesthesia-technology",
    "bachelor-in-hospital-administration",
  ];

  let updated = 0;

  function findSource(matchers: (item: any) => boolean) {
    return source.find(matchers) as any | undefined;
  }

  for (const slug of targets) {
    const course = courses.find((c) => c.slug === slug);
    if (!course) continue;

    let src: any | undefined;

    if (slug === "bpharmacy") {
      src = findSource((s) =>
        /Bachelor of Pharmacy/i.test(s.program_name || s.header?.title || ""),
      );
    } else if (slug.startsWith("mpharmacy")) {
      src = findSource((s) =>
        /Master of Pharmacy/i.test(s.program_name || s.header?.title || ""),
      );
    } else if (slug === "master-of-computer-applications") {
      src = findSource((s) =>
        /Master of Computer Application|MCA/i.test(
          s.program_name || s.header?.title || "",
        ),
      );
    } else if (slug === "bachelor-of-computer-applications") {
      src = findSource((s) =>
        /Bachelor of Computer Application|BCA/i.test(
          s.program_name || s.header?.title || "",
        ),
      );
    } else if (slug === "bsc-hons-anesthesia-technology") {
      src = findSource((s) =>
        /Anesthesia|Anasthesia/i.test(
          s.program_name || s.header?.title || s.title || "",
        ),
      );
    } else if (slug === "bachelor-in-hospital-administration") {
      // try to find any hospital administration like objects
      src = findSource((s) =>
        /Hospital Administration|Hospital Management|Hospital/i.test(
          s.program_name || s.header?.title || "",
        ),
      );
    }

    if (!src) {
      console.warn("No source found for", slug);
      continue;
    }

    // Map fields
    const progDesc =
      src.program_description ||
      src.programDescription ||
      src.description ||
      "";
    const elig =
      src.eligibility_criteria?.eligibility ||
      src.eligibility ||
      (src.eligibility_criteria && src.eligibility_criteria.eligiblity) ||
      "";
    const highlights =
      src.program_highlights || src.highlights || src.program_highlights || [];
    const outcomes = (src.program_outcomes || src.program_outcomes || []).map(
      (o: any) => ({
        title: o.title || o.program_outcome || "",
        description: o.desc || o.description || "",
        image: o.image || "",
      }),
    );
    const labs = (src.labs || []).map((l: any) => ({
      title: l.title,
      description: l.description,
      image: l.image,
    }));

    let changed = false;
    if (progDesc && course.fullDescription !== progDesc) {
      course.fullDescription = progDesc;
      // also ensure a shortDescription exists
      if (!course.shortDescription)
        course.shortDescription = progDesc.split("\n")[0].slice(0, 280);
      changed = true;
    }
    if (elig && course.eligibility !== elig) {
      course.eligibility = elig;
      changed = true;
    }
    if (
      highlights &&
      highlights.length &&
      (!course.highlights || course.highlights.length === 0)
    ) {
      course.highlights = highlights.map((h: string) => ({
        title: h,
        description: "",
      }));
      changed = true;
    }
    if (
      outcomes &&
      outcomes.length &&
      (!course.outcomes || course.outcomes.length === 0)
    ) {
      course.outcomes = outcomes;
      changed = true;
    }
    if (
      labs &&
      labs.length &&
      (!course.facilities || course.facilities.length === 0)
    ) {
      course.facilities = labs;
      changed = true;
    }

    if (changed) {
      updated++;
      console.log("Updated", slug);
    } else {
      console.log("No changes for", slug);
    }
  }

  writeFileSync(coursesPath, JSON.stringify(courses, null, 2) + "\n", "utf8");
  console.log("Done. Updated", updated, "courses in", coursesPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
