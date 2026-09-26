"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, X, ExternalLink } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 500, suffix: "+", label: "Students in Super 60" },
  { value: 15, suffix: "+", label: "Student Startups Supported" },
  { value: 100, suffix: "+", label: "Industry Mentors" },
  { value: 300, suffix: "+", label: "Placements via Initiatives" },
  { value: 3, suffix: "", label: "Active Communities" },
] as const;

const ECOSYSTEM_CARDS = [
  {
    num: "01",
    icon: "🚀",
    title: "Student Startups",
    description:
      "Early-stage ventures supported through mentoring and practical guidance.",
    badge: "15+ Supported",
  },
  {
    num: "02",
    icon: "🏢",
    title: "Live Startup Exposure (Godigitify)",
    description:
      "Students learn from real operating startup workflows and execution cycles.",
    badge: "LIVE",
  },
  {
    num: "03",
    icon: "🧪",
    title: "Workshops on MVP & Business Models",
    description:
      "Sessions focused on idea validation, product thinking, and market fit.",
    badge: "Regular",
  },
  {
    num: "04",
    icon: "📊",
    title: "Growth & Execution Learning",
    description:
      "Hands-on learning that builds consistency in strategy, delivery, and outcomes.",
    badge: "Ongoing",
  },
] as const;

const FOUNDER_PARAS = [
  "A distinguished instructional management specialist with over a decade of expertise across Academics, Research & Innovation, Administration, Business Strategy, Brand Management, and Corporate Relations.",
  "Ankur Gill is the proud Founder of UNIQUE ZONE — SVIET's pioneering on-campus IT incubation center — where student ideas are nurtured into real-world solutions.",
  "Under his transformative leadership, SVIET has built an ecosystem that empowers students to transcend conventional boundaries and turn aspirations into reality.",
] as const;

const FAQS = [
  {
    q: "Who can join The Uniques or Super 60?",
    a: "Any enrolled SVIET student can apply. Selection is based on an entrance test and interview process conducted each semester.",
  },
  {
    q: "Is there a separate entrance test for Super 60?",
    a: "Yes. SVIET conducts a Super 60 Entrance Test covering logical reasoning, quantitative aptitude, English proficiency, and basic programming. Duration: 90 minutes, 100 marks.",
  },
  {
    q: "Is there a Pharmacy-specific Super 60 batch?",
    a: "Yes! SVIET runs a dedicated Super 60 batch for Pharmacy students, tailored to healthcare and pharma industry readiness.",
  },
  {
    q: "What is UNIQUE ZONE?",
    a: "UNIQUE ZONE is SVIET's on-campus IT incubation center — India's first such center within a college campus — founded by Ankur Gill to help students build real startups.",
  },
  {
    q: "How is Super 60 different from regular academics?",
    a: "Super 60 goes far beyond the syllabus — with industry tools, personality development, aptitude training, and project-based learning that directly prepares students for top placements.",
  },
  {
    q: "Can I be part of both The Uniques and Super 60?",
    a: "Students are generally placed in one initiative based on their interests and assessment results. Faculty advisors can guide you on the best fit.",
  },
] as const;

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

// ─── ATOMS ────────────────────────────────────────────────────────────────────

