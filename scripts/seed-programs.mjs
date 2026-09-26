import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ── Cleaned, deduplicated program list ────────────────────────────────────────
const PROGRAMS = [
  // ── Pharmacy ──────────────────────────────────────────────────────────────
  { title: "B.Pharmacy",                                     department: "Pharmacy",                       durationMonths: 48,  mode: "Full-time" },
  { title: "Pharma.D",                                       department: "Pharmacy",                       durationMonths: 72,  mode: "Full-time" },
  { title: "M.Pharmaceutics",                                department: "Pharmacy",                       durationMonths: 24,  mode: "Full-time" },
  { title: "M.Pharmacology",                                 department: "Pharmacy",                       durationMonths: 24,  mode: "Full-time" },
  { title: "Diploma in Pharmacy",                            department: "Pharmacy",                       durationMonths: 24,  mode: "Full-time" },

  // ── B.Tech Engineering ────────────────────────────────────────────────────
  { title: "B.Tech Civil Engineering",                       department: "Engineering",                    durationMonths: 48,  mode: "Full-time" },
  { title: "B.Tech Computer Science Engineering",            department: "Engineering",                    durationMonths: 48,  mode: "Full-time", isFeatured: true },
  { title: "B.Tech Electrical Engineering",                  department: "Engineering",                    durationMonths: 48,  mode: "Full-time" },
  { title: "B.Tech Electronics & Communication Engineering", department: "Engineering",                    durationMonths: 48,  mode: "Full-time" },
  { title: "B.Tech Mechanical Engineering",                  department: "Engineering",                    durationMonths: 48,  mode: "Full-time" },
  { title: "B.Tech Artificial Intelligence",                 department: "Engineering",                    durationMonths: 48,  mode: "Full-time", isFeatured: true },

  // ── M.Tech Engineering ────────────────────────────────────────────────────
  { title: "M.Tech Computer Science Engineering",            department: "Engineering",                    durationMonths: 24,  mode: "Full-time" },
  { title: "M.Tech Mechanical Engineering",                  department: "Engineering",                    durationMonths: 24,  mode: "Full-time" },
  { title: "M.Tech Electronics & Communication Engineering", department: "Engineering",                    durationMonths: 24,  mode: "Full-time" },
  { title: "M.Tech Civil Engineering",                       department: "Engineering",                    durationMonths: 24,  mode: "Full-time" },

  // ── Diploma Engineering ───────────────────────────────────────────────────
  { title: "Diploma in Mechanical Engineering",              department: "Engineering",                    durationMonths: 36,  mode: "Full-time" },
  { title: "Diploma in Civil Engineering",                   department: "Engineering",                    durationMonths: 36,  mode: "Full-time" },
  { title: "Diploma in Electrical Engineering",              department: "Engineering",                    durationMonths: 36,  mode: "Full-time" },
  { title: "Diploma in Computer Science Engineering",        department: "Engineering",                    durationMonths: 36,  mode: "Full-time" },

  // ── Computer Applications ─────────────────────────────────────────────────
  { title: "Masters in Computer Applications",               department: "Computer Applications",          durationMonths: 24,  mode: "Full-time", isFeatured: true },
  { title: "Bachelor in Computer Application",               department: "Computer Applications",          durationMonths: 36,  mode: "Full-time" },
  { title: "Post Graduate Diploma in Computer Application",  department: "Computer Applications",          durationMonths: 12,  mode: "Full-time" },
  { title: "B.Sc Information Technology",                    department: "Computer Applications",          durationMonths: 36,  mode: "Full-time" },

  // ── Management ────────────────────────────────────────────────────────────
  { title: "Masters in Business Administration",             department: "Management",                     durationMonths: 24,  mode: "Full-time", isFeatured: true },
  { title: "Bachelor in Business Administration",            department: "Management",                     durationMonths: 36,  mode: "Full-time" },
  { title: "Bachelor of Hotel Management & Catering Technology", department: "Management",                durationMonths: 36,  mode: "Full-time" },
  { title: "Master of Hotel Management & Catering Technology",   department: "Management",                durationMonths: 24,  mode: "Full-time" },
  { title: "B.Voc (Hotel Management & Catering)",            department: "Management",                     durationMonths: 36,  mode: "Full-time" },
  { title: "Masters of Commerce",                            department: "Management",                     durationMonths: 24,  mode: "Full-time" },

  // ── Medical Sciences & Allied Health ──────────────────────────────────────
  { title: "B.Sc Medical Lab Sciences",                      department: "Medical Sciences & Allied Health", durationMonths: 36, mode: "Full-time" },
  { title: "B.Sc Radiology & Imaging Technology",            department: "Medical Sciences & Allied Health", durationMonths: 36, mode: "Full-time" },
  { title: "B.Sc Operation Theater Technology",              department: "Medical Sciences & Allied Health", durationMonths: 36, mode: "Full-time" },
  { title: "B.Sc Cardiac Care Technology",                   department: "Medical Sciences & Allied Health", durationMonths: 36, mode: "Full-time" },
  { title: "B.Sc (Hons.) Radio Medical Imaging Technology",  department: "Medical Sciences & Allied Health", durationMonths: 36, mode: "Full-time" },
  { title: "B.Sc (Hons.) Operation Theater Technology",      department: "Medical Sciences & Allied Health", durationMonths: 36, mode: "Full-time" },
  { title: "B.Sc (Hons.) Anesthesia Technology",             department: "Medical Sciences & Allied Health", durationMonths: 36, mode: "Full-time" },
  { title: "B.Sc (Hons.) Medical Lab Science",               department: "Medical Sciences & Allied Health", durationMonths: 36, mode: "Full-time" },
  { title: "B.Sc (Hons.) Optometry",                         department: "Medical Sciences & Allied Health", durationMonths: 36, mode: "Full-time" },
  { title: "M.Sc Medical Lab Science (Clinical Biochemistry)",department: "Medical Sciences & Allied Health", durationMonths: 24, mode: "Full-time" },
  { title: "M.Sc Anesthesia & Operation Theater Technology", department: "Medical Sciences & Allied Health", durationMonths: 24, mode: "Full-time" },
  { title: "Bachelor of Physiotherapy",                      department: "Medical Sciences & Allied Health", durationMonths: 54, mode: "Full-time" },
  { title: "Diploma In Nursing Assistant",                   department: "Medical Sciences & Allied Health", durationMonths: 12, mode: "Full-time" },
  { title: "M.Sc Cardiac Care",                              department: "Medical Sciences & Allied Health", durationMonths: 24, mode: "Full-time" },
  { title: "M.Sc Medical Microbiology",                      department: "Medical Sciences & Allied Health", durationMonths: 24, mode: "Full-time" },
  { title: "M.Sc Radiology and Imaging Technology",          department: "Medical Sciences & Allied Health", durationMonths: 24, mode: "Full-time" },
  { title: "B.Sc Honors in Nutrition and Dietetics",         department: "Medical Sciences & Allied Health", durationMonths: 36, mode: "Full-time" },
  { title: "Diploma in Medical Lab Technology",              department: "Medical Sciences & Allied Health", durationMonths: 24, mode: "Full-time" },

  // ── Science ───────────────────────────────────────────────────────────────
  { title: "M.Sc Physics",                                   department: "Science",                        durationMonths: 24,  mode: "Full-time" },
  { title: "M.Sc Mathematics",                               department: "Science",                        durationMonths: 24,  mode: "Full-time" },
  { title: "M.Sc Chemistry",                                 department: "Science",                        durationMonths: 24,  mode: "Full-time" },
  { title: "B.Sc Non-Medical",                               department: "Science",                        durationMonths: 36,  mode: "Full-time" },

  // ── Education ─────────────────────────────────────────────────────────────
  { title: "Bachelor in Education",                          department: "Education",                      durationMonths: 24,  mode: "Full-time" },
  { title: "M.A Education",                                  department: "Education",                      durationMonths: 24,  mode: "Full-time" },
  { title: "Masters in Education",                           department: "Education",                      durationMonths: 24,  mode: "Full-time" },

  // ── Arts & Commerce ───────────────────────────────────────────────────────
  { title: "Bachelor of Arts",                               department: "Arts & Commerce",                durationMonths: 36,  mode: "Full-time" },
  { title: "Bachelor of Commerce (H)",                       department: "Arts & Commerce",                durationMonths: 36,  mode: "Full-time" },

  // ── Law ───────────────────────────────────────────────────────────────────
  { title: "LLB",                                            department: "Law",                            durationMonths: 36,  mode: "Full-time" },
  { title: "B.A LLB",                                        department: "Law",                            durationMonths: 60,  mode: "Full-time" },

  // ── Vocational & ITI ──────────────────────────────────────────────────────
  { title: "Welder (G&E)",                                   department: "Vocational & ITI",               durationMonths: 12,  mode: "Full-time" },
  { title: "Plumber",                                        department: "Vocational & ITI",               durationMonths: 12,  mode: "Full-time" },
  { title: "COPA",                                           department: "Vocational & ITI",               durationMonths: 12,  mode: "Full-time" },
];

