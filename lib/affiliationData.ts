// Source of truth for program and college affiliations.
// Program affiliations are keyed by DB slug (matches program.slug in program-page.tsx).
// College affiliations are keyed by the institution's full name (matches INSTITUTION_DEFINITIONS[].name).

export const PROGRAM_AFFILIATIONS_BY_SLUG: Record<string, string[]> = {
  // ── Pharmacy ────────────────────────────────────────────────────────────────
  bpharmacy: ["IKGPTU", "MRSPTU"],
  pharmad: ["IKGPTU"],
  "mpharmacy-pharmaceutics": ["IKGPTU"],
  "mpharmacy-pharmacology": ["IKGPTU"],
  "diploma-in-pharmacy": ["PSBTE & IT"],

  // ── Engineering & Technology (SVIET) ────────────────────────────────────────
  "diploma-in-mechanical-engineering": ["PSBTE & IT"],
  "diploma-in-civil-engineering": ["PSBTE & IT"],
  "btech-civil-engineering": ["IKGPTU"],
  "btech-computer-science-engineering": ["IKGPTU"],
  "btech-electrical-engineering": ["IKGPTU"],
  "btech-electronics-communication-engineering": ["IKGPTU"],
  "btech-mechanical-engineering": ["IKGPTU"],
  "btech-artificial-intelligence": ["IKGPTU"],
  "mtech-computer-science-engineering": ["IKGPTU"],
  "mtech-mechanical-engineering": ["IKGPTU"],
  "mtech-electronics-communication-engineering": ["IKGPTU"],
  "mtech-civil-engineering": ["IKGPTU"],
  "master-of-computer-applications": ["IKGPTU"],
  "master-of-business-administration": ["IKGPTU"],

  // ── Management & Allied Health (SVFTM / SVCMT / SVFITBM) ───────────────────
  "bachelor-of-business-administration": ["IKGPTU", "MRSPTU", "PUNJABI UNIVERSITY"],
  "bachelor-of-computer-applications": ["IKGPTU", "MRSPTU", "PUNJABI UNIVERSITY"],
  "bachelor-of-hotel-management-catering-technology": ["IKGPTU"],
  "master-of-hotel-management-catering-technology": ["IKGPTU"],
  "bvoc-hotel-management-catering": ["IKGPTU"],
  "post-graduate-diploma-in-computer-application": ["IKGPTU"],
  "msc-physics": ["IKGPTU"],
  "msc-math": ["IKGPTU"],
  "master-of-commerce": ["IKGPTU"],
  "msc-medical-microbiology": ["IKGPTU"],
  "msc-radiology-and-imaging-technology": ["IKGPTU"],
  "bsc-honors-in-nutrition-and-dietetics": ["IKGPTU"],

  // ── Health Sciences (dual-university programs per affiliation table) ─────────
  "bsc-medical-lab-sciences": ["IKGPTU", "MRSPTU"],
  "bsc-radiology-imaging-technology": ["IKGPTU", "MRSPTU"],
  "bsc-hons-operation-theatre-technology": ["IKGPTU", "MRSPTU"],
  "bsc-cardiac-care-technology": ["IKGPTU"],
  "bachelor-in-hospital-administration": ["IKGPTU"],

  // ── Health Sciences (SVCMT — MRSPTU) ───────────────────────────────────────
  "msc-chemistry": ["MRSPTU"],
  "bsc-hons-radiology-imaging-technology": ["MRSPTU"],
  "bsc-hons-anesthesia-technology": ["MRSPTU"],
  "bsc-hons-medical-lab-science": ["MRSPTU"],
  "bsc-hons-optometry": ["MRSPTU"],
  "msc-medical-lab-science-clinical-biochemistry": ["MRSPTU"],
  "msc-anesthesia-operation-theater-technology": ["MRSPTU"],
  "bachelor-of-physiotherapy": ["MRSPTU"],
  "diploma-in-nursing-assistant": ["MRSPTU"],
  "msc-cardiac-care-technology": ["MRSPTU"],
  "bsc-information-technology": ["MRSPTU"],

  // ── ITI ─────────────────────────────────────────────────────────────────────
  "iti-welder": ["NCVT"],
  "iti-plumber": ["NCVT"],
  "iti-copa": ["NCVT"],
  welderge: ["NCVT"],
  plumber: ["NCVT"],
  copa: ["NCVT"],

  // ── Polytechnic ─────────────────────────────────────────────────────────────
  "diploma-in-electrical-engineering": ["PSBTE & IT"],
  "diploma-computer-science-engineering": ["PSBTE & IT"],
  "diploma-in-medical-lab-technology": ["PSBTE & IT"],

  // ── Education ───────────────────────────────────────────────────────────────
  "bachelor-in-education": ["PUNJABI UNIVERSITY"],
  "ma-education": ["PUNJABI UNIVERSITY"],
  "masters-in-education": ["PUNJABI UNIVERSITY"],

  // ── Arts & Commerce (SVFITBM) ───────────────────────────────────────────────
  "bachelor-of-arts": ["PUNJABI UNIVERSITY"],
  "bachelor-of-commerce": ["PUNJABI UNIVERSITY"],
  "bsc-non-medical": ["PUNJABI UNIVERSITY"],
  "ba-journalism-and-mass-communication": ["IKGPTU"],
  "bachelor-of-arts-computer-science": ["MRSPTU"],

  // ── Law ─────────────────────────────────────────────────────────────────────
  llb: ["PUNJABI UNIVERSITY"],
  "b-a-l-l-b": ["PUNJABI UNIVERSITY"],
  "ba-llb": ["PUNJABI UNIVERSITY"],

  // ── SVFTM / SVCMT variants (redirect to canonical — affiliations mirror canonical) ──
  "bachelor-of-computer-applications-svftm": ["IKGPTU", "MRSPTU", "PUNJABI UNIVERSITY"],
  "bachelor-of-business-administration-svftm": ["IKGPTU", "MRSPTU", "PUNJABI UNIVERSITY"],
  "bsc-medical-lab-sciences-svftm": ["IKGPTU", "MRSPTU"],
  "bsc-operation-theatre-technology-svftm": ["IKGPTU", "MRSPTU"],
  "bsc-radiology-svftm": ["IKGPTU", "MRSPTU"],
  "bachelor-of-computer-applications-svcmt": ["IKGPTU", "MRSPTU", "PUNJABI UNIVERSITY"],
  "bachelor-of-business-administration-svcmt": ["IKGPTU", "MRSPTU", "PUNJABI UNIVERSITY"],
};

