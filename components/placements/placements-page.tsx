import Image from "next/image";

import { FAQAccordion } from "@/components/placements/faq-accordion";
import { HiringPartners } from "@/components/placements/hiring-partners";
import { PlacementCardsMarqueeSection } from "@/components/placements/placement-cards-marquee-section";
import {
  PlacementSuccessBanner,
  PlacementSecondaryBanner,
} from "@/components/placements/placement-success-banner";
import { PlacementStudentSpeakSection } from "@/components/placements/placement-student-speak-section";
import { PlacementYearwiseTrendsSection } from "@/components/placements/placement-yearwise-trends-section";
import { PlacementsHeroSection } from "@/components/placements/placements-hero-section";
import { SectionHeader } from "@/components/placements/section-header";
import { SectionWrapper } from "@/components/placements/section-wrapper";
import { StatCard } from "@/components/placements/stat-card";
import { TrainingCurriculumSection } from "@/components/placements/training-curriculum-section";
import { DCATrainingPlacementSection } from "@/components/placements/dca-training-placement-section";
import { CorporateConnectSection } from "@/components/placements/corporate-connect-section";
import {
  getShowcaseCards,
  getFeaturedPlacements,
  getPlacementTrends,
  getHighlightBanner,
  getPlacementKeyStats,
  getOverallAveragePackage,
} from "@/lib/dal/placements";