function shortDesc(title, department) {
  const map = {
    "Engineering": `${title} — 4-year undergraduate program with industry-focused curriculum and hands-on labs.`,
    "Pharmacy": `${title} — Comprehensive pharmacy program preparing graduates for clinical and industrial roles.`,
    "Computer Applications": `${title} — Master the latest in software, data, and computing technologies.`,
    "Management": `${title} — Develop leadership, strategy, and business acumen for a global career.`,
    "Medical Sciences & Allied Health": `${title} — Allied health program with clinical training and hospital exposure.`,
    "Science": `${title} — Advanced science program with research and lab-intensive training.`,
    "Education": `${title} — Professional teacher education program accredited by regulatory bodies.`,
    "Arts & Commerce": `${title} — Foundation in arts, commerce, and social sciences for diverse careers.`,
    "Law": `${title} — Legal studies program preparing graduates for legal practice and advocacy.`,
    "Vocational & ITI": `${title} — Skill-based vocational training with industry certification.`,
  };
  return map[department] ?? `${title} — Offered at SVGOI Campus, Chandigarh.`;
}

async function main() {
  console.log(`\nUpserting ${PROGRAMS.length} programs…\n`);

  let created = 0, updated = 0;

  for (const prog of PROGRAMS) {
    const slug = toSlug(prog.title);
    const data = {
      title: prog.title,
      slug,
      department: prog.department,
      shortDescription: shortDesc(prog.title, prog.department),
      mode: prog.mode ?? "Full-time",
      durationMonths: prog.durationMonths,
      tuitionCents: 0,
      isFeatured: prog.isFeatured ?? false,
      isActive: true,
    };

    const existing = await prisma.program.findUnique({ where: { slug } });

    if (existing) {
      await prisma.program.update({ where: { slug }, data });
      console.log(`  ✏️  Updated : ${prog.title}`);
      updated++;
    } else {
      await prisma.program.create({ data });
      console.log(`  ✅ Created : ${prog.title}`);
      created++;
    }
  }

  // Deactivate programs not in this list
  const slugsToKeep = PROGRAMS.map((p) => toSlug(p.title));
  const deactivated = await prisma.program.updateMany({
    where: { slug: { notIn: slugsToKeep } },
    data: { isActive: false },
  });

  console.log(`\n── Done ─────────────────────────────────`);
  console.log(`  Created   : ${created}`);
  console.log(`  Updated   : ${updated}`);
  console.log(`  Deactivated (not in list): ${deactivated.count}`);
  console.log(`  Total active programs: ${PROGRAMS.length}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
