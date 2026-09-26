"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  isDecimal?: boolean;
}

const STATS: Stat[] = [
  {
    value: 2200,
    suffix: "+",
    label: "Recruiting Companies",
    sublabel: "hired SVGOI students",
  },
  {
    value: 60,
    suffix: " LPA",
    label: "Highest Package",
    sublabel: "offered to our students",
  },
  {
    value: 5.8,
    suffix: " LPA",
    label: "Average Package",
    sublabel: "consistent year-on-year growth",
    isDecimal: true,
  },
  {
    value: 95,
    suffix: "%+",
    label: "Placement Rate",
    sublabel: "students placed every year",
  },
];

function useCountUp(
  target: number,
  duration = 2200,
  isDecimal = false,
  triggered = false,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, isDecimal, triggered]);

  return count;
}

function StatItem({ stat, triggered }: { stat: Stat; triggered: boolean }) {
  const count = useCountUp(stat.value, 2200, stat.isDecimal, triggered);
  const display = stat.isDecimal
    ? count.toFixed(1)
    : count >= 1000
      ? count.toLocaleString()
      : String(count);

  return (
    <div className="flex flex-1 flex-col gap-3 border-t-2 border-[#f7941d] pt-6">
      <p className="text-4xl font-black text-[#111827] md:text-5xl lg:text-6xl">
        {display}
        {stat.suffix}
      </p>
      <div>
        <p className="text-sm font-bold text-[#111827] md:text-base">
          {stat.label}
        </p>
        <p className="mt-0.5 text-sm text-[#6b7280]">{stat.sublabel}</p>
      </div>
    </div>
  );
}

export function PlacementStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Top row: left label+image / right headline */}
        <div className="grid gap-10 md:grid-cols-[260px_1fr] md:gap-16">
          {/* Left — label + image */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#f7941d]">
                PLACEMENTS
              </p>
              <div className="mt-1.5 h-[3px] w-14 bg-[#f7941d]" />
            </div>
            {/* Image fills the rest of the left column */}
            {/* <div className="relative h-56 w-full overflow-hidden md:h-72">
              <Image
                src="/assets/img/banner/s60.jpeg"
                alt="SVGOI placement achievement — 60 LPA"
                fill
                sizes="(max-width: 768px) 100vw, 260px"
                className="object-cover object-center"
              />
              
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-2xl font-black text-white">₹60 LPA</p>
                <p className="text-sm font-semibold text-[#f7941d]">
                  Highest Package 2026
                </p>
              </div>
            </div> */}
          </div>

          {/* Right — headline + description */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold leading-tight text-[#111827] md:text-5xl lg:text-6xl">
              Explore the Top Recruiters
            </h2>
            <h3 className="mt-1 text-3xl font-light text-[#374151] md:text-4xl lg:text-5xl">
              who choose SVGOI talent
            </h3>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#6b7280] md:text-base">
              SVGOI delivers top placements with packages up to ₹60&nbsp;LPA,
              backed by 2,200+ recruiting companies including Amazon, TCS,
              Infosys, Wipro, and Deloitte — combined with rigorous
              career-focused training that prepares students from day one.
            </p>
          </div>
        </div>

        {/* Stats row — full width */}
        <div className="mt-14 flex flex-wrap gap-8 md:flex-nowrap md:gap-0 md:divide-x md:divide-gray-200">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 px-0 md:px-10 first:md:pl-0 last:md:pr-0"
            >
              <StatItem stat={stat} triggered={triggered} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
