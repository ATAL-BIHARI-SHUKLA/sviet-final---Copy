import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Award,
  Building2,
  GraduationCap,
  Users,
} from "lucide-react";

import type { Leader } from "@/components/about/leader-card";
import { AboutHeroVideoBackground } from "@/components/about/about-hero-video-background";
import { InfoCard } from "@/components/about/info-card";
import {
  InstitutionsCoursesSection,
  type InstitutionCoursesData,
} from "@/components/about/institutions-courses-section";
import { LeadershipCarousel } from "@/components/about/leadership-carousel";
import { SectionHeader } from "@/components/about/section-header";
import { SectionWrapper } from "@/components/about/section-wrapper";
import { StatCard } from "@/components/about/stat-card";

const RELATED_LINKS = [
  {
    title: "Accreditations & Recognition",
    description: "Institutional quality and benchmarks",
    href: "/about/accreditations",
    icon: Award,
  },
  {
    title: "Campus Infrastructure",
    description: "Facilities that support modern learning",
    href: "#infrastructure-heading",
    icon: Building2,
  },
  {
    title: "Academic Programs",
    description: "Explore multidisciplinary pathways",
    href: "/programs",
    icon: GraduationCap,
  },
  {
    title: "Leadership Desk",
    description: "Vision guiding the institution",
    href: "/about/leadership",
    icon: Users,
  },
] as const;

const INITIATIVES = [
  {
    title: "Accreditation & Quality Standards",
    description:
      "Recognized through NAAC accreditation with a B++ Grade (2.94 Score, 2024), reflecting institutional commitment to quality education.",
    meta: "NAAC B++ | 2.94 Score | 2024",
  },
  {
    title: "Academic Approach",
    description:
      "A curriculum designed around practical application, continuous evaluation, and mentorship that prepares students for real-world challenges.",
  },
  {
    title: "Inclusive Campus Environment",
    description:
      "A diverse and welcoming ecosystem that values cultural exchange, collaboration, and mutual growth.",
  },
  {
    title: "Student Development Ecosystem",
    description:
      "Modern infrastructure including labs, libraries, sports facilities, and activity spaces supporting both academic and personal development.",
  },
];