function StatItem({
  value,
  suffix,
  label,
  animate,
}: {
  value: number;
  suffix: string;
  label: string;
  animate: boolean;
}) {
  const count = useCountUp(value, 1800, animate);
  return (
    <div className="text-center">
      <p className="text-4xl font-black text-white md:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-white/70 md:text-base">
        {label}
      </p>
    </div>
  );
}

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E5E7EB]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-semibold text-[#111827] md:text-base">
          {q}
        </span>
        <ChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-[#f7941d] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`overflow-hidden text-sm leading-relaxed text-[#4B5563] transition-all duration-300 ${
          open ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {a}
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export function OurInitiativesPage() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsInView(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#faf7f1] text-[#101828]">
      {bannerVisible && (
        <div className="relative overflow-hidden border-b border-[#d9cfbe] bg-[#fff4e6] px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#8a4f08] md:text-sm">
          <span className="mr-2 inline-flex h-2 w-2 align-middle bg-[#f7941d]" />
          Admissions Open 2026 —{" "}
          <a
            href="https://admission.sviet.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-[#003087]"
          >
            Apply Now
          </a>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a4f08] transition-colors hover:text-[#003087]"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <section className="relative overflow-hidden border-b border-[#1c1c1c] bg-[#070707] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_30%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-[linear-gradient(90deg,transparent_0%,rgba(247,148,29,0.7)_50%,transparent_100%)] opacity-80 blur-sm" />
        <div className="pointer-events-none absolute -left-24 -bottom-30 h-95 w-95 rounded-full bg-[#f7941d]/35 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 -bottom-30 h-95 w-95 rounded-full bg-[#f7941d]/35 blur-[120px]" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center md:px-6 md:py-24 lg:py-28">
          <div className="mb-6 border border-white/20 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">
            Our Initiatives
          </div>
          <p className="mb-4 text-sm font-medium text-white/60 md:text-base">
            Curated student initiatives for innovation and career growth
          </p>
          <h1 className="max-w-5xl text-[clamp(3.2rem,8vw,7rem)] font-black leading-[0.92] tracking-[-0.06em] text-white">
            Innovation
            <br />
            <span className="text-[#f7941d]">Entrepreneurship</span>
            <br />
            Student Leadership
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
            From live startup exposure to elite performance batches —
            SVIET&apos;s flagship student initiatives are designed to transform
            learners into leaders, consultants, and changemakers.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.theuniques.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#f7941d] bg-[#f7941d] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_45px_rgba(247,148,29,0.28)] transition hover:-translate-y-0.5 hover:bg-[#e78313]"
            >
              Explore The Uniques
            </a>
            <a
              href="https://www.supersixty.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 bg-transparent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Discover Super 60
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-white/65">
            <div className="flex -space-x-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <span
                  key={index}
                  className="h-8 w-8 border border-white/20 bg-[linear-gradient(135deg,#c7c7c7,#7a7a7a)]"
                />
              ))}
            </div>
            <span>500+ happy students in the program</span>
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf9] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#f7941d]">
                What We Offer
              </p>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#101828] md:text-5xl">
                Where ideas become ventures
              </h3>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#475467] md:text-lg">
                SVIET&apos;s student initiatives are built to bridge the gap
                between academic learning and the demands of startups,
                industries, and modern professional life.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-[#e4d7c6] bg-white px-5 py-4 shadow-[0_12px_28px_rgba(16,24,40,0.05)]"
                  >
                    <p className="text-3xl font-black text-[#003087]">
                      {stat.value}
                      {stat.suffix}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#475467]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <article className="overflow-hidden border border-[#e4d7c6] bg-white shadow-[0_18px_42px_rgba(16,24,40,0.06)]">
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex border border-[#d8e4ff] bg-[#eff4ff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#003087]">
                          U-Zone
                        </span>
                        <h3 className="mt-4 text-2xl font-black leading-tight text-[#101828] md:text-3xl">
                          Corporate in Campus
                        </h3>
                      </div>
                      <span className="shrink-0 border border-[#d7f3de] bg-[#effaf2] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#116b2b]">
                        Active Initiative
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#475467] md:text-base">
                      The Uniques is SVIET&apos;s flagship student-driven
                      initiative that bridges the gap between college and
                      corporate life. Students work on live startup problems,
                      develop business acumen, and build the mindset of future
                      consultants and entrepreneurs.
                    </p>
                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      {[
                        "Business Strategy & Execution",
                        "Startup & Consulting Exposure",
                        "Communication & Leadership",
                        "Real-World Problem Solving",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-sm text-[#344054]"
                        >
                          <span className="text-[#003087]" aria-hidden="true">
                            ✅
                          </span>
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-[#98a2b3]">
                      📸 @theuniquesofficial
                    </p>
                    <div className="mt-6">
                      <a
                        href="https://www.theuniques.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-[#003087] bg-[#003087] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#01256b]"
                      >
                        Learn More
                        <ExternalLink
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="relative min-h-65 border-t border-[#e4d7c6] lg:border-l lg:border-t-0">
                    <Image
                      src="/assets/img/banner/uniq11.jpg"
                      alt="The Uniques"
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>

              <article className="overflow-hidden border border-[#e4d7c6] bg-white shadow-[0_18px_42px_rgba(16,24,40,0.06)]">
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex border border-[#fde7b3] bg-[#fff8e8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8a4f08]">
                          S-Zone
                        </span>
                        <h3 className="mt-4 text-2xl font-black leading-tight text-[#101828] md:text-3xl">
                          A Community of Visionaries, Creators &amp; Leaders
                        </h3>
                      </div>
                      <span className="shrink-0 border border-[#fde7b3] bg-[#fff8e8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8a4f08]">
                        Elite Batch
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#475467] md:text-base">
                      Super 60 is SVIET&apos;s elite performance batch — a
                      high-intensity program designed for students who want to
                      go beyond the syllabus. With advanced technical training,
                      aptitude building, personality development, and
                      industry-level projects, Super 60 students are primed for
                      top placements and leadership roles.
                    </p>
                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      {[
                        "Advanced Technical Training",
                        "Quantitative & Logical Reasoning",
                        "Communication & Personality Dev",
                        "Industry-Level Tools & Projects",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-sm text-[#344054]"
                        >
                          <span className="text-[#f7941d]" aria-hidden="true">
                            ✅
                          </span>
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-[#98a2b3]">
                      📸 @super60official
                    </p>
                    <div className="mt-6">
                      <a
                        href="https://www.supersixty.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-[#f7941d] bg-[#f7941d] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#d77c10]"
                      >
                        Explore Super 60
                        <ExternalLink
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="relative min-h-65 border-t border-[#e4d7c6] lg:border-l lg:border-t-0">
                    <Image
                      src="/assets/img/banner/s60.jpeg"
                      alt="Super 60"
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>

              <article className="flex flex-col gap-6 border border-[#e4d7c6] bg-white p-6 shadow-[0_18px_42px_rgba(16,24,40,0.06)] md:flex-row md:items-center md:p-8">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex border border-[#d8eee9] bg-[#effaf8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0f766e]">
                      Special Batch
                    </span>
                    <span className="inline-flex border border-[#d8eee9] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f766e]">
                      Pharmacy Exclusive
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-black text-[#101828] md:text-2xl">
                    Pharmacy Super 60
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#475467]">
                    A dedicated Super 60 cohort designed exclusively for
                    Pharmacy students — combining core pharmaceutical knowledge
                    with aptitude building, communication skills, and industry
                    readiness for careers in healthcare and pharma sectors.
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 md:w-90 md:shrink-0">
                  {[
                    "Pharma-Specific Skill Building",
                    "Aptitude & Reasoning",
                    "Industry Readiness",
                    "Communication Skills",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-[#344054]"
                    >
                      <span className="text-[#0f766e]" aria-hidden="true">
                        ✅
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={statsRef}
        className="border-y border-[#e4d7c6] bg-[#003087] py-14 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#f7941d]">
              Impact at a Glance
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-5">
            {STATS.map((s) => (
              <StatItem
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                animate={statsInView}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf9] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#f7941d]">
              Startup Ecosystem
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#101828] md:text-5xl">
              Where ideas become ventures.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#475467] md:text-lg">
              SVIET fosters a culture of innovation through hands-on startup
              exposure and incubation at UNIQUE ZONE — India&apos;s pioneering
              on-campus IT incubation center.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {ECOSYSTEM_CARDS.map((card) => (
              <article
                key={card.title}
                className="flex flex-col gap-3 border border-[#e4d7c6] bg-white p-6 shadow-[0_12px_30px_rgba(16,24,40,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(16,24,40,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl" aria-hidden="true">
                    {card.icon}
                  </span>
                  <span className="border border-[#d8e4ff] bg-[#eff4ff] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#003087]">
                    {card.badge}
                  </span>
                </div>
                <p className="text-xs font-bold tracking-[0.24em] text-[#98a2b3]">
                  {card.num}
                </p>
                <h3 className="text-base font-bold leading-snug text-[#101828]">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#475467]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 border border-[#f0d7b0] bg-[#fff3e1] px-6 py-7 text-center shadow-[0_12px_30px_rgba(16,24,40,0.04)]">
            <p className="text-lg font-bold italic text-[#8a4f08] md:text-2xl">
              &ldquo;Students don&apos;t just learn entrepreneurship — they
              experience it.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ee_100%)] py-16 md:py-24">
        <div className="our-initiatives-founder-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#f7941d]">
              Our Founder
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-[#101828] md:text-5xl">
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
                <p className="text-2xl font-black text-[#101828] md:text-3xl">
                  Ankur Gill
                </p>
                <p className="mt-1 text-sm font-semibold text-[#f7941d]">
                  Director of Operations | Founder, UNIQUE ZONE
                </p>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-[#475467] md:text-base">
                {FOUNDER_PARAS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="border-l-4 border-[#f7941d] bg-[#fff7ef] px-4 py-3">
                <p className="text-sm font-semibold text-[#101828]">
                  Director of Operations | Ankur Gill | Founder, UNIQUE ZONE
                </p>
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

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#f7941d]">
                Success Story
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-[#101828] md:text-5xl">
                From Classroom
                <br />
                <span className="text-[#003087]">
                  to Confident Professional
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#475467] md:text-lg">
                Here&apos;s how our students transformed their skills and
                careers through SVIET&apos;s flagship initiatives.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: "🎯", label: "Hands-on Learning" },
                  { icon: "🌐", label: "Community Support" },
                  { icon: "🧑‍🏫", label: "Expert Mentors" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2 border border-[#e4d7c6] bg-[#fffaf3] p-4 text-center shadow-[0_12px_28px_rgba(16,24,40,0.04)]"
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#344054]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#e4d7c6] bg-[#fffaf3] p-6 shadow-[0_18px_42px_rgba(16,24,40,0.06)] md:p-8">
              <p className="font-serif text-5xl leading-none text-[#f7941d]">
                &ldquo;
              </p>
              <blockquote className="mt-2 text-base leading-relaxed text-[#344054] md:text-lg">
                Being part of The Uniques changed everything. I went from having
                no idea about the corporate world to confidently landing my
                placement at a top tech company. The live startup exposure and
                mentorship were unlike anything I&apos;d experienced in class.
              </blockquote>
              <div className="mt-6 flex items-center gap-4 border-t border-[#e4d7c6] pt-5">
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#003087] bg-[#003087] text-lg font-bold text-white"
                >
                  P
                </div>
                <div>
                  <p className="font-bold text-[#101828]">Priya Sharma</p>
                  <p className="text-sm text-[#667085]">
                    B.Tech CSE, The Uniques Batch 2024
                  </p>
                  <p
                    className="mt-0.5 text-sm text-[#f7941d]"
                    aria-label="5 stars"
                  >
                    ★★★★★
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf9] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#f7941d]">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#101828] md:text-5xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#475467]">
                Everything you need to know about SVIET&apos;s student
                initiatives.
              </p>
            </div>

            <div className="border border-[#e4d7c6] bg-white px-4 md:px-6">
              {FAQS.map((faq, index) => (
                <FaqItem
                  key={faq.q}
                  q={faq.q}
                  a={faq.a}
                  open={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff4e6_0%,#ffffff_100%)] py-20 md:py-28">
        <div className="our-initiatives-cta-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#f7941d]">
            Take Action
          </p>
          <h2 className="mt-5 text-4xl font-black leading-tight tracking-tighter text-[#101828] md:text-6xl">
            Start Your Journey
            <br />
            at SVIET Today
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#475467] md:text-lg">
            Join thousands of students who chose to go beyond — through The
            Uniques, Super 60, and SVIET&apos;s innovation ecosystem.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://admission.sviet.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#f7941d] bg-[#f7941d] px-8 py-4 text-base font-bold text-white transition hover:bg-[#d77c10]"
            >
              Apply Now →
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-2 border border-[#003087] px-8 py-4 text-base font-bold text-[#003087] transition hover:bg-[#003087] hover:text-white"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
