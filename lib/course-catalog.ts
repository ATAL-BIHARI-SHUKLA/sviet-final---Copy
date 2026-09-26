export type CourseLevel =
  | "UG"
  | "PG"
  | "DIPLOMA"
  | "VOCATIONAL"
  | "PROFESSIONAL"
  | "CERTIFICATE";

export type CourseCatalogEntry = {
  title: string;
  department: string;
  level: CourseLevel;
  durationMonths: number;
  isFeatured?: boolean;
};

export const COURSE_CATALOG: CourseCatalogEntry[] = [
  {
    title: "B.Pharmacy",
    department: "Pharmacy",
    level: "UG",
    durationMonths: 48,
  },
  {
    title: "Pharma.D",
    department: "Pharmacy",
    level: "PROFESSIONAL",
    durationMonths: 72,
  },
  {
    title: "M.Pharmacy (Pharmaceutics)",
    department: "Pharmacy",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "M.Pharmacy (Pharmacology)",
    department: "Pharmacy",
    level: "PG",
    durationMonths: 24,
  },

  {
    title: "Diploma in Pharmacy",
    department: "Diploma",
    level: "DIPLOMA",
    durationMonths: 24,
  },
  {
    title: "Diploma in Mechanical Engineering",
    department: "Diploma",
    level: "DIPLOMA",
    durationMonths: 36,
  },
  {
    title: "Diploma in Civil Engineering",
    department: "Diploma",
    level: "DIPLOMA",
    durationMonths: 36,
  },
  {
    title: "Diploma in Electrical Engineering",
    department: "Diploma",
    level: "DIPLOMA",
    durationMonths: 36,
  },
  {
    title: "Diploma Computer Science Engineering",
    department: "Diploma",
    level: "DIPLOMA",
    durationMonths: 36,
  },
  {
    title: "Diploma in Medical Lab Technology",
    department: "Diploma",
    level: "DIPLOMA",
    durationMonths: 24,
  },

  {
    title: "B.Tech Civil Engineering",
    department: "Engineering",
    level: "UG",
    durationMonths: 48,
  },
  {
    title: "B.Tech Computer Science & Engineering",
    department: "Engineering",
    level: "UG",
    durationMonths: 48,
    isFeatured: true,
  },
  {
    title: "B.Tech Electrical Engineering",
    department: "Engineering",
    level: "UG",
    durationMonths: 48,
  },
  {
    title: "B.Tech Electronics & Communication Engineering",
    department: "Engineering",
    level: "UG",
    durationMonths: 48,
  },
  {
    title: "B.Tech Mechanical Engineering",
    department: "Engineering",
    level: "UG",
    durationMonths: 48,
  },
  {
    title: "B.Tech Artificial Intelligence",
    department: "Engineering",
    level: "UG",
    durationMonths: 48,
    isFeatured: true,
  },
  {
    title: "M.Tech Computer Science Engineering",
    department: "Engineering",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "M.Tech Mechanical Engineering",
    department: "Engineering",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "M.Tech Electronics & Communication Engineering",
    department: "Engineering",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "M.Tech Civil Engineering",
    department: "Engineering",
    level: "PG",
    durationMonths: 24,
  },

  {
    title: "Master of Computer Applications",
    department: "Computer Applications",
    level: "PG",
    durationMonths: 24,
    isFeatured: true,
  },
  {
    title: "Bachelor of Computer Applications",
    department: "Computer Applications",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "Post Graduate Diploma in Computer Application",
    department: "Computer Applications",
    level: "DIPLOMA",
    durationMonths: 12,
  },
  {
    title: "B.Sc Information Technology",
    department: "Computer Applications",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "Bachelor of Arts (Computer Science)",
    department: "Computer Applications",
    level: "UG",
    durationMonths: 36,
  },

  {
    title: "Master of Business Administration",
    department: "Management",
    level: "PG",
    durationMonths: 24,
    isFeatured: true,
  },
  {
    title: "Bachelor of Business Administration",
    department: "Management",
    level: "UG",
    durationMonths: 36,
  },

  {
    title: "Bachelor of Hotel Management & Catering Technology",
    department: "Hotel Management",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "Master of Hotel Management & Catering Technology",
    department: "Hotel Management",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "B.Voc (Hospitality & Catering Management)",
    department: "Hotel Management",
    level: "VOCATIONAL",
    durationMonths: 36,
  },
  {
    title: "B.Sc Honors in Nutrition and Dietetics",
    department: "Hotel Management",
    level: "UG",
    durationMonths: 36,
  },

  {
    title: "B.Sc Medical Lab Sciences",
    department: "Medical Sciences & Allied Health",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "B.Sc Radiology & Imaging Technology",
    department: "Medical Sciences & Allied Health",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "B.Sc (Operation Theater Technology)",
    department: "Medical Sciences & Allied Health",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "B.Sc Cardiac Care Technology",
    department: "Medical Sciences & Allied Health",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "B.Sc (Hons.) Operation Theatre Technology",
    department: "Medical Sciences & Allied Health",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "B.Sc (Hons.) Anesthesia Technology",
    department: "Medical Sciences & Allied Health",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "B.Sc (Hons.) Optometry",
    department: "Medical Sciences & Allied Health",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "M.Sc Medical Lab Science (Clinical Biochemistry)",
    department: "Medical Sciences & Allied Health",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "M.Sc Anesthesia & Operation Theater Technology",
    department: "Medical Sciences & Allied Health",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "Bachelor of Physiotherapy",
    department: "Medical Sciences & Allied Health",
    level: "UG",
    durationMonths: 54,
  },
  {
    title: "M.Sc Cardiac Care Technology",
    department: "Medical Sciences & Allied Health",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "M.Sc (Medical Microbiology)",
    department: "Medical Sciences & Allied Health",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "M.Sc (Radiology and Imaging Technology)",
    department: "Medical Sciences & Allied Health",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "Bachelor in Hospital Administration",
    department: "Medical Sciences & Allied Health",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "Diploma In Nursing Assistant",
    department: "Medical Sciences & Allied Health",
    level: "DIPLOMA",
    durationMonths: 12,
  },

  {
    title: "M.Sc Physics",
    department: "Science",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "M.Sc Math",
    department: "Science",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "M.Sc Chemistry",
    department: "Science",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "B.Sc Non-Medical",
    department: "Science",
    level: "UG",
    durationMonths: 36,
  },

  {
    title: "Master of Commerce",
    department: "Commerce",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "Bachelor of Commerce",
    department: "Commerce",
    level: "UG",
    durationMonths: 36,
  },

  {
    title: "Bachelor of Arts",
    department: "Arts & Education",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "B.A. (Journalism and Mass Communication)",
    department: "Arts & Education",
    level: "UG",
    durationMonths: 36,
  },
  {
    title: "Bachelor in Education",
    department: "Arts & Education",
    level: "PROFESSIONAL",
    durationMonths: 24,
  },
  {
    title: "M.A Education",
    department: "Arts & Education",
    level: "PG",
    durationMonths: 24,
  },
  {
    title: "Masters in Education",
    department: "Arts & Education",
    level: "PG",
    durationMonths: 24,
  },

  {
    title: "LLB",
    department: "Law",
    level: "PROFESSIONAL",
    durationMonths: 36,
  },
  { title: "B.A. L.L.B", department: "Law", level: "UG", durationMonths: 60 },

  {
    title: "Welder(G&E)",
    department: "Vocational & ITI",
    level: "VOCATIONAL",
    durationMonths: 12,
  },
  {
    title: "Plumber",
    department: "Vocational & ITI",
    level: "VOCATIONAL",
    durationMonths: 12,
  },
  {
    title: "COPA",
    department: "Vocational & ITI",
    level: "VOCATIONAL",
    durationMonths: 12,
  },
];

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function inferSpecialization(title: string) {
  const match = title.match(/\(([^)]+)\)/);
  if (!match) {
    return null;
  }

  const specialization = match[1].trim();
  if (/^hons\.?$/i.test(specialization)) {
    return null;
  }

  return specialization;
}