// Keyed by the institution's full name (must match INSTITUTION_DEFINITIONS[].name in about/page.tsx).
export const COLLEGE_AFFILIATIONS: Record<string, string[]> = {
  "Swami Vivekanand College of Pharmacy": ["IKGPTU", "PSBTE & IT"],
  "Swami Vivekanand Institute of Engineering & Technology": ["IKGPTU", "PSBTE & IT"],
  "Swami Vivekanand Faculty of Technology & Management": ["IKGPTU"],
  "Swami Vivekanand College of Management & Technology": ["MRSPTU"],
  "SVIET-ITI": ["NCVT"],
  "Swami Vivekanand Polytechnic College": ["PSBTE & IT"],
  "Swami Vivekanand College of Education": ["PUNJABI UNIVERSITY"],
  "Swami Vivekanand Faculty of Information Technology & Business Management": [
    "PUNJABI UNIVERSITY",
  ],
  "Swami Vivekanand College of Law": ["PUNJABI UNIVERSITY"],
  "Swami Vivekanand Institute of Pharmacy": ["MRSPTU"],
};

export function getProgramAffiliations(slug: string): string[] {
  return PROGRAM_AFFILIATIONS_BY_SLUG[slug] ?? [];
}

export function getCollegeAffiliations(collegeName: string): string[] {
  return COLLEGE_AFFILIATIONS[collegeName] ?? [];
}