const LEADERSHIP_DESK: Leader[] = [
  {
    name: "Mr. Ashwani Garg",
    title: "Chairman",
    description:
      "I welcome every aspiring achiever to the Swami Vivekanand Group of Institutions.",
    messageParagraphs: [
      "I welcome every aspiring achiever to the Swami Vivekanand Group of Institutions. SVGOI has become a place that provides valuable educational experiences to students from diverse cultures and backgrounds.",
      "We offer an interactive curriculum designed to deliver strong learning outcomes across scientific, medical, arts, business, and engineering fields.",
      "In today's globalized world, boundaries are becoming transparent, and our international collaborations provide students with opportunities for global exposure.",
      "Join hands with SVGOI and become future-ready.",
    ],
    socialLinks: [
      { label: "Facebook", href: "https://www.facebook.com/ChairmanSVGOI" },
    ],
    imageSrc: "/assets/img/college/management/ashwani-sir.jpg",
    imageAlt: "Mr. Ashwani Garg",
  },
  {
    name: "Mr. Ashok Garg",
    title: "President",
    description:
      "SVGOI has witnessed remarkable growth, driven by dedication, exceptional faculty, and a strong learning environment.",
    messageParagraphs: [
      "SVGOI has witnessed remarkable growth, driven by dedication, exceptional faculty, and a strong learning environment.",
      "We focus on quality education with programs affiliated with national and international universities.",
      "By emphasizing practical learning and research, we help students realize their full potential and build intellectual excellence.",
      "Let's collaborate in building a skilled society together.",
    ],
    socialLinks: [
      { label: "Facebook", href: "https://www.facebook.com/ashok.garg.566" },
    ],
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443864/sviet_assets/college/management/ashok-sir.jpg",
    imageAlt: "Mr. Ashok Garg",
  },
  {
    name: "Mr. Vishal Garg",
    title: "Director Secretarial and Administration",
    description:
      "At SVGOI, we prioritize global academic standards and active engagement between students, faculty, and industry.",
    messageParagraphs: [
      "At SVGOI, we prioritize global academic standards and active engagement between students, faculty, and industry.",
      "Our focus is on holistic education that prepares students for a globalized world.",
      "We aim to shape futures through excellence and create a diverse and enriched campus environment, including international exposure.",
      "Join us in shaping the future of learning.",
    ],
    socialLinks: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/vishal-garg-2134aa142/",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/vishal.garg.7921975",
      },
    ],
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443857/sviet_assets/college/management/vishal-sir.jpg",
    imageAlt: "Mr. Vishal Garg",
  },
  // {
  //   name: "Mr. Ankur Gupta",
  //   title: "Director Corporate Affairs",
  //   description:
  //     "Students across the country are attracted to SVGOI due to our focus on teaching excellence, research, and industry-aligned courses.",
  //   messageParagraphs: [
  //     "Students across the country are attracted to SVGOI due to our focus on teaching excellence, research, and industry-aligned courses.",
  //     "We provide modern infrastructure including ICT-enabled classrooms and active participation in co-curricular activities.",
  //     "International exchange programs help students gain valuable global exposure and opportunities.",
  //   ],
  //   socialLinks: [
  //     {
  //       label: "LinkedIn",
  //       href: "https://www.linkedin.com/in/ankur-gupta-14278730/",
  //     },
  //   ],
  //   imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443877/sviet_assets/college/management/ankurgupta.jpg",
  //   imageAlt: "Mr. Ankur Gupta",
  // },
  // {
  //   name: "Mr. Sahil Garg",
  //   title: "Project Director",
  //   description:
  //     "SVGOI represents quality, dedication, and strong values, reflected in our accomplished alumni.",
  //   messageParagraphs: [
  //     "SVGOI represents quality, dedication, and strong values, reflected in our accomplished alumni.",
  //     "We offer diverse and industry-relevant programs with a student-centric approach, making us one of the top private institutions in North India.",
  //     "Our goal is to nurture globally competitive graduates prepared for success across various domains.",
  //     "Join us in shaping a brighter future.",
  //   ],
  //   socialLinks: [
  //     {
  //       label: "LinkedIn",
  //       href: "https://www.linkedin.com/in/sahil-garg-034226130/",
  //     },
  //     { label: "Facebook", href: "https://www.facebook.com/sahil.garg.58910" },
  //   ],
  //   imageSrc: "/assets/img/college/management/sahil-sir.jpg",
  //   imageAlt: "Mr. Sahil Garg",
  // },
  // {
  //   name: "Mr. Shubham Garg",
  //   title: "Director Placements",
  //   description:
  //     "Our focus is to provide strong placement opportunities and corporate exposure to students.",
  //   messageParagraphs: [
  //     "Our focus is to provide strong placement opportunities and corporate exposure to students.",
  //     "Over the years, we have successfully placed students across multiple industries including IT, manufacturing, banking, media, and services.",
  //     "The Training and Placement Office coordinates closely with departments to ensure smooth placement activities and career support.",
  //   ],
  //   socialLinks: [
  //     {
  //       label: "LinkedIn",
  //       href: "https://www.linkedin.com/in/shubham-garg-670537170/",
  //     },
  //     {
  //       label: "Facebook",
  //       href: "https://www.facebook.com/profile.php?id=100052235821482",
  //     },
  //   ],
  //   imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443858/sviet_assets/college/management/shubham-sir..jpg",
  //   imageAlt: "Mr. Shubham Garg",
  // },
  {
    name: "Mr. Ankur Gill",
    title: "Director Operations",
    description:
      "As the Director of Operations at SVGOI, I am deeply committed to excellence, innovation, and growth.",
    messageParagraphs: [
      "As the Director of Operations at SVGOI, I am deeply committed to fostering an environment of excellence, innovation, and growth within our institution.",
      "With a focus on providing top-notch education and opportunities for our students, I am honored to collaborate with such dedicated professionals who share a passion for academic advancement and student success.",
      "Our mission is to empower students with knowledge, skills, and values to thrive in an ever-evolving world. We strive to create an ecosystem where creativity flourishes, ideas are nurtured, and aspirations are realized.",
      "I am confident that with unwavering support and dedication, the institute will continue to reach new heights of success and distinction.",
    ],
    socialLinks: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ankurgillofficial/",
      },
      { label: "Facebook", href: "https://www.facebook.com/ankurgillofficial" },
    ],
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443875/sviet_assets/college/management/ankur-sir.jpg",
    imageAlt: "Mr. Ankur Gill",
  },
];