export async function PlacementsPageComponent() {
  const [
    showcaseCards,
    featuredPlacements,
    trends,
    banner,
    keyStats,
    averagePackage,
  ] = await Promise.all([
    getShowcaseCards(),
    getFeaturedPlacements(2),
    getPlacementTrends(),
    getHighlightBanner(),
    getPlacementKeyStats(),
    getOverallAveragePackage(),
  ]);

  const FAQ_ITEMS = [
    {
      question: "What is the placement process?",
      answer:
        "The placement process includes company outreach, eligibility screening, pre-placement talks, tests, interviews, and final offer rollouts coordinated by the training and placement cell.",
    },
    {
      question: "Which companies visit campus?",
      answer:
        "SVGOI hosts recruiters from IT, consulting, manufacturing, banking, and service sectors, including national and multinational organizations.",
    },
    {
      question: "What is the average package?",
      answer: `The average package across the shared placement records is around Rs ${averagePackage} LPA, with higher packages depending on role, domain, and student performance.`,
    },
    {
      question: "Are internships provided?",
      answer:
        "Yes, students receive internship support through industry partnerships, live projects, and campus-connect initiatives across departments.",
    },
    {
      question: "How does training work?",
      answer:
        "Students undergo a structured training pipeline covering aptitude, coding and technical modules, communication, resume building, and mock interviews.",
    },
  ];

  return (
    <main className="overflow-x-hidden bg-white">
      <PlacementsHeroSection />

      <SectionWrapper
        aria-labelledby="key-placement-stats-heading"
        className="border-t border-gray-100 bg-gray-50"
      >
        <SectionHeader
          id="key-placement-stats-heading"
          title="Placement Achievements"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {keyStats.map((item) => (
            <StatCard key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
        <p className="mt-5 text-sm text-gray-600">
          Data reflects the placement records currently shared by the Training
          &amp; Placement Cell.
        </p>
      </SectionWrapper>

      <PlacementYearwiseTrendsSection trends={trends} />

      <SectionWrapper aria-labelledby="placements-overview-heading">
        <SectionHeader
          id="placements-overview-heading"
          title="Placements Overview"
          description="At SVGOI, placements are driven by a structured system designed to transform students into industry-ready professionals. The Training & Placement Department continuously works to bridge the gap between academic learning and real-world industry requirements."
        />

        <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600">
          Our approach focuses on practical exposure, continuous training, and
          strong corporate engagement. The current placement list spans 70
          student outcomes across 2022 to 2027.
        </p>

        <article className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-5 sm:p-6">
          <h3 className="text-xl font-bold text-gray-900">
            Training &amp; Placement Cell
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
            The Training &amp; Placement Cell at SVGOI actively collaborates
            with leading organizations across industries including IT,
            Manufacturing, Finance, Media, and Services.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
            Our objective is to make every student a 100% employable asset
            through continuous skill development, real-world exposure, and
            structured placement support - aligned with our vision of &quot;One
            Person One Job.&quot;
          </p>
        </article>

        <figure className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="relative h-64 w-full rounded-3xl sm:h-80 lg:h-96">
            <Image
              src="/assets/img/training_cell.jpeg"
              alt="Training and Placement Cell showcase"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
          <figcaption className="flex items-center justify-between gap-4 border-t border-gray-200 bg-white px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-gray-500 md:px-6">
            <span>Training &amp; Placement Cell</span>
            <span className="text-[#f7941d]">Industry-ready outcomes</span>
          </figcaption>
        </figure>
      </SectionWrapper>

      <PlacementSuccessBanner banner={banner} />

      <PlacementCardsMarqueeSection cards={showcaseCards} />

      <HiringPartners />

      <PlacementSecondaryBanner featuredPlacements={featuredPlacements} />

      <SectionWrapper
        aria-labelledby="director-message-heading"
        className="bg-[#F8FAFF]"
      >
        <SectionHeader
          id="director-message-heading"
          title="Leadership — Placements &amp; Corporate Affairs"
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* <article className="overflow-hidden rounded-3xl border border-[#DCE7FF] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] shadow-[0_8px_24px_rgba(30,42,120,0.06)]">
            <div className="relative h-64 bg-[#EEF4FF] sm:h-80 lg:h-96">
              <Image
                src="/assets/img/college/management/shubham-sir..jpg"
                alt="Mr. Shubham Garg, Director Placements"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">
                Director — Placements
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#111827] md:text-2xl">
                Mr. Shubham Garg
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#374151] md:text-base">
                Our goal is to provide strong placement opportunities and
                meaningful corporate exposure to students. Over the years, the
                Training &amp; Placement Cell has successfully connected
                students with reputed organizations across multiple industries.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#374151] md:text-base">
                We focus on building industry-ready professionals by aligning
                academic learning with practical skills, ensuring students are
                well-prepared to meet evolving career demands.
              </p>
            </div>
          </article> */}

          <article className="overflow-hidden rounded-3xl border border-[#DCE7FF] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] shadow-[0_8px_24px_rgba(30,42,120,0.06)]">
            <div className="relative h-64 bg-[#EEF4FF] sm:h-80 lg:h-96">
              <Image
                src="/assets/img/college/management/ankur-sir.jpg"
                alt="Mr. Ankur Gill, Director Operations"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">
                Director — Operations &amp; Corporate Partnership
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#111827] md:text-2xl">
                Mr. Ankur Gill
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#374151] md:text-base">
                Building strong corporate relationships is at the heart of
                SVGOI&apos;s placement success. Our corporate connect strategy
                actively engages with leading companies across India to open new
                doors for our students.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#374151] md:text-base">
                Through structured industry partnerships and operational
                excellence, we ensure every student receives the guidance and
                exposure needed to thrive in today&apos;s competitive workforce.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-[#DCE7FF] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] p-6 shadow-[0_8px_24px_rgba(30,42,120,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">
              Philosophy
            </p>
            <h3 className="mt-2 text-lg font-bold text-[#111827]">Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5563] md:text-base">
              Best Campus Experience, Best Placements, and Best Culture
            </p>
          </article>
          <article className="rounded-2xl border border-[#DCE7FF] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] p-6 shadow-[0_8px_24px_rgba(30,42,120,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">
              Philosophy
            </p>
            <h3 className="mt-2 text-lg font-bold text-[#111827]">Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5563] md:text-base">
              To strengthen industry connections, create meaningful placement
              opportunities, and provide holistic career guidance that prepares
              students for long-term professional success.
            </p>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="industrial-exposure-heading"
        className="bg-gray-50"
      >
        <SectionHeader
          id="industrial-exposure-heading"
          title="Industrial Exposure"
          description="SVGOI provides continuous industry exposure through visits, training programs, expert sessions, and live interactions with professionals. These initiatives help students understand real-world work environments and industry expectations."
        />

        <article className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-xl font-bold text-gray-900">
            Real-World Engagement
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
            Our strong industry connections ensure that students gain hands-on
            experience through placement drives, internships, and collaborative
            initiatives, transforming them into confident professionals ready
            for real-world challenges.
          </p>
        </article>

        <figure className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="relative h-64 w-full rounded-3xl sm:h-80 lg:h-96">
            <Image
              src="/assets/img/section_card/Industrial Visit.jpeg"
              alt="Students participating in industry exposure and placement activities"
              fill
              className="object-cover object-center"
            />
          </div>
          <figcaption className="flex items-center justify-between gap-4 border-t border-gray-200 bg-white px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-gray-500 md:px-6">
            <span>Industrial Exposure</span>
            <span className="text-[#f7941d]">Real-world engagement</span>
          </figcaption>
        </figure>
      </SectionWrapper>

      <DCATrainingPlacementSection />

      <CorporateConnectSection />

      <TrainingCurriculumSection />

      <PlacementStudentSpeakSection />

      <SectionWrapper
        aria-labelledby="placements-faq-heading"
        className="bg-gray-50"
      >
        <SectionHeader id="placements-faq-heading" title="FAQ" />
        <FAQAccordion items={FAQ_ITEMS} />
      </SectionWrapper>
    </main>
  );
}
