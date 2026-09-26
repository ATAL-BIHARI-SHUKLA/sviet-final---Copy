import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const file = resolve(process.cwd(), "data", "courses.json");
const raw = readFileSync(file, "utf8");
const courses = JSON.parse(raw) as any[];

// Mapping: keyword -> eligibility text
const mapping: Array<{ key: string; text: string }> = [
  {
    key: "computer science",
    text: "Students who have completed the 12th with science (Maths as compulsory subject) with a minimum of 45% marks in case of general category.",
  },
  {
    key: "artificial intelligence",
    text: "Students who have completed the 12th with science (Maths as compulsory subject) with a minimum of 45% marks in case of general category.",
  },
  {
    key: "electronics",
    text: "Students who have completed the 12th with science (Maths as compulsory subject) with a minimum of 45% marks in case of general category.",
  },
  {
    key: "electrical",
    text: "Students who have completed the 12th with science (Maths as compulsory subject) with a minimum of 45% marks in case of general category.",
  },
  {
    key: "mechanical",
    text: "Students who have completed the 12th with science (Maths as compulsory subject) with a minimum of 45% marks in case of general category.",
  },
  {
    key: "civil",
    text: "Students who have completed the 12th with science (Maths as compulsory subject) with a minimum of 45% marks in case of general category.",
  },
  {
    key: "m.tech in computer",
    text: "All those candidates who have passed B.E. / B. Tech.(CSE / IT / Software Engineering / Computer Engineering / B. Tech in any stream as Major along with Minor Degree in CSE/ B. Tech. / B.E. in circuit branches (ECE, EE etc.) with two years’ experience in IT industry a minimum of 50% marks in case of general category.",
  },
  {
    key: "m.tech in electronics",
    text: "All those candidates who have passed B.E. / B. Tech. in Electronics & Communication / Electronics & Instrumentation / Applied Electronics / Instrumentation & Control / Electrical & Electronics Engineering / M. Sc. in Physics (with specialization in Electronics) and must obtained at least 50% marks (45% marks in case of candidate belonging to reserved category) in the qualifying examination from any University recognized by the UGC",
  },
  {
    key: "m.tech in mechanical",
    text: "All those candidates who have passed B.E. / B. Tech. in Mechanical / Industrial / Production / Manufacturing / Welding / Material Science / Metallurgy Engineering or equivalent with at least 50% marks (45% marks in case of candidate belonging to reserved category).",
  },
  {
    key: "mca",
    text: "All those candidates who have passed any graduation degree (E.g. B.E. / B. Tech. / B.Sc. / B. Com. / B.A. / B. Voc. / BCA etc) with at least 50% marks (45% marks in case of candidate belonging to reserve category) preferably with Mathematics at 10+2 / Graduation level from any University recognized by UGC.",
  },
  {
    key: "b.sc in anesthesia",
    text: "Candidate must have passed Senior Secondary (10+2) or equivalent with Physics, Chemistry and Biology (or Botany and Zoology) with 50% aggregate with English pass. Candidate has completed 17 years of age at the time of admission or will complete that age.",
  },
  {
    key: "physiotherapy",
    text: "Candidate must have passed Senior Secondary (10+2) or equivalent with Physics, Chemistry and Biology (or Botany and Zoology) with 50% aggregate with English pass. Candidate has completed 17 years of age at the time of admission or will complete that age.",
  },
  {
    key: "radiology",
    text: "Candidate must have passed Senior Secondary (10+2) in Science with Physics, Chemistry and Biology subjects. 50% marks in aggregate (45% marks in case of candidate belonging to reserved Undergraduate Allied and Healthcare Course) or Diploma in Relevant field.",
  },
  {
    key: "operation theatre",
    text: "Candidate must have passed Senior Secondary (10+2) in Science with Physics, Chemistry as compulsory subjects. 50% marks in aggregate (45% marks in case of candidate belonging to reserved Undergraduate Allied and Healthcare Course) or Diploma in Relevant field.",
  },
  {
    key: "medical laboratory",
    text: "Candidate must have passed Senior Secondary (10+2) in Science with Physics, Chemistry as compulsory subjects. 50% marks in aggregate (45% marks in case of candidate belonging to reserved Undergraduate Allied and Healthcare Course) or Diploma in Relevant field.",
  },
  {
    key: "optometry",
    text: "Candidate must have passed Senior Secondary (10+2) in Science with Physics, Chemistry as compulsory subjects. 50% marks in aggregate (45% marks in case of candidate belonging to reserved Undergraduate Allied and Healthcare Course) or Diploma in Relevant field.",
  },
  {
    key: "cardiac care",
    text: "Candidate must have passed Senior Secondary (10+2) in Science with Physics, Chemistry and Biology subjects. 50% marks in aggregate (45% marks in case of candidate belonging to reserved Undergraduate Allied and Healthcare Course) or Diploma in Relevant field.",
  },
  {
    key: "m.sc in anesthesia",
    text: "Candidates who have passed B.Sc. (Radio Medical Imaging Technology) / B.Sc. (Medical laboratory Sciences/Technology) / B. Sc. Anesthesia & Operation Theater Technology/ B. Sc. Anesthesia Technology/ B. Sc.(Medical)/ B. Sc. (Life Sciences & Applied Life Sciences)/ B. Sc. (Medicine)/ B.Sc. (Zoology) or equivalent undergraduate degree in medical/paramedical/allied sciences examination.",
  },
  {
    key: "m.sc in medical microbiology",
    text: "All those candidates who have passed B.Sc. in Medical Stream / B.Sc. (Hons) in Microbiology / B.Sc. (MLT / MLS) with at least 50 % marks in aggregate (45% marks in case of candidate belonging to reserve category) from any University recognised by UGC.",
  },
  {
    key: "m.sc in radio imaging",
    text: "All those candidates who have passed B.Sc. (Radiology and Imaging Technology / Radio Diagnosis and Imaging / Radiological Technology / Radiography / Medical Technology (X-Ray) / Radiology and Imaging Technology) with at least 50 % marks in aggregate (45% marks in case of candidate belonging to reserve category) from any University recognised by UGC.",
  },
  {
    key: "m.sc in cardiac care",
    text: "Applicants should have passed a bachelor’s degree in sciences/ B.Sc in Cardiovascular Technology (3 yrs.)/ B.Sc. Degree + 2 years PG diploma in ECG/ bachelor’s degree a recognized university with minimum marks of 50% in aggregate.",
  },
  {
    key: "bachelor of commerce",
    text: "Same as previous website (use institutional published eligibility).",
  },
];

let updated = 0;
for (const m of mapping) {
  const key = m.key.toLowerCase();
  for (const c of courses) {
    const title = String(c.title || "").toLowerCase();
    const slug = String(c.slug || "").toLowerCase();
    if (title.includes(key) || slug.includes(key)) {
      if (c.eligibility !== m.text) {
        c.eligibility = m.text;
        updated++;
      }
    }
  }
}

writeFileSync(file, JSON.stringify(courses, null, 2) + "\n", "utf8");
console.log(`Updated ${updated} courses in ${file}`);