const CULTURE_STATS = [
  { value: "12", label: "States" },
  { value: "25+", label: "Nationalities" },
  { value: "2000+", label: "International Students" },
  { value: "5000+", label: "Students" },
];

const INFRASTRUCTURE = [
  {
    title: "Administrative Block",
    description:
      "The main academic and administrative core that anchors campus operations and student support.",
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443568/sviet_assets/infrastructure/buildings/admin.jpg",
    imageAlt: "Administrative block at SVGOI",
    spanClassName: "xl:col-span-5 xl:row-span-2",
  },
  {
    title: "Academic Auditorium",
    description:
      "A shared venue for lectures, seminars, cultural events, and institution-wide gatherings.",
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443568/sviet_assets/infrastructure/buildings/audi.jpg",
    imageAlt: "Academic auditorium at SVGOI",
    spanClassName: "xl:col-span-4 xl:row-span-1",
  },
  {
    title: "Campus Canteen",
    description:
      "A lively social space where students and staff connect between classes and activities.",
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443568/sviet_assets/infrastructure/buildings/canteen.jpg",
    imageAlt: "Campus canteen at SVGOI",
    spanClassName: "xl:col-span-3 xl:row-span-1",
  },
  {
    title: "Civil Labs",
    description:
      "Hands-on spaces where students learn by testing, building, and observing practical outcomes.",
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443566/sviet_assets/infrastructure/buildings/civil%20labs.jpg",
    imageAlt: "Civil engineering laboratory facilities",
    spanClassName: "xl:col-span-4 xl:row-span-1",
  },
  {
    title: "Corporate Connect Space",
    description:
      "A professional setting for industry interactions, placement activity, and collaborative meetings.",
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443568/sviet_assets/infrastructure/buildings/coorporate_in_campus.jpg",
    imageAlt: "Corporate interaction space inside campus",
    spanClassName: "xl:col-span-5 xl:row-span-2",
  },
  {
    title: "Computer Science Block",
    description:
      "Technology-focused learning spaces built to support programming, labs, and project work.",
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443562/sviet_assets/infrastructure/buildings/cse.jpg",
    imageAlt: "Computer science block at SVGOI",
    spanClassName: "xl:col-span-3 xl:row-span-1",
  },
  {
    title: "Hostel",
    description:
      "Residential infrastructure designed to support a comfortable and disciplined student life.",
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443562/sviet_assets/infrastructure/buildings/hostel.jpg",
    imageAlt: "Student hostel at SVGOI",
    spanClassName: "xl:col-span-4 xl:row-span-1",
  },
  {
    title: "Mechanical Engineering Block",
    description:
      "Specialised academic infrastructure supporting design, fabrication, and practical engineering learning.",
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443562/sviet_assets/infrastructure/buildings/mechanical_eng.jpg",
    imageAlt: "Mechanical engineering block at SVGOI",
    spanClassName: "xl:col-span-4 xl:row-span-2",
  },
  {
    title: "Pharmacy Block",
    description:
      "A dedicated environment for pharmacy instruction, labs, and discipline-specific study.",
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443562/sviet_assets/infrastructure/buildings/pharmacy_block.jpg",
    imageAlt: "Pharmacy block at SVGOI",
    spanClassName: "xl:col-span-3 xl:row-span-1",
  },
  {
    title: "Innovation Lab",
    description:
      "A maker-style learning space for experimentation, group work, and practical discovery.",
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443558/sviet_assets/infrastructure/labs/the_unique.jpg",
    imageAlt: "Innovation lab at SVGOI",
    spanClassName: "xl:col-span-5 xl:row-span-1",
  },
  {
    title: "Smart Lab",
    description:
      "A technical lab setup that supports applied learning, project builds, and skill development.",
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443558/sviet_assets/infrastructure/labs/lab2.jpg",
    imageAlt: "Smart laboratory at SVGOI",
    spanClassName: "xl:col-span-4 xl:row-span-1",
  },
  {
    title: "Smart Classroom",
    description:
      "Another hands-on learning environment supporting demonstrations and focused practice.",
    imageSrc: "/assets/img/infrastructure/labs/1.JPG",
    imageAlt: "Smart classroom at SVGOI",
    spanClassName: "xl:col-span-3 xl:row-span-2",
  },
];

