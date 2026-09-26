import fs from "fs";
import pg from "pg";
const { Client } = pg;

const env = fs.readFileSync("c:/Users/Lenovo/OneDrive/Desktop/sviet/.env", "utf8");
const dbUrl = env.match(/DATABASE_URL="?([^"\n]+)"?/)[1];

// ── New eligibility strings (use \n to separate bullet points) ────────────────

const UPDATES = {
  "llb": `Minimum percentage of marks prescribed by the Bar Council of India and the University from time to time.\nAdmission shall be subject to the rules and regulations of the Bar Council of India and the University.`,

  "ba-llb": `Candidates seeking admission to the B.A. LL.B. program must have passed the 10+2 or equivalent examination from a recognized board.\nApplicants must have secured a minimum of 45% aggregate marks in the qualifying examination for the General Category, 42% for OBC Category, and 40% for SC/ST Category candidates, or as prescribed by the Bar Council of India and the University from time to time.`,

  "bsc-honors-in-nutrition-and-dietetics": `Candidates who have completed 10+2 examination with Science (Medical or Non Medical) or its equivalent examination in any stream conducted by a recognized Board/University/Council.`,

  "bachelor-of-hotel-management-catering-technology": `To be eligible for the B.H.M.C.T program, candidates must meet the following criteria: Completion of 10+2 from a recognized board\nMinimum aggregate marks of 45%\nEnglish as a mandatory subject\nThe age limit is up to 22 years`,

  "bvoc-hotel-management-catering": `Candidates seeking admission to the B.Voc in Hospitality & Catering Management can check the eligibility criteria provided below\nThey must have completed 12th from Arts, Science or Commerce from any recognized Institution\nCandidates will also have to satisfy the minimum percentage decided by the college`,

  "diploma-in-pharmacy": `Candidate shall have passed 10+2 examination conducted by a recognized State or Central Board, or an equivalent to 10+2 examination recognized by the Association of Indian Universities (AIU), with English as one of the subjects and Physics, Chemistry, Mathematics (P.C.M) and or Biology (P.C.B/P.C.M.B.) as optional subjects individually\nAny other qualification approved by the Pharmacy Council of India as equivalent to any of the above examinations.`,

  "bachelor-of-computer-applications": `10+2 or equivalent examination from a recognized board with a minimum of 45% aggregate marks (40% for candidates belonging to reserved categories).`,

  "post-graduate-diploma-in-computer-application": `Graduation in any discipline from a recognized university with a minimum of 50% aggregate marks and 45% for candidates belonging to reserved categories.`,

  "master-of-commerce": `Candidates must have completed B.Com. from a recognized university with a minimum of 50% aggregate marks and must have studied the relevant subject as one of the subjects in the qualifying examination.\nAdmission shall be based on merit in the qualifying examination.`,

  "masters-of-commerce": `Candidates must have completed B.Com. from a recognized university with a minimum of 50% aggregate marks and must have studied the relevant subject as one of the subjects in the qualifying examination.\nAdmission shall be based on merit in the qualifying examination.`,

  "bpharmacy": `Candidate shall have passed 10+2 examination conducted by a recognized State or Central Board, or an equivalent to 10+2 examination recognized by the Association of Indian Universities (AIU), with English as one of the subjects and Physics, Chemistry, Mathematics (P.C.M) and or Biology (P.C.B/P.C.M.B.) as optional subjects individually\nAny other qualification approved by the Pharmacy Council of India as equivalent to any of the above examinations.`,

  "pharmad": `Candidates must have passed the 10+2 examination from a board recognized or established by the Central or State Government through legislation, with Physics and Chemistry as compulsory subjects along with Mathematics or Biology.\nCandidates who have passed the D.Pharm. course from an institution approved by the Pharmacy Council of India (PCI) under Section 12 of the Pharmacy Act are also eligible.`,

  "mtech-computer-science-engineering": `Candidates must have a B.Tech / B.E. or equivalent degree in the relevant discipline from a recognized university with a minimum aggregate as prescribed by the institution (50% for General category and 45% for reserved categories, or as per applicable norms).\nAdmission may be based on merit and/or valid GATE score, as per university regulations.`,

  "mtech-mechanical-engineering": `Candidates must have a B.Tech / B.E. or equivalent degree in the relevant discipline from a recognized university with a minimum aggregate as prescribed by the institution (50% for General category and 45% for reserved categories, or as per applicable norms).\nAdmission may be based on merit and/or valid GATE score, as per university regulations.`,

  "mtech-electronics-communication-engineering": `Candidates must have a B.Tech / B.E. or equivalent degree in the relevant discipline from a recognized university with a minimum aggregate as prescribed by the institution (50% for General category and 45% for reserved categories, or as per applicable norms).\nAdmission may be based on merit and/or valid GATE score, as per university regulations.`,

  "mtech-civil-engineering": `Candidates must have a B.Tech / B.E. or equivalent degree in the relevant discipline from a recognized university with a minimum aggregate as prescribed by the institution (50% for General category and 45% for reserved categories, or as per applicable norms).\nAdmission may be based on merit and/or valid GATE score, as per university regulations.`,

  "bsc-hons-operation-theatre-technology": `Candidates must have passed Senior Secondary (10+2) examination in Science stream with Physics and Chemistry as compulsory subjects.\nCandidates must have secured a minimum of 50% aggregate marks (45% for candidates belonging to reserved categories) in the qualifying examination. OR Candidates must possess a Diploma in the relevant field from a recognized institution.`,

  "bsc-hons-optometry": `Candidates must have passed Senior Secondary (10+2) examination in Science stream with Physics and Chemistry as compulsory subjects.\nCandidates must have secured a minimum of 50% aggregate marks (45% for candidates belonging to reserved categories) in the qualifying examination. OR Candidates must possess a Diploma in the relevant field from a recognized institution.`,

  "bsc-cardiac-care-technology": `Candidates must have passed Senior Secondary (10+2) examination in Science stream with Physics and Chemistry as compulsory subjects.\nCandidates must have secured a minimum of 50% aggregate marks (45% for candidates belonging to reserved categories) in the qualifying examination. OR Candidates must possess a Diploma in the relevant field from a recognized institution.`,

  "bsc-hons-radio-medical-imaging-technology": `Candidates must have passed Senior Secondary (10+2) examination in Science stream with Physics and Chemistry as compulsory subjects.\nCandidates must have secured a minimum of 50% aggregate marks (45% for candidates belonging to reserved categories) in the qualifying examination. OR Candidates must possess a Diploma in the relevant field from a recognized institution.`,

  "bachelor-in-hospital-administration": `Passed 10+2 (or equivalent) from a recognized board\nScience stream preferred, Commerce/Arts students also eligible\nMinimum 45% aggregate marks\nAdmission through merit or entrance test as per IKGPTU guidelines`,

  "msc-radiology-and-imaging-technology": `Candidates must have a Bachelor's degree in B.Sc. Radiology & Imaging Technology or related disciplines such as Medical Radiology, Radiological Technology, Radiography, Life Sciences, Medical Laboratory Technology (BMLT), or Physics.\nOR\nCandidates with a Bachelor's degree in Science along with a relevant diploma in Medical Radiology & Imaging Technology and required clinical experience (as per institutional norms).`,

  "msc-anesthesia-operation-theater-technology": `Candidates must have completed B.Sc. in Anesthesia & Operation Theatre Technology.`,

  "msc-cardiac-care-technology": `Candidates must have B.Sc. in Cardiac Care Technology, B.Sc. in Cardiovascular Technology, or an allied/relevant science or biological degree.\nCandidates must have secured a minimum of 50% aggregate marks for the General category (45% for reserved categories).`,

  "msc-medical-lab-science-clinical-biochemistry": `Candidates must have completed B.Sc. in Medical Laboratory Technology.\nCandidates who have passed B.Sc. in Medical, Life Sciences & Applied Life Sciences, Medicine, or Zoology can also apply.`,

  "bsc-non-medical": `Candidates must have passed 10+2 from a recognized board in Non-Medical stream with Physics, Chemistry, and Mathematics, securing a minimum of 45% aggregate marks. OR Candidates from the Medical stream with Mathematics as one of the subjects are also eligible, with at least 45% aggregate marks.\nFor reserved category candidates, a minimum of 40% aggregate marks is required in the qualifying examination.`,

  "msc-physics": `Candidates must have passed B.Sc with Physics & Mathematics as compulsory subjects.\nCandidates must have secured at least 50% marks in aggregate in the qualifying examination.`,

  "bachelor-of-arts": `Passed the 10+2 examination from the Punjab School Education Board (PSEB) or any other equivalent recognized board\nMinimum aggregate of 33% to 50% marks depending on the specific subject choices and reserved category status`,

  "bsc-radiology-imaging-technology": `Candidates must have passed Senior Secondary (10+2) examination in Science stream with Physics and Chemistry as compulsory subjects.\nCandidates must have secured a minimum of 50% aggregate marks (45% for candidates belonging to reserved categories) in the qualifying examination.\nOR\nCandidates must possess a Diploma in the relevant field from a recognized institution.`,

  "copa": `The minimum educational qualification may vary depending on the specific ITI trade and applicable government regulations.`,

  "plumber": `The minimum educational qualification may vary depending on the specific ITI trade and applicable government regulations.`,

  "welderge": `The minimum educational qualification may vary depending on the specific ITI trade and applicable government regulations.`,
};

// ── Update data/courses.json ──────────────────────────────────────────────────

const jsonPath = "c:/Users/Lenovo/OneDrive/Desktop/sviet/data/courses.json";
const courses = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
let jsonUpdated = 0;

for (const course of courses) {
  if (UPDATES[course.slug]) {
    course.eligibility = UPDATES[course.slug];
    if (course.metadata?.eligibilityCriteria) {
      course.metadata.eligibilityCriteria.eligibility = UPDATES[course.slug];
    }
    jsonUpdated++;
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(courses, null, 2) + "\n", "utf8");
console.log(`courses.json: updated ${jsonUpdated} programs`);

// ── Update database ───────────────────────────────────────────────────────────

const client = new Client({ connectionString: dbUrl });
await client.connect();

let dbUpdated = 0;
for (const [slug, eligibility] of Object.entries(UPDATES)) {
  const res = await client.query(
    `UPDATE "Program" SET eligibility = $1 WHERE slug = $2`,
    [eligibility, slug]
  );
  if (res.rowCount > 0) {
    dbUpdated++;
    console.log(`  DB updated: ${slug}`);
  } else {
    console.log(`  DB skip (not found): ${slug}`);
  }
}

console.log(`\nDB: updated ${dbUpdated} programs`);
await client.end();
