"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FaBookOpen,
  FaFlask,
  FaHandshake,
  FaIndustry,
  FaLaptopCode,
  FaMicroscope,
  FaTools,
} from "react-icons/fa";
import { researchData } from "./research-data";

const containerClass = "mx-auto max-w-[1280px] px-4 sm:px-6";
const sectionClass = "py-10 sm:py-16 lg:py-24";
const headerSpacing = "mb-5 sm:mb-8 lg:mb-10";

const hero = {
  title: "Research & Innovation at SVGOI",
  subtitle: "Where Ideas Transform into Real-World Impact",
  description:
    "Research at SVGOI is not just academic-it is a culture of innovation, experimentation, and real-world problem solving.",
};

const stats = [
  {
    value: researchData.stats.publications,
    label: "Research Publications",
    href: "#publications",
  },
  {
    value: researchData.stats.patents,
    label: "Patents Filed",
    href: "#patents",
  },
  {
    value: researchData.stats.books,
    label: "Books Published",
    href: "#books",
  },
];

const researchDomains = [
  {
    title: "Advanced Computing",
    description:
      "AI, data science, and intelligent systems for real-world applications.",
    icon: FaLaptopCode,
  },
  {
    title: "Biotechnology",
    description:
      "Translational bio-research focused on health and sustainability.",
    icon: FaMicroscope,
  },
  {
    title: "Civil Engineering",
    description:
      "Applied civil research focused on resilient infrastructure and sustainable construction.",
    icon: FaTools,
  },
  {
    title: "Materials Research",
    description: "Novel materials and testing for engineering and medical use.",
    icon: FaFlask,
  },
  {
    title: "Industry 4.0",
    description:
      "Automation, cyber-physical systems, and process optimization.",
    icon: FaIndustry,
  },
  {
    title: "Innovation & IP",
    description: "Patent support, commercialization, and startup incubation.",
    icon: FaHandshake,
  },
];

const rdCommittee = [
  "Dr. Neeraj Kumar",
  "Dr. Indu Batra",
  "Dr. Manpreet Kaur",
  "Mr. Kaushik Bharti",
  "Mr. Manish",
  "Ms. Suvidha",
];

const innovativeProjects = [
  {
    title: "Electric Bike Created by SVGOI Student",
    description:
      "Mohd. Jawaad Khan (Electrical Engg. 7th Sem) launched a prototype electric bike, expected to be available on Paytm, Flipkart and Amazon.",
  },
  {
    title: "Electric Car 'SVGOI VOLTA'",
    description:
      "An eco-friendly electric car innovation where SVGOI acts as seed funding agency and venture capitalist.",
  },
  {
    title: "IIT Ropar Achievement",
    description:
      "Civil Engineering students secured 4th position among 30 teams on 'Green Buildings'.",
  },
  {
    title: "Auto Dispenser for Hand Sanitizer",
    description: "Developed by a second-year student during COVID.",
  },
  {
    title: "Mini Refrigerator",
    description: "Designed by Mechanical Engineering students.",
  },
  {
    title: "Voice Control Robot",
    description: "Robot designed with voice command capability.",
  },
  {
    title: "Multi-Nozzle Pesticide Sprayer",
    description: "Agricultural solution designed by students.",
  },
];

