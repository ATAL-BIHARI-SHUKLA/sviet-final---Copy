type AboutPageKey =
  | "overview"
  | "infrastructure"
  | "accreditations"
  | "rankings"
  | "placements"
  | "alumni"
  | "leadership"
  | "organization"
  | "location"
  | "tour";

export const ABOUT_SLUG_TO_KEY: Record<string, AboutPageKey> = {
  infrastructure: "infrastructure",
  accreditations: "accreditations",
  rankings: "rankings",
  placements: "placements",
  alumni: "alumni",
  leadership: "leadership",
  organization: "organization",
  location: "location",
  tour: "tour",
};

export const ABOUT_ROUTE_SLUGS = Object.keys(ABOUT_SLUG_TO_KEY);

type AboutPageData = {
  title: string;
  intro: string;
  paragraphs: string[];
  stats?: Array<{ value: string; label: string }>;
  highlights?: string[];
};

const ABOUT_PAGE_DATA: Record<AboutPageKey, AboutPageData> = {
  overview: {
    title: "Overview",
    intro:
      "Swami Vivekanand Institute of Engineering and Technology (SVGOI) is a multidisciplinary institution focused on technical excellence, professional readiness, and responsible leadership.",
    paragraphs: [
      "The institution was established to provide outcome-driven education that connects classroom learning with industry expectations. Over the years, SVGOI has built a strong academic ecosystem across engineering, management, computer applications, and allied disciplines.",
      "SVGOI follows a student-centered approach with an emphasis on conceptual clarity, practical exposure, and continuous mentoring. The academic environment is designed to support both foundational learning and advanced specialization.",
      "The mission is to nurture competent professionals with ethics, discipline, and social responsibility. The vision is to remain a trusted destination for quality higher education in North India.",
    ],
    stats: [
      { value: "2004", label: "Established" },
      { value: "50+", label: "Programs" },
      { value: "10,000+", label: "Alumni" },
      { value: "500+", label: "Recruiters" },
    ],
  },
  infrastructure: {
    title: "Infrastructure",
    intro:
      "SVGOI infrastructure is designed for practical learning, innovation, and everyday student development.",
    paragraphs: [
      "Academic facilities include classrooms, laboratories, and learning spaces built to support concept clarity and hands-on application across disciplines.",
      "The campus also includes library resources, collaborative zones, and student support facilities that help maintain a focused and productive learning environment.",
      "Sports and activity spaces complement academics by encouraging physical well-being, teamwork, and balanced campus life.",
    ],
    highlights: [
      "Labs and technical spaces for applied learning",
      "Library, study support, and collaborative facilities",
      "Sports and student activity infrastructure",
    ],
  },
  accreditations: {
    title: "Accreditations & Approvals",
    intro:
      "SVGOI maintains institutional quality through recognized accreditations, approvals, and compliance-driven academic systems.",
    paragraphs: [
      "Regulatory alignment is maintained across relevant programs through structured processes, documentation, and periodic review mechanisms.",
      "Quality standards are continuously monitored to strengthen curriculum delivery, academic governance, and student support practices.",
      "Accreditation outcomes reflect the institution's long-term commitment to responsible, outcome-oriented higher education.",
    ],
    highlights: [
      "NAAC-recognized institutional quality",
      "Program and regulatory compliance practices",
      "Continuous academic quality review",
    ],
  },
  rankings: {
    title: "Rankings",
    intro:
      "SVGOI's ranking and recognition journey reflects consistent academic quality and institutional progress.",
    paragraphs: [
      "Recognition is built through sustained improvements in curriculum outcomes, student development, infrastructure, and academic processes.",
      "Institutional evaluations are used as improvement benchmarks, helping teams refine strategy and strengthen quality systems year after year.",
      "At SVGOI, rankings are treated as indicators of direction and discipline, not end goals.",
    ],
    stats: [
      { value: "20+", label: "Years of Academic Presence" },
      { value: "Multi-Disciplinary", label: "Institutional Ecosystem" },
      { value: "National", label: "Recognition Footprint" },
      { value: "Quality-Led", label: "Growth Approach" },
    ],
  },
  placements: {
    title: "Placements",
    intro:
      "SVGOI's placement ecosystem focuses on readiness, confidence, and long-term career growth.",
    paragraphs: [
      "Students receive structured support through training sessions, aptitude preparation, interview practice, and career planning modules.",
      "Industry connections are strengthened through recruiter interactions, internships, and practice-oriented learning opportunities.",
      "The placement objective is not only job access, but sustained career outcomes built on relevant skills and professional readiness.",
    ],
    stats: [
      { value: "500+", label: "Recruiter Network" },
      { value: "Career-Focused", label: "Training Pathways" },
      { value: "Industry-Linked", label: "Placement Approach" },
      { value: "Student-Centered", label: "Career Guidance" },
    ],
  },
  alumni: {
    title: "Alumni",
    intro:
      "SVGOI alumni form a growing network of professionals, innovators, and entrepreneurs across sectors.",
    paragraphs: [
      "Graduates contribute across technology, business, healthcare, public service, and emerging startup ecosystems.",
      "Alumni interactions support current students through mentoring, career insights, and practical guidance on professional pathways.",
      "The institution values alumni engagement as an important part of long-term academic and community growth.",
    ],
    highlights: [
      "Cross-sector professional presence",
      "Mentorship for student career development",
      "Strong alumni-institution connection",
    ],
  },
  leadership: {
    title: "Leadership",
    intro:
      "SVGOI leadership combines institutional vision with execution-focused academic governance.",
    paragraphs: [
      "Leadership teams align strategy, academic quality, and student-first planning to ensure meaningful and measurable outcomes.",
      "Cross-functional coordination between academic and administrative units strengthens consistency, accountability, and responsiveness.",
      "The leadership approach emphasizes innovation, responsibility, and continuous institutional improvement.",
    ],
    highlights: [
      "Vision linked with execution",
      "Student-first institutional planning",
      "Transparent and accountable governance",
    ],
  },
  organization: {
    title: "Organization Structure",
    intro:
      "SVGOI operates through a structured model that connects leadership vision with department-level execution.",
    paragraphs: [
      "Academic heads, administrative teams, and support functions work through defined roles to maintain efficiency across core operations.",
      "Clear reporting channels and role clarity improve decision flow, policy implementation, and service delivery.",
      "This structure helps the institution scale responsibly while maintaining quality and operational discipline.",
    ],
    highlights: [
      "Defined roles across institutional functions",
      "Aligned academic and administrative workflows",
      "Scalable governance for long-term growth",
    ],
  },
  location: {
    title: "Location",
    intro:
      "SVGOI benefits from a strategically connected location along the Chandigarh-Patiala corridor.",
    paragraphs: [
      "The campus offers convenient access from Chandigarh, Mohali, Panchkula, Ambala, and Patiala while preserving a focused academic setting.",
      "Its regional connectivity supports student commuting, industry interaction, and broader academic engagement.",
      "This balance of accessibility and academic focus makes the campus suitable for both learning continuity and professional exposure.",
    ],
    highlights: [
      "Strong Chandigarh-region connectivity",
      "Accessible yet academically focused campus setting",
      "Convenience for students and visitors",
    ],
  },
  tour: {
    title: "Campus Tour",
    intro:
      "The SVGOI campus tour offers a practical view of learning spaces, support facilities, and student life infrastructure.",
    paragraphs: [
      "Visitors can explore classrooms, labs, library spaces, and activity zones to understand how the campus supports day-to-day learning.",
      "The tour helps students and families evaluate infrastructure quality, learning environment, and institutional support systems.",
      "For better clarity, visitors can interact with academic teams and admissions counselors during the tour.",
    ],
    highlights: [
      "Guided walkthrough of key academic spaces",
      "Overview of student support and campus life",
      "Direct interaction with institutional teams",
    ],
  },
};