type PhilosophyPoint = {
  title: string;
  description: string;
};

const MISSION_POINTS: PhilosophyPoint[] = [
  {
    title: "Empowering Students",
    description:
      "Our mission is to inspire and empower students to pursue excellence in academics, character, and personal growth.",
  },
  {
    title: "Driving Positive Change",
    description:
      "We strive to prepare students to become responsible professionals who contribute positively to society.",
  },
  {
    title: "Fostering Community Engagement",
    description:
      "We encourage meaningful participation in community initiatives to build social awareness and empathy.",
  },
  {
    title: "Promoting Diversity and Inclusion",
    description:
      "We build an inclusive campus where every student is respected, supported, and valued equally.",
  },
];

const VISION_POINTS: PhilosophyPoint[] = [
  {
    title: "Pursuing Excellence",
    description:
      "Our vision is to become a world-class institution that nurtures talent through quality and consistency.",
  },
  {
    title: "Building Leaders",
    description:
      "We envision graduates as innovators and ethical leaders capable of creating lasting impact.",
  },
  {
    title: "Global Impact",
    description:
      "We aim to create global relevance through collaboration, research culture, and future-ready education.",
  },
  {
    title: "Sustainable Future",
    description:
      "We are committed to sustainability-oriented thinking and responsible practices across institutional growth.",
  },
];