const publications = [
  {
    title: "Improve Performance in WSN using Modified CSMA/CD",
    author: "Mr. Ishant Premi",
    year: "2018-19",
    issn: "0025-0422",
  },
  {
    title: "Improve Performance in WSN using Modified CSMA/CD",
    author: "Ms. Roop Shikha",
    year: "2018-19",
    issn: "0025-0422",
  },
  {
    title: "IRIS Detection using Image Processing",
    author: "Ms. Vandana",
    year: "2018-19",
    issn: "0025-0422",
  },
  {
    title: "IRIS Detection using Image Processing",
    author: "Ms. Nisha",
    year: "2018-19",
    issn: "0025-0422",
  },
  {
    title: "R.O.L.S.H",
    author: "Mr. Ankur Gill",
    year: "2018-19",
    issn: "0025-0422",
  },
  {
    title: "R.O.L.S.H",
    author: "Mr. Supinderjit Singh",
    year: "2018-19",
    issn: "0025-0422",
  },
  {
    title: "Wireless Sensor Network Throughput",
    author: "Ms. Roop Sikha",
    year: "2018-19",
    issn: "0025-0422",
  },
  {
    title: "Wireless Sensor Network Throughput",
    author: "Mr. Ishant Premi",
    year: "2018-19",
    issn: "0025-0422",
  },
  {
    title: "Nanometrology Study",
    author: "Mr. Kapil Munjal",
    year: "2018-19",
    issn: "0378-4568",
  },
  {
    title: "Efficient Algorithm for WSN",
    author: "Ms. Manju Bala Goel",
    year: "2018-19",
    issn: "0378-4568",
  },
  {
    title: "Plant Maintenance Analysis",
    author: "Ms. Sakshi Sharma",
    year: "2018-19",
    issn: "0378-4568",
  },
  {
    title: "Plant Maintenance Analysis",
    author: "Ms. Akanksha Pathania",
    year: "2018-19",
    issn: "0378-4568",
  },
  {
    title: "Delay in Residential Projects",
    author: "Ms. Sakshi Sharma",
    year: "2018-19",
    issn: "0378-4568",
  },
  {
    title: "Delay in Residential Projects",
    author: "Ms. Saneha",
    year: "2018-19",
    issn: "0378-4568",
  },
  {
    title: "Material Management Challenges",
    author: "Mr. Dhiraj Parkash Dhiman",
    year: "2018-19",
    issn: "0378-4568",
  },
  {
    title: "Material Management Challenges",
    author: "Mr. Prince Chawla",
    year: "2018-19",
    issn: "0378-4568",
  },
  {
    title: "Cost of Production",
    author: "Mr. Gurpreet Singh",
    year: "2018-19",
    issn: "0378-4568",
  },
  {
    title: "Cost of Production",
    author: "Mr. Aman Gupta",
    year: "2018-19",
    issn: "0378-4568",
  },
  {
    title: "Engineering Materials",
    author: "Mr. Kapil Munjal",
    year: "2018-19",
    issn: "0378-4568",
  },
  {
    title: "Heat Transfer",
    author: "Mr. Harneet Singh",
    year: "2018-19",
    issn: "0378-4568",
  },
];

const patents = [
  { applicationNo: "440565-001", title: "Brick Mortor Laying Tool" },
  { applicationNo: "440566-001", title: "Smart Socket" },
  { applicationNo: "440567-001", title: "Bread Slicer" },
  { applicationNo: "440568-001", title: "Medicine Dispensing Device" },
  { applicationNo: "440569-001", title: "Digital Multi Meter" },
  { applicationNo: "440570-001", title: "Ergonomic Workstation Desk" },
  { applicationNo: "440571-001", title: "Screw Driver cum Wrench" },
  { applicationNo: "440572-001", title: "Spraying Robot" },
  { applicationNo: "440573-001", title: "Food Delivery Robot" },
  {
    applicationNo: "440574-001",
    title: "Temperature Gradient Incubation System",
  },
  { applicationNo: "202411099894", title: "Self-Healing Cement" },
  { applicationNo: "202411099896", title: "Biodegradable Food Packaging" },
  { applicationNo: "202411099895", title: "Electrochromic Device" },
  { applicationNo: "202411099898", title: "Air-Purifying Paint" },
  { applicationNo: "202411099897", title: "Plastic Recycling System" },
  { applicationNo: "202411099128", title: "Ground Stability Detection System" },
  { applicationNo: "202411099129", title: "Solar Vehicle Climate Control" },
  { applicationNo: "202411099132", title: "AI Thermal Management System" },
  { applicationNo: "202411099130", title: "Nano-Encapsulated Pesticide" },
  { applicationNo: "202411099131", title: "AI Waste Sorting System" },
];

const booksMeta = {
  title: "Books & Edited Chapters",
  total: "50+",
  year: "2022-23",
};