export function getAboutPageData(key: AboutPageKey): AboutPageData {
  return ABOUT_PAGE_DATA[key];
}

export function getAboutPageDataBySlug(slug: string): AboutPageData | null {
  const key = ABOUT_SLUG_TO_KEY[slug];
  if (!key) {
    return null;
  }

  return ABOUT_PAGE_DATA[key];
}

export function AboutPageTemplate({ data }: { data: AboutPageData }) {
  return (
    <main className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] text-[#111827]">
      <section className="relative min-h-80 overflow-hidden bg-[linear-gradient(130deg,#EEF4FF_0%,#FFFFFF_52%,#F5F9FF_100%)]">
        <div className="absolute -right-36 -top-30 hidden h-80 w-80 bg-[#BFDBFE]/35 blur-3xl md:block" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-80 max-w-7xl items-center px-4 py-14 md:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f7941d]">About SVGOI</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#f7941d] md:text-5xl">{data.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6B7280]">{data.intro}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl space-y-5 leading-relaxed text-[#6B7280]">
            {data.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {data.stats?.length ? (
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.stats.map((item) => (
                <article
                  key={item.label}
                  className="border border-[#DCE7FF] bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F9FF_100%)] px-4 py-5 shadow-[0_8px_24px_rgba(30,42,120,0.06)]"
                >
                  <p className="text-2xl font-bold text-[#f7941d]">{item.value}</p>
                  <p className="mt-2 text-sm text-[#6B7280]">{item.label}</p>
                </article>
              ))}
            </div>
          ) : null}

          {data.highlights?.length ? (
            <ul className="mt-10 max-w-3xl space-y-3 leading-relaxed text-[#4B5563]">
              {data.highlights.map((item) => (
                <li key={item} className="border-l-2 border-[#f7941d] bg-white/80 pl-4 py-2">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </main>
  );
}