function PhilosophyTimeline({ points }: { points: PhilosophyPoint[] }) {
  return (
    <ol className="relative space-y-6">
      <span
        className="absolute left-3 top-2 h-[calc(100%-1rem)] w-px bg-[#93C5FD]"
        aria-hidden="true"
      />
      {points.map((point, index) => (
        <li key={point.title} className="relative pl-16">
          <span className="absolute left-0 top-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f7941d] text-sm font-semibold text-white">
            {index + 1}
          </span>

          <h3 className="text-lg font-semibold text-[#000000]">
            {point.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">
            {point.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function AboutOverviewPage({
  institutions,
}: {
  institutions: InstitutionCoursesData[];
}) {
  return (
    <main className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] text-[#111827]">
      <section
        aria-labelledby="about-hero-heading"
        className="relative -mt-30 overflow-hidden pt-30"
      >
        <AboutHeroVideoBackground />
        <div
          className="absolute inset-0 bg-linear-to-r from-[#000000]/90 via-[#000000]/60 to-[#000000]/30"
          aria-hidden="true"
        />

        <div className="relative ml-20 flex min-h-160 max-w-4xl flex-col justify-end px-4 pb-18 md:min-h-184 md:px-6 md:pb-28">
          <p className="flex items-center gap-2 text-sm font-medium text-white/90 md:text-2xl">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-white">About Us</span>
          </p>

          <h1
            id="about-hero-heading"
            className="mt-8 max-w-5xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl"
          >
            Where Learning Meets Innovation and Opportunity.
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/95 md:text-xl">
            SVGOI is built as a space where education goes beyond classrooms,
            bringing together academic depth, practical exposure, and a culture
            of innovation for real-world readiness.
          </p>
        </div>
      </section>

      <SectionWrapper
        aria-labelledby="about-svgoi-heading"
        className="border-t border-[#E5E7EB] bg-[#F8FAFC]"
      >
        <div className="space-y-14">
          <div>
            <p className="inline-flex items-center gap-3 text-xl font-medium leading-tight text-[#374151]">
              <span
                className="h-2.5 w-2.5 rotate-45 bg-[#14B8A6]"
                aria-hidden="true"
              />
              Quick Access
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {RELATED_LINKS.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex items-center justify-between border border-[#E5E7EB] bg-white px-6 py-6 shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:shadow-[0_12px_28px_rgba(30,42,120,0.12)]"
                  >
                    <div className="flex items-start gap-4">
                      <Icon
                        className="mt-0.5 h-7 w-7 text-[#4F46E5]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xl font-semibold leading-tight text-[#111827] md:text-2xl">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-[#6B7280]">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-[#EEF2FF] text-[#4F46E5] transition group-hover:bg-[#f7941d] group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <h2
              id="about-svgoi-heading"
              className="text-5xl font-semibold leading-tight md:text-7xl"
            >
              <span className="block text-[#1F2937]">About</span>
              <span className="mt-2 block text-[#f7941d]">SVGOI</span>
            </h2>

            <div className="max-w-4xl space-y-7 text-lg leading-relaxed text-[#111827]">
              <p>
                With over two decades of presence in higher education, Swami
                Vivekanand Group of Institutes has developed into a
                multidisciplinary institution centered on applied learning,
                innovation, and career-oriented education.
              </p>

              <p>
                Established under the Shri Raghunath Rai Memorial Educational
                and Charitable Trust, the journey began with SVGOI in 2004 and
                expanded into engineering, pharmacy, management, education,
                polytechnic, IT, and law.
              </p>

              <p>
                SVGOI continues to evolve as a learning ecosystem that combines
                academic structure with industry relevance, supporting students
                through practical training, mentorship, and skill-based
                development.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper aria-label="Location Highlight" className="bg-[#F5F7FB]">
        <InfoCard
          title="Strategic Location Advantage"
          description="Located along the Chandigarh-Patiala highway (NH-1), the campus offers strong accessibility while maintaining a focused academic setting."
          className="border-[#BFDBFE]"
        >
          <p className="mt-4 text-sm leading-relaxed text-[#6B7280]">
            Easily connected to Chandigarh, Mohali, Panchkula, Ambala, and
            Patiala through major road links.
          </p>
          <ul
            className="mt-4 flex flex-wrap gap-2 text-sm font-medium text-[#f7941d]"
            aria-label="Easily connected cities"
          >
            {["Chandigarh", "Mohali", "Panchkula", "Ambala", "Patiala"].map(
              (city) => (
                <li
                  key={city}
                  className="border border-[#BFDBFE] bg-white px-3 py-1"
                >
                  {city}
                </li>
              ),
            )}
          </ul>
        </InfoCard>
      </SectionWrapper>

      {/* 5 USP Cards */}
      <SectionWrapper
        aria-labelledby="usp-heading"
        className="bg-[#111827] overflow-hidden"
      >
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f7941d]">
              Why SVGOI
            </p>
            <h2
              id="usp-heading"
              className="mt-2 text-3xl font-bold text-white md:text-4xl"
            >
              What Sets Us Apart
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            Five reasons why thousands of students choose SVGOI every year.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              heading: "NAAC Accredited",
              body: "Recognised with a 2.94 NAAC score (2024) — a benchmark of academic quality and institutional standards.",
            },
            {
              heading: "60 LPA Highest Package",
              body: "Our students secure top-tier roles across India's leading companies — from IT giants to global MNCs.",
            },
            {
              heading: "50,000+ Students",
              body: "One of Punjab's largest multi-discipline campuses, nurturing talent from 28 states and beyond.",
            },
            {
              heading: "20+ Years of Excellence",
              body: "A trusted legacy institution delivering quality engineering, management, pharmacy, and law education since 2004.",
            },
            {
              heading: "Innovation Ecosystem",
              body: "Startup incubation, research grants, IIC support, and 15+ student-led initiatives power our entrepreneurship culture.",
            },
          ].map((usp) => (
            <article
              key={usp.heading}
              className="flex flex-col border-t-4 border-[#f7941d] bg-[#1f2937] p-6"
            >
              <h3 className="text-base font-bold text-white">{usp.heading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {usp.body}
              </p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper aria-labelledby="initiatives-heading">
        <SectionHeader
          id="initiatives-heading"
          eyebrow="Institutional Focus"
          title="Institutional Focus & Achievements"
          description="SVGOI emphasizes consistent growth through structured initiatives that support academic quality and student success."
          titleClassName="text-[#000000]"
          className="mb-8"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {INITIATIVES.map((item) => (
            <InfoCard
              key={item.title}
              title={item.title}
              description={item.description}
              meta={item.meta}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="philosophy-heading"
        className="bg-[#EEF4FF]"
      >
        <SectionHeader
          id="philosophy-heading"
          eyebrow="Vision & Direction"
          title="Our Philosophy"
          description="SVGOI aims to build a progressive learning environment that nurtures thinkers, innovators, and future leaders through relevant and responsible education."
          className="mx-auto max-w-4xl text-center"
          titleClassName="text-[#000000]"
          descriptionClassName="text-[#4B5563]"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
          <h3 className="text-4xl font-bold tracking-wide text-[#f7941d] md:text-5xl">
            MISSION
          </h3>
          <PhilosophyTimeline points={MISSION_POINTS} />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[2fr_1fr] lg:items-start">
          <PhilosophyTimeline points={VISION_POINTS} />
          <h3 className="text-4xl font-bold tracking-wide text-[#f7941d] md:text-right md:text-5xl">
            VISION
          </h3>
        </div>
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="management-desk-heading"
        className="bg-black"
      >
        <SectionHeader
          id="management-desk-heading"
          eyebrow="Leadership"
          title="From the Desk of Management"
          description="Leadership perspectives that shape institutional direction, student outcomes, and academic quality."
          className="mb-8"
          titleClassName="text-white"
          descriptionClassName="text-[#DBEAFE]"
          eyebrowClassName="text-[#BFDBFE]"
        />
        <LeadershipCarousel leaders={LEADERSHIP_DESK} />
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="institutions-programs-heading"
        className="bg-[#F5F7FB]"
      >
        <InstitutionsCoursesSection institutions={institutions} />
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="culture-diversity-heading"
        className="bg-[#F8FAFF]"
      >
        <SectionHeader
          id="culture-diversity-heading"
          eyebrow="Campus Life"
          title="Culture and Diversity"
          description="A dynamic campus environment built on inclusion, collaboration, and shared learning where ideas and perspectives are exchanged openly."
          centered
          titleClassName="text-[#000000]"
          className="mb-8"
        />

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CULTURE_STATS.map((item) => (
            <StatCard
              key={item.label}
              value={item.value}
              label={item.label}
              className="text-center"
            />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-[#6B7280]">
          Students across India and international communities learn, interact,
          and grow together, creating a globally aware and culturally rich
          academic environment.
        </p>
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="infrastructure-heading"
        className="border-t border-[#E5E7EB]"
      >
        <SectionHeader
          id="infrastructure-heading"
          eyebrow="Campus"
          title="Infrastructure"
          description="Facilities designed to support academic growth, innovation, and overall student development while balancing learning with well-being."
          className="mb-8"
          titleClassName="text-[#000000]"
        />

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="group relative overflow-hidden border border-[#E5E7EB] bg-white shadow-[0_10px_28px_rgba(30,42,120,0.08)] lg:min-h-136">
            <div className="relative min-h-96 lg:h-full">
              <Image
                src={INFRASTRUCTURE[0].imageSrc}
                alt={INFRASTRUCTURE[0].imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                Campus Infrastructure
              </p>
              <h3 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                {INFRASTRUCTURE[0].title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
                {INFRASTRUCTURE[0].description}
              </p>
            </div>
          </article>

          <div className="grid gap-5">
            {INFRASTRUCTURE.slice(1, 3).map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden border border-[#E5E7EB] bg-white shadow-[0_10px_28px_rgba(30,42,120,0.08)] lg:min-h-65.5"
              >
                <div className="relative min-h-64">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/78 via-black/20 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    {item.title}
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {INFRASTRUCTURE.length > 3 ? (
          <div className="mt-5 grid grid-flow-dense gap-5 sm:grid-cols-2 xl:grid-cols-12 xl:auto-rows-[180px]">
            {INFRASTRUCTURE.slice(3).map((item) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden border border-[#E5E7EB] bg-white shadow-[0_10px_28px_rgba(30,42,120,0.08)] ${item.spanClassName ?? ""}`}
              >
                <div className="relative min-h-64 h-full">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/78 via-black/20 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    {item.title}
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </SectionWrapper>
    </main>
  );
}
