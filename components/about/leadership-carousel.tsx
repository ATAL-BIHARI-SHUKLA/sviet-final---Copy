"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaGlobe,
  FaLinkedinIn,
} from "react-icons/fa";

import { cn } from "@/lib/utils";

import { type Leader, LeaderCard } from "@/components/about/leader-card";

type LeadershipCarouselProps = {
  leaders: Leader[];
  className?: string;
};

export function LeadershipCarousel({
  leaders,
  className,
}: LeadershipCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const normalizedActiveIndex =
    leaders.length === 0 ? 0 : activeIndex % leaders.length;

  const pathname = usePathname();

  useEffect(() => {
    // Only auto-scroll the thumbnail into view when on the dedicated
    // leadership page. When this carousel appears on other pages (for
    // example the Overview page) we should not force the browser to
    // jump to the carousel section.
    if (pathname !== "/about/leadership") {
      return;
    }

    const container = thumbnailStripRef.current;
    if (!container) {
      return;
    }

    const activeThumbnail = container.querySelector<HTMLButtonElement>(
      `[data-leader-index="${normalizedActiveIndex}"]`,
    );
    activeThumbnail?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [normalizedActiveIndex, pathname]);

  const moveBy = (delta: number) => {
    setActiveIndex((previous) => {
      if (leaders.length === 0) {
        return 0;
      }

      return (previous + delta + leaders.length) % leaders.length;
    });
  };

  if (leaders.length === 0) {
    return null;
  }

  const activeLeader = leaders[normalizedActiveIndex];
  const messageParagraphs = activeLeader.messageParagraphs?.length
    ? activeLeader.messageParagraphs
    : [activeLeader.description];
  const socialLinks = activeLeader.socialLinks ?? [];

  const getSocialIcon = (label: string) => {
    const normalizedLabel = label.trim().toLowerCase();

    if (normalizedLabel === "facebook") {
      return <FaFacebookF aria-hidden="true" className="h-3.5 w-3.5" />;
    }

    if (normalizedLabel === "linkedin") {
      return <FaLinkedinIn aria-hidden="true" className="h-3.5 w-3.5" />;
    }

    return <FaGlobe aria-hidden="true" className="h-3.5 w-3.5" />;
  };

  return (
    <div className={cn("space-y-6", className)}>
      <article className="border border-white/25  text-white shadow-[0_18px_30px_rgba(2,6,23,0.35)]">
        <div className="grid lg:grid-cols-[1.05fr_1.95fr]">
          <div className="relative min-h-72 border-b border-white/20 lg:min-h-full lg:border-b-0 lg:border-r lg:border-white/20">
            <Image
              src={activeLeader.imageSrc}
              alt={activeLeader.imageAlt ?? activeLeader.name}
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover object-top"
            />
          </div>

          <div
            id="active-management-card"
            className="p-6 sm:p-7 md:py-8 md:pl-8 md:pr-12 xl:pr-16"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl font-bold md:text-4xl">
                  {activeLeader.name}
                </h3>
                <p className="mt-2 text-lg font-semibold text-[#BFDBFE]">
                  {activeLeader.title}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => moveBy(-1)}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/30 bg-white/10 text-sm text-white transition hover:bg-white/20"
                  aria-label="Show previous management profile"
                >
                  <FaChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={() => moveBy(1)}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/30 bg-white/10 text-sm text-white transition hover:bg-white/20"
                  aria-label="Show next management profile"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <div className="mt-6 max-w-4xl space-y-4">
              {messageParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-[#E2E8F0] md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {socialLinks.length ? (
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                <span className="font-semibold text-[#DBEAFE]">Connect:</span>
                {socialLinks.map((link) => (
                  <a
                    key={`${activeLeader.name}-${link.label}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-white/35 bg-white/10 px-3 py-1 text-white transition hover:bg-white/20"
                  >
                    {getSocialIcon(link.label)}
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}

            {activeLeader.highlight ? (
              <p className="mt-6 inline-block bg-[#BFDBFE] px-2 py-1 text-base font-medium text-[#f7941d]">
                {activeLeader.highlight}
              </p>
            ) : null}

            {activeLeader.quote ? (
              <blockquote className="mt-5 border-l-2 border-[#93C5FD] pl-4 text-[#E2E8F0]">
                <p className="text-lg italic">
                  &quot;{activeLeader.quote}&quot;
                </p>
                {activeLeader.quoteAttribution ? (
                  <footer className="mt-3 text-sm font-medium text-[#BFDBFE]">
                    - {activeLeader.quoteAttribution}
                  </footer>
                ) : null}
              </blockquote>
            ) : null}
          </div>
        </div>
      </article>

      <div
        ref={thumbnailStripRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        aria-label="Management profiles"
      >
        {leaders.map((leader, index) => (
          <LeaderCard
            key={`${leader.name}-${leader.title}`}
            name={leader.name}
            title={leader.title}
            imageSrc={leader.imageSrc}
            imageAlt={leader.imageAlt}
            active={index === normalizedActiveIndex}
            onSelect={() => setActiveIndex(index)}
            dataIndex={index}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFDBFE]"
          />
        ))}
      </div>
    </div>
  );
}
