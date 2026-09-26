"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, ArrowUpRight } from "lucide-react";

const CAMPUS_TABS = [
  { label: "Student Welfare", targetId: "campus-student-welfare" },
  { label: "Events At SVGOI", targetId: "campus-events" },
  { label: "Student Clubs", targetId: "campus-student-clubs" },
  { label: "Campus Festivals", targetId: "campus-festivals" },
  { label: "Bollywood At SVGOI", targetId: "campus-bollywood" },
  { label: "SVGOI Hangouts", targetId: "campus-hangouts" },
  { label: "Convocation", targetId: "campus-convocation" },
] as const;

const TAB_TARGET_IDS = CAMPUS_TABS.map((tab) => tab.targetId);

const isTabTargetId = (
  value: string,
): value is (typeof TAB_TARGET_IDS)[number] =>
  TAB_TARGET_IDS.includes(value as (typeof TAB_TARGET_IDS)[number]);

const RELATED_LINKS = [
  {
    title: "Master's programs",
    description: "Degrees to pursue after graduation",
    href: "/programs",
  },
  {
    title: "Bachelor programs",
    description: "What you can study after 12th",
    href: "/programs",
  },
] as const;

export function CampusLifeQuickLinksSection() {
  const [activeTabId, setActiveTabId] = useState<string>(
    CAMPUS_TABS[0].targetId,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const targets = TAB_TARGET_IDS.map((id) =>
      document.getElementById(id),
    ).filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) {
      return;
    }

    const maybeSetActiveTab = (nextId: string) => {
      setActiveTabId((currentId) =>
        currentId === nextId ? currentId : nextId,
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          maybeSetActiveTab(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    const syncFromHash = () => {
      const hashId = window.location.hash.replace("#", "");
      if (hashId && isTabTargetId(hashId)) {
        maybeSetActiveTab(hashId);
      }
    };

    const syncFromScrollPosition = () => {
      const isAtPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (isAtPageBottom) {
        maybeSetActiveTab(TAB_TARGET_IDS[TAB_TARGET_IDS.length - 1]);
      }
    };

    targets.forEach((target) => observer.observe(target));
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("scroll", syncFromScrollPosition, {
      passive: true,
    });

    syncFromHash();
    syncFromScrollPosition();

    return () => {
      targets.forEach((target) => observer.unobserve(target));
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("scroll", syncFromScrollPosition);
    };
  }, []);

  const handleTabClick = (targetId: string) => {
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    setActiveTabId(targetId);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${targetId}`);
  };

  return (
    <section className="w-full bg-[#f7f7f9]">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-12">
        <p className="flex items-center gap-2 text-sm font-semibold text-[#1f1f1f]">
          <span className="text-[#1ca1b8]">▸</span>
          Related links
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {RELATED_LINKS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-start justify-between rounded-xl border border-[#d8d8de] bg-white px-5 py-4 transition hover:border-[#b6b6c8]"
            >
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-5 w-5 text-[#6f47d9]" />
                <div>
                  <h3 className="text-base font-semibold text-[#1a1a1a]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#5a5a67]">
                    {item.description}
                  </p>
                </div>
              </div>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#efefff] text-[#6f47d9] transition group-hover:bg-[#6f47d9] group-hover:text-white">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
