import type { Leader } from "@/components/about/leader-card";
import Image from "next/image";
import { LeadershipCarousel } from "@/components/about/leadership-carousel";
import { InfoCard } from "@/components/about/info-card";
import { SectionHeader } from "@/components/about/section-header";
import { SectionWrapper } from "@/components/about/section-wrapper";

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
    imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445217/sviet_assets/college/management/ashwani-sir.jpg",
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
  //   imageSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445215/sviet_assets/college/management/sahil-sir.jpg",
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
      "As the Director of Operations at Swami Vivekanand Institute of Engineering and Technology, I am deeply committed to excellence, innovation, and growth.",
    messageParagraphs: [
      "As the Director of Operations at Swami Vivekanand Institute of Engineering and Technology, I am deeply committed to fostering an environment of excellence, innovation, and growth within our institution.",
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

const LEADERSHIP_PRIORITIES = [
  {
    title: "Student-Centered Direction",
    description:
      "Institutional decisions are shaped around student growth, real-world readiness, and long-term professional confidence.",
  },
  {
    title: "Quality and Academic Governance",
    description:
      "Leadership continuously strengthens curriculum delivery, learning standards, and academic accountability.",
  },
  {
    title: "Innovation and Institutional Progress",
    description:
      "Strategic planning supports innovation-led initiatives, interdisciplinary development, and future-focused education.",
  },
  {
    title: "Industry and Ecosystem Engagement",
    description:
      "Active industry and institutional collaborations improve exposure, practical relevance, and career pathways for students.",
  },
];

export function LeadershipPage() {
  return (
    <main className="">
      <SectionWrapper
        aria-labelledby="leadership-hero-heading"
        className="relative overflow-hidden border-b border-[#E5E7EB] bg-white py-0"
        containerClassName="max-w-none px-0"
      >
        <h1 id="leadership-hero-heading" className="sr-only">
          Leadership
        </h1>
        <div className="relative mt-20 left-1/2 w-screen -translate-x-1/2 overflow-hidden">
          <div className="relative aspect-5/2 w-full">
            <Image
              src="https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443529/sviet_assets/banner/leadership.jpg"
              alt="SVGOI leadership banner"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="leadership-priority-heading"
        className="bg-[#F8FAFF]"
      >
        <SectionHeader
          id="leadership-priority-heading"
          eyebrow="Leadership Focus"
          title="How Leadership Translates Vision Into Outcomes"
          description="The leadership model at SVGOI connects policy, academic quality, and institutional planning with measurable student outcomes."
          className="mb-8"
          titleClassName="text-[#000000]"
          descriptionClassName="text-[#4B5563]"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {LEADERSHIP_PRIORITIES.map((item) => (
            <InfoCard
              key={item.title}
              title={item.title}
              description={item.description}
              className="border-[#DBEAFE]"
            />
          ))}
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
    </main>
  );
}