const booksAndChapters = [
  {
    srNo: 1,
    title: "Handbook on Big Data and Machine Learning",
    author: "Ms. Vandana",
    type: "Book",
    isbn: "978-93-5515-732-4",
  },
  {
    srNo: 2,
    title: "Artificial Intelligence in Cyber Security",
    author: "Ms. Vandana",
    type: "Book",
    isbn: "978-93-5515-908-3",
  },
  {
    srNo: 3,
    title: "8086 Microprocessor and Interfacing",
    author: "Ms. Roop Shikha",
    type: "Book",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 4,
    title: "8086 Microprocessor and Interfacing",
    author: "Mr. Manik Dhiman",
    type: "Book",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 5,
    title: "Introduction to Microprocessors",
    author: "Ms. Yukti Gupta",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 6,
    title: "Introduction to Microprocessors",
    author: "Ms. Roop Shikha",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 7,
    title: "Types of Computers",
    author: "Ms. Vandana",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 8,
    title: "Types of Computers",
    author: "Ms. Nisha",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 9,
    title: "Microprocessor Evolution and Types",
    author: "Mr. Manik Dhiman",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 10,
    title: "Microprocessor Evolution and Types",
    author: "Dr. Indu Batra",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 11,
    title: "8086 Internal Architecture",
    author: "Ms. Roop Shikha",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 12,
    title: "8086 Internal Architecture",
    author: "Dr. Shashi Jawla",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 13,
    title: "Microprocessor - 8086 Addressing Modes",
    author: "Ms. Neha Garg",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 14,
    title: "Microprocessor - 8086 Addressing Modes",
    author: "Ms. Sujata Tondon",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 15,
    title: "Data Transfer and Arithmetic Instructions of 8086",
    author: "Ms. Ritika Mishra",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 16,
    title: "Data Transfer and Arithmetic Instructions of 8086",
    author: "Mr. Vikas Zandu",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 17,
    title:
      "Logical, String Manipulation, Control Transfer and Processor Control Instructions",
    author: "Ms. Kulbir Kaur",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 18,
    title:
      "Logical, String Manipulation, Control Transfer and Processor Control Instructions",
    author: "Ms. Saneha",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 19,
    title: "Assembler Directives of the 8086 Microprocessor",
    author: "Ms. Komal Sood",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 20,
    title: "Assembler Directives of the 8086 Microprocessor",
    author: "Mr. Rajat Gupta",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 21,
    title: "Introduction to Assembly Language Programming",
    author: "Ms. Kulbir Kaur",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 22,
    title: "Introduction to Assembly Language Programming",
    author: "Mr. Hardeep Singh",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 23,
    title: "Assembly Language Programming",
    author: "Ms. Tanika Thakur",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 24,
    title: "Assembly Language Programming",
    author: "Mr. Navdeep Randhawa",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 25,
    title: "Pin Diagram and Description of 8086 Microprocessor",
    author: "Ms. Yashu",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 26,
    title: "Pin Diagram and Description of 8086 Microprocessor",
    author: "Dr. Pertik Garg",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 27,
    title: "Minimum Mode Configuration of 8086 Microprocessor (Min Mode)",
    author: "Ms. Kiran Bala",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 28,
    title: "Minimum Mode Configuration of 8086 Microprocessor (Min Mode)",
    author: "Ms. Komal Dhiman",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 29,
    title: "Maximum Mode Configuration of 8086 Microprocessor (Max Mode)",
    author: "Mr. Ishant Premi",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 30,
    title: "Maximum Mode Configuration of 8086 Microprocessor (Max Mode)",
    author: "Ms. Tanika Thakur",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 31,
    title: "Bus Timings for Minimum Mode and Maximum Mode",
    author: "Ms. Komal Dhiman",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 32,
    title: "Bus Timings for Minimum Mode and Maximum Mode",
    author: "Mr. Ishant Premi",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 33,
    title: "Interrupts in 8086 Microprocessor",
    author: "Dr. Pertik Garg",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 34,
    title: "Interrupts in 8086 Microprocessor",
    author: "Ms. Vandana",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 35,
    title: "8254 - Programmable Timer/Counter",
    author: "Mr. Navdeep Randhawa",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 36,
    title: "8254 - Programmable Timer/Counter",
    author: "Mr. Manik Dhiman",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 37,
    title: "8259- Priority Interrupt Controller",
    author: "Mr. Hardeep Singh",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 38,
    title: "8259- Priority Interrupt Controller",
    author: "Ms. Roop Shikha",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 39,
    title: "Pin Configuration of 8259 PIC",
    author: "Mr. Harjinder Singh",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 40,
    title: "Pin Configuration of 8259 PIC",
    author: "Ms. Neha Garg",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 41,
    title: "8255 Microprocessor: Architecture and Working",
    author: "Ms. Saneha",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 42,
    title: "8255 Microprocessor: Architecture and Working",
    author: "Ms. Yukti Gupta",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 43,
    title: "Pin Diagram of 8255 PPI",
    author: "Mr. Vikas Zandu",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 44,
    title: "Pin Diagram of 8255 PPI",
    author: "Ms. Kulbir Kaur",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 45,
    title: "Keyboard/Display Controller- 8279",
    author: "Ms. Sujata Tondon",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 46,
    title: "Keyboard/Display Controller- 8279",
    author: "Ms. Komal Dhiman",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 47,
    title: "Interfacing 8279 with 8086 Processor",
    author: "Dr. Shashi Jawla",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 48,
    title: "Interfacing 8279 with 8086 Processor",
    author: "Mr. Manik Dhiman",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 49,
    title: "8086 Microprocessor Interfacing with DAC",
    author: "Dr. Indu Batra",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
  {
    srNo: 50,
    title: "8086 Microprocessor Interfacing with DAC",
    author: "Ms. Tanika Thakur",
    type: "Book Chapter",
    isbn: "978-93-87393-74-5",
  },
];

const infrastructure = [
  "Central Instrumentation Facility",
  "Innovation Prototyping Lab",
  "High Performance Computing Cluster",
];

const collaborations = ["Google", "DRDO", "Infosys", "TCS", "Wipro"];

const services = [
  {
    title: "IPR & Patent Support",
    description:
      "Support for ideation, filing, and protection of institutional innovations.",
    icon: FaBookOpen,
  },
  {
    title: "Industry Consultancy",
    description:
      "Consultancy support to solve practical industry problems through applied research.",
    icon: FaTools,
  },
  {
    title: "Conferences & Workshops",
    description:
      "Regular events that connect academia, industry, and emerging research themes.",
    icon: FaHandshake,
  },
];

export function ResearchPageComponent() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pb-40 lg:pt-40">
        <Image
          src="/assets/img/research.jpg"
          alt="Research at SVGOI"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className={`${containerClass} relative`}>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-white/80">
              <Link href="/" className="hover:text-[#f7941d] transition">
                Home
              </Link>{" "}
              / <span className="text-white">Research & Innovation</span>
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-white sm:mt-8">
              {hero.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/90 max-w-xl sm:mt-6 sm:text-lg">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links / Stats Section */}
      <section
        id="publications"
        className={`${sectionClass} ${containerClass}`}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group block rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-[#f7941d]/60 hover:shadow-sm sm:p-8"
            >
              <p className="text-4xl font-bold text-gray-900 sm:text-5xl">{item.value}</p>
              <h3 className="mt-2 text-lg font-semibold leading-tight text-gray-800 sm:mt-3 sm:text-xl">
                {item.label}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-[#f7941d] transition group-hover:gap-3 sm:mt-5">
                Explore
                <span aria-hidden="true">›</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* About Research Section */}
      <section className={`${sectionClass} ${containerClass}`}>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
            Research Vision
          </p>
          <h2
            className={`${headerSpacing} text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-5xl`}
          >
            About Research at SVGOI
          </h2>
          <p className="text-base font-semibold text-gray-700 sm:text-lg">
            A research ecosystem built for societal and industrial impact.
          </p>
          <p className="mt-6 text-base leading-relaxed text-gray-600">
            At our college, research is not just an academic requirement—it is a
            way of thinking, questioning, and innovating. We believe that true
            learning extends beyond textbooks, and we foster a culture where
            faculty and students collaborate to create practical, sustainable,
            and high-impact solutions for real-world challenges.
          </p>
        </div>
      </section>

      {/* Research Domains Section */}
      <section className={`${sectionClass} ${containerClass}`}>
        <div className="mb-8 lg:mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
            Research Areas
          </p>
          <h2
            className={`${headerSpacing} text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-5xl`}
          >
            Research Domains
          </h2>
          <p className="text-sm text-gray-700 sm:text-lg">
            Focused verticals that combine scientific rigor with real-world
            application.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {researchDomains.map((domain) => (
            <article
              key={domain.title}
              className="group rounded-2xl border border-gray-100 bg-white p-5 transition duration-300 hover:border-[#f7941d]/50 hover:bg-[#f7941d]/5 sm:p-8"
            >
              <domain.icon className="text-3xl text-[#f7941d] transition group-hover:scale-110" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {domain.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {domain.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* R&D Committee Section */}
      <section id="committee" className="bg-gray-50 py-10 sm:py-16 lg:py-24">
        <div className={containerClass}>
          <div className="mb-8 lg:mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
              Leadership
            </p>
            <h2
              className={`${headerSpacing} text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-5xl`}
            >
              R&D Committee
            </h2>
            <p className="text-sm text-gray-700 sm:text-lg">
              Leadership and members guiding the institute&apos;s research
              direction.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rdCommittee.map((member) => (
              <div
                key={member}
                className="flex items-center border border-gray-200 bg-white px-5 py-4 text-gray-900 shadow-sm"
              >
                <span className="mr-4 inline-flex h-10 w-10 shrink-0 items-center justify-center bg-[#f7941d]/10 text-sm font-semibold text-[#f7941d]">
                  R&D
                </span>
                <span className="text-base font-medium leading-snug">
                  {member}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovative Projects Section */}
      <section id="projects" className="bg-gray-900 py-10 sm:py-16 lg:py-24">
        <div className={containerClass}>
          <div className="mb-8 lg:mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
              Achievements
            </p>
            <h2
              className={`${headerSpacing} text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-5xl`}
            >
              Innovative Projects
            </h2>
            <p className="text-sm text-gray-300 sm:text-lg">
              Student and faculty innovations addressing practical and societal
              needs.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {innovativeProjects.map((project) => (
              <article
                key={project.title}
                className="group rounded-2xl border border-gray-700 bg-linear-to-br from-gray-800 to-gray-900 p-6 transition hover:border-[#f7941d]/50 hover:bg-linear-to-br hover:from-gray-800 hover:to-[#f7941d]/10"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-[#f7941d]">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Research Publications Section */}
      <section className={`${sectionClass} ${containerClass}`}>
        <div className="mb-8 lg:mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
            Scholarly Output
          </p>
          <h2
            className={`${headerSpacing} text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-5xl`}
          >
            Research Publications
          </h2>
          <p className="text-sm text-gray-700 sm:text-lg">
            Selected list of publications contributed by SVGOI researchers. The
            institute&apos;s total research output now stands at more than 1200
            research publications.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white ">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Title
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Author
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                    Year
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                    ISSN
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {publications.map((publication) => (
                  <tr
                    key={`${publication.title}-${publication.author}`}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-gray-700">
                      {publication.title}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {publication.author}
                    </td>
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                      {publication.year}
                    </td>
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                      {publication.issn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Patents Section */}
      <section id="patents" className={`${sectionClass} ${containerClass}`}>
        <div className="mb-8 lg:mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
            IP Portfolio
          </p>
          <h2
            className={`${headerSpacing} text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-5xl`}
          >
            Patents
          </h2>
          <p className="text-sm text-gray-700 sm:text-lg">
            87 patents filed and certification across engineering and technology
            domains.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {patents.map((patent) => (
            <article
              key={patent.applicationNo}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-[#f7941d]/50 "
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
                Ref: {patent.applicationNo}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-[#f7941d]">
                {patent.title}
              </h3>
            </article>
          ))}
        </div>
      </section>

      {/* Research Collaborations Section */}
      <section className={`${sectionClass} ${containerClass}`}>
        <div className="mb-8 lg:mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
            Partnerships
          </p>
          <h2
            className={`${headerSpacing} text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-5xl`}
          >
            Research Collaborations
          </h2>
          <p className="text-sm text-gray-700 sm:text-lg">
            Collaborative partnerships driving shared innovation outcomes.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          {collaborations.map((company) => (
            <p
              key={company}
              className="text-2xl font-semibold tracking-tight text-gray-400 transition duration-300 hover:text-[#f7941d]"
            >
              {company}
            </p>
          ))}
        </div>
      </section>

      {/* Infrastructure & Books Section */}
      <section id="books" className={`${sectionClass} ${containerClass}`}>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Infrastructure */}
          <div>
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
                Facilities
              </p>
              <h2 className="mt-2 text-xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                Infrastructure & Facilities
              </h2>
            </div>
            <p className="text-gray-700 mb-8">
              Core research infrastructure supporting advanced experimentation
              and prototyping.
            </p>
            <div className="space-y-4">
              {infrastructure.map((facility) => (
                <article
                  key={facility}
                  className="group rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#f7941d]/50 "
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#f7941d]">
                    {facility}
                  </h3>
                </article>
              ))}
            </div>
          </div>

          {/* Books & Chapters */}
          <div>
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
                Publications
              </p>
              <h2 className="mt-2 text-xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                Books & Edited Chapters
              </h2>
            </div>
            <p className="text-gray-700">
              <span className="font-semibold">{booksMeta.title}</span> (
              {booksMeta.year})
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
                  Books published
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">50+</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
                  Book chapters
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">1800+</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Total count:{" "}
              <span className="font-semibold text-gray-900">
                {booksMeta.total}
              </span>
            </p>

            {/* Top 6 books (from central data) */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {researchData.books.slice(0, 6).map((b, i) => (
                <div
                  key={`${b.isbn}-${i}`}
                  className="rounded-2xl border border-gray-200 bg-white p-4"
                >
                  <h4 className="text-sm font-semibold text-gray-900">
                    {b.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">{b.authors}</p>
                  <p className="mt-2 text-sm font-mono text-gray-500">
                    ISBN: {b.isbn}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white overflow-hidden">
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-gray-200 bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap w-10">
                        Sr.
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Title
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap min-w-32">
                        Author
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                        Type
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                        ISBN
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {booksAndChapters.map((book) => (
                      <tr
                        key={book.srNo}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 text-gray-700 font-medium">
                          {book.srNo}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {book.title}
                        </td>
                        <td className="px-4 py-3 text-gray-700 text-sm">
                          {book.author}
                        </td>
                        <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                          {book.type}
                        </td>
                        <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                          {book.isbn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Activities & Services Section */}
      <section className={`${sectionClass} ${containerClass}`}>
        <div className="mb-8 lg:mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f7941d]">
            Support Systems
          </p>
          <h2
            className={`${headerSpacing} text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-5xl`}
          >
            Research Activities & Services
          </h2>
          <p className="text-sm text-gray-700 sm:text-lg">
            Institutional support mechanisms that help ideas move from concept
            to impact.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-2xl border border-gray-100 bg-white p-5 transition duration-300 hover:border-[#f7941d]/50 hover:bg-[#f7941d]/5 sm:p-8"
            >
              <service.icon className="text-3xl text-[#f7941d] transition group-hover:scale-110" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-10 sm:py-16 lg:py-24">
        <div className={containerClass}>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              Shape Your Future with Us
            </h2>
            <p className="mt-4 text-base text-gray-300 max-w-2xl mx-auto sm:mt-6 sm:text-lg">
              Join a campus where research, innovation, and entrepreneurship are
              part of everyday learning.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 sm:mt-10">
              <a
                href="https://admission.sviet.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-[#f7941d] px-6 py-3 font-semibold text-black transition hover:bg-[#df850f] sm:px-8"
              >
                Apply Now
              </a>
              <a
                href="#projects"
                className="inline-block rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20 sm:px-8"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
