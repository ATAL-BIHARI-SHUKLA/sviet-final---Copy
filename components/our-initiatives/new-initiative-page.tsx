"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Users,
  HeartHandshake,
  UserCheck,
  Handshake,
} from "lucide-react";

const FEATURE_TABS = [
  "Industry Exposure",
  "Startup Support",
  "Mentorship Network",
  "Career Growth",
] as const;

const FOUNDER_PARAS = [
  "A distinguished instructional management specialist with over a decade of expertise across Academics, Research & Innovation, Administration, Business Strategy, Brand Management, and Corporate Relations.",
  "Ankur Gill is the proud Founder of UNIQUE ZONE — SVIET's pioneering on-campus IT incubation center — where student ideas are nurtured into real-world solutions.",
  "Under his transformative leadership, SVIET has built an ecosystem that empowers students to transcend conventional boundaries and turn aspirations into reality.",
] as const;
const FAQS = [
  "What prior experience do I need to join this initiative?",
  "How long does it take to complete the program?",
  "Is this suitable for beginners and advanced students?",
  "Can I access the content on mobile or tablet?",
  "What if I need help while exploring the initiative?",
  "Is there a support policy if I am not satisfied?",
] as const;

function AccordionItem({
  question,
  open,
  onToggle,
}: {
  question: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between border-b border-[#E5E7EB] px-4 py-5 text-left transition hover:bg-[#FFF9F2]"
    >
      <span className="pr-4 text-sm font-medium text-[#111827] md:text-base">
        {question}
      </span>
      <ChevronDown
        className={`h-4 w-4 shrink-0 text-[#f7941d] transition-transform duration-300 ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`text-[11px] font-bold uppercase tracking-[0.45em] ${light ? "text-[#F8C07A]" : "text-[#f7941d]"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-medium tracking-tighter md:text-5xl ${light ? "text-white" : "text-[#101828]"}`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 max-w-2xl text-sm leading-relaxed md:text-base ${light ? "text-white/70" : "text-[#475467]"}`}
      >
        {description}
      </p>
    </div>
  );
}

export function NewInitiativePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className=" text-foreground">
      <section className="w-full pt-2 md:pt-3">
        <div className="w-full overflow-hidden rounded-[15px]">
          <Image
            src="/assets/img/banner/uniq11.jpg"
            alt="Our Initiatives"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            priority
          />
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#374151]">
                About Our Community
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-[#111827] md:text-5xl">
                The <span className="text-[#8B1A1A]">Uniques</span> Community –
                Learn, Build, and Grow Together
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#374151] md:text-lg">
                The Uniques Community is a community where everyone is welcome.
                We help students bridge the gap between theory and practice and
                grow their knowledge by providing a peer-to-peer learning
                environment, conducting workshops, organizing study jams, and
                building solutions for local businesses.
              </p>
            </div>

            <div className="relative h-72 overflow-hidden rounded-2xl md:h-96 lg:h-120">
              <Image
                src="/assets/img/infrastructure/labs/the_unique.jpg"
                alt="The Uniques Community"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h3 className="mt-14 text-2xl font-medium text-[#111827] md:text-3xl">
            Our Main Focus
          </h3>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A]">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827]">
                  Community Engagement
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                  Bringing people together through events, discussions, and
                  support.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A]">
                <HeartHandshake className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827]">
                  Volunteer Programs
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                  Join hands to make a difference with impactful volunteer
                  initiatives.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A]">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827]">
                  Inclusive Environment
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                  Creating a welcoming space for everyone, regardless of
                  background.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A]">
                <Handshake className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827]">
                  Collaboration Opportunities
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                  Partner with others to drive meaningful change in the
                  community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-[#8B1A1A]">
              How We Work
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tighter text-[#101828] md:text-5xl">
              Our Working Model
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#667085] md:text-base">
              At The Uniques, we bridge the gap between theory and practice
              through a structured learning approach.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <div className="border border-[#E5E7EB] bg-white p-5 shadow-[0_12px_36px_rgba(16,24,40,0.05)] md:p-6">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F8F7F3] text-sm font-bold text-[#101828]">
                    1
                  </span>

                  <h3 className="mt-2 text-xl font-medium text-[#101828] md:text-2xl">
                    Learn from Industry Experts
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#667085]">
                    Engage with professionals through workshops and seminars to
                    gain real-world insights and knowledge.
                  </p>
                  <div className="mt-5 h-px bg-[#E5E7EB]" />
                  <p className="mt-5 text-sm font-bold text-[#101828]">
                    What you gain
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#667085]">
                    Industry connections, practical frameworks, and exposure to
                    how real organizations solve real problems.
                  </p>
                </div>
                <Image
                  src="/assets/img/infrastructure/labs/lab2.jpg"
                  alt="Learn from Industry Experts"
                  width={400}
                  height={300}
                  className="mt-4 w-full rounded-lg"
                />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="border border-[#E5E7EB] bg-white p-5 shadow-[0_12px_36px_rgba(16,24,40,0.05)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F8F7F3] text-xs font-bold text-[#101828]">
                    2
                  </span>
                  <p className="text-base font-bold text-[#101828]">
                    Peer-to-Peer Learning
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#667085]">
                  Collaborate with peers across different batches, fostering a
                  community of shared learning and growth.
                </p>
              </div>
              <div className="border border-[#E5E7EB] bg-white p-5 shadow-[0_12px_36px_rgba(16,24,40,0.05)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F8F7F3] text-xs font-bold text-[#101828]">
                    3
                  </span>
                  <p className="text-base font-bold text-[#101828]">
                    Apply Knowledge Practically
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#667085]">
                  Implement your learning through live projects and real-world
                  applications, bridging the gap between theory and practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ee_100%)] py-16 md:py-24">
        <div className="our-initiatives-founder-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#8B1A1A]">
              Our Founder
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tighter text-[#101828] md:text-5xl">
              Visionary Leadership,{" "}
              <span className="text-[#003087]">Inspiring Generations</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
            <div className="overflow-hidden border border-[#e4d7c6] bg-white shadow-[0_18px_42px_rgba(16,24,40,0.08)]">
              <div className="relative aspect-4/5 w-full">
                <Image
                  src="/assets/img/college/management/ankur-sir.jpg"
                  alt="Ankur Gill — Director of Operations, Founder UNIQUE ZONE"
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-5">
              <div>
                <p className="text-2xl font-medium text-[#101828] md:text-3xl">
                  Ankur Gill
                </p>
                <p className="mt-1 text-sm font-semibold text-[#8B1A1A]">
                  Director of Operations
                </p>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-[#475467] md:text-base">
                {FOUNDER_PARAS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <a
                href="https://www.theuniques.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 border border-[#003087] bg-[#003087] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#01256b]"
              >
                Join the Community →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F6F6] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-[#8B1A1A]">
              Gallery
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tighter text-[#101828] md:text-5xl">
              Moments That Define Us
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
            {/* Left column — 2 stacked */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="group relative h-52 overflow-hidden border border-[#E4DED4] md:h-64">
                <Image
                  src="/assets/img/uniques/32.JPG"
                  alt="The Uniques community"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
              </div>
              <div className="group relative h-52 overflow-hidden border border-[#E4DED4] md:h-64">
                <Image
                  src="/assets/img/uniques/IMG_1412.JPG"
                  alt="The Uniques session"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
              </div>
            </div>

            {/* Center column — tall */}
            <div className="group relative row-span-2 min-h-105 overflow-hidden border border-[#E4DED4]">
              <Image
                src="/assets/img/uniques/Screenshot 2025-03-28 001048.png"
                alt="The Uniques event"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
            </div>

            {/* Right column — 2 stacked */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="group relative h-52 overflow-hidden border border-[#E4DED4] md:h-64">
                <Image
                  src="/assets/img/uniques/Screenshot 2025-03-28 001431.png"
                  alt="The Uniques workshop"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
              </div>
              <div className="group relative h-52 overflow-hidden border border-[#E4DED4] md:h-64">
                <Image
                  src="/assets/img/uniques/Screenshot 2025-03-28 001908.png"
                  alt="The Uniques members"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
