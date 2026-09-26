"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export type CurriculumEvent = {
  id: number | string;
  slug: string;
  name: string;
  mainCard: { title: string; description: string; image: string };
  stats: Array<{ image: string; label: string }>;
  videos: Array<{ image: string; label: string }>;
};

const STATIC_EVENTS: CurriculumEvent[] = [
  {
    id: 1,
    slug: "sportsmania-2025",
    name: "Sportsmania 2025",
    mainCard: {
      title: "Sportsmania 2025",
      description:
        "The annual sports festival of SVGOI brings together students in a vibrant display of athleticism, teamwork and competitive spirit across events like football, basketball, and more.",
      image: "/assets/img/section_card/Sportsmania.jpeg",
    },
    stats: [{ image: "/assets/img/section_card/Cricket.jpeg", label: "October 17–18, 2025" }],
    videos: [{ image: "/assets/img/section_card/Kabbadi.jpeg", label: "SVGOI Campus" }],
  },
  {
    id: 2,
    slug: "elevate-2-0",
    name: "Elevate 2.0",
    mainCard: {
      title: "Elevate 2.0",
      description:
        "A flagship cultural & innovation fest bringing together creative minds, performances, workshops and peer-networking celebrating innovation, student talent and campus life.",
      image: "/assets/img/section_card/Elevate.jpeg",
    },
    stats: [{ image: "/assets/img/section_card/Elevate2.jpeg", label: "September 11–13, 2025" }],
    videos: [{ image: "/assets/img/section_card/Elevate3.jpeg", label: "SVGOI Campus" }],
  },
  {
    id: 3,
    slug: "tedx-sviet",
    name: "TEDx SVIET",
    mainCard: {
      title: "TEDx SVIET",
      description:
        "TEDx SVIET 2025, under the theme 'The Power of One', featured thoughtful talks and inspiring conversations aimed at spreading ideas worth sharing.",
      image: "/assets/img/section_card/TEDx.jpeg",
    },
    stats: [{ image: "/assets/img/section_card/TEDx2.jpeg", label: "August 23, 2025" }],
    videos: [{ image: "/assets/img/section_card/TEDx3.jpeg", label: "SVGOI Campus" }],
  },
  {
    id: 4,
    slug: "dev-fest",
    name: "Dev Fest",
    mainCard: {
      title: "Dev Fest",
      description:
        "A power-packed tech fest bringing together developers, enthusiasts and community builders for learning, innovation, workshops and networking focused on AI, Web, Cloud and emerging tech.",
      image: "/assets/img/section_card/Dev1.jpeg",
    },
    stats: [{ image: "/assets/img/section_card/Dev2.jpeg", label: "November 8, 2025" }],
    videos: [{ image: "/assets/img/section_card/Dev3.jpeg", label: "SVGOI Campus" }],
  },
  {
    id: 5,
    slug: "graduation-ceremony-2025",
    name: "Graduation Ceremony 2025",
    mainCard: {
      title: "Graduation Ceremony 2025",
      description:
        "The Graduation Ceremony 2025 marked a proud milestone for graduating batches, celebrating years of dedication, learning, and achievement with esteemed dignitaries.",
      image: "/assets/img/section_card/Convo.jpeg",
    },
    stats: [{ image: "/assets/img/section_card/Convo2.jpeg", label: "May 2025" }],
    videos: [{ image: "/assets/img/section_card/Convo3.jpeg", label: "Chief Guest: Dr. Gurpreet Kaur Mann" }],
  },
  {
    id: 6,
    slug: "spontania-2025",
    name: "Spontania 2025",
    mainCard: {
      title: "Spontania 2025",
      description:
        "The flagship cultural extravaganza of SVGOI with a vibrant three-day celebration of art, culture, and talent featuring dance, music, theater and cultural showcases.",
      image: "/assets/img/section_card/Spont.jpeg",
    },
    stats: [{ image: "/assets/img/section_card/Spont2.jpeg", label: "April 15-17, 2025" }],
    videos: [{ image: "/assets/img/section_card/Spont3.jpeg", label: "600+ Students" }],
  },
  {
    id: 7,
    slug: "global-futures-summit-2-0",
    name: "Global Futures Summit 2.0",
    mainCard: {
      title: "Global Futures Summit 2.0",
      description:
        "Industry & HR Perspectives event bringing together thought leaders to discuss emerging trends, career pathways, and shaping the future workforce.",
      image: "/assets/img/section_card/GFS.JPG",
    },
    stats: [{ image: "/assets/img/section_card/GFS2.JPG", label: "8th March 2025" }],
    videos: [{ image: "/assets/img/section_card/GFS3.JPG", label: "SVGOI Auditorium" }],
  },
];

type Props = { events?: CurriculumEvent[] };

import { shouldBypassOptimization } from "@/lib/image-utils";

export function CurriculumOpportunitiesSection({ events }: Props) {
  const curriculumEvents = events && events.length > 0 ? events : STATIC_EVENTS;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 7;
  const totalItems = curriculumEvents.length;

  const handlePrev = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    setActiveIndex(newIndex);
    if (newIndex < scrollOffset) setScrollOffset(newIndex);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleNext = () => {
    const newIndex = Math.min(totalItems - 1, activeIndex + 1);
    setActiveIndex(newIndex);
    if (newIndex >= scrollOffset + itemsPerView) setScrollOffset(newIndex - itemsPerView + 1);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleItemClick = (index: number) => {
    setIsTransitioning(true);
    setActiveIndex(index);
    if (index < scrollOffset) setScrollOffset(index);
    else if (index >= scrollOffset + itemsPerView) setScrollOffset(index - itemsPerView + 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const currentEvent = curriculumEvents[activeIndex];
  const visibleItems = curriculumEvents.slice(scrollOffset, scrollOffset + itemsPerView);

  return (
    <section className="bg-[#FFFFFF] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 space-y-3">
          <h2 className="text-3xl font-light text-[#111827] md:text-5xl">
            National-Level Exposure & Industry Platforms
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[#6B7280] md:text-base">
            SVGOI builds its own ecosystem of innovation and creativity through
            large-scale, student-driven events that encourage participation,
            collaboration, and real-world problem-solving.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f7941d] text-[#f7941d] transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#f7941d] hover:text-white"
                aria-label="Scroll up"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex === totalItems - 1}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f7941d] text-[#f7941d] transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#f7941d] hover:text-white"
                aria-label="Scroll down"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            <div ref={containerRef} className="h-96 space-y-2 overflow-hidden">
              {visibleItems.map((event) => {
                const isActive = event.id === curriculumEvents[activeIndex].id;
                return (
                  <button
                    key={event.id}
                    onClick={() => handleItemClick(curriculumEvents.indexOf(event))}
                    className={`w-full rounded px-3 py-2 text-left transition-all duration-200 ${
                      isActive
                        ? "bg-[#E5E7EB] font-semibold text-[#f7941d]"
                        : "font-normal text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#f7941d]"
                    }`}
                  >
                    <div className="line-clamp-2 text-sm">{event.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-75" : "opacity-100"}`}>
            <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr_1fr]">
              {/* Info card */}
              <div className="space-y-4">
                <div className="flex h-full flex-col justify-between overflow-hidden rounded-[20px] bg-[#f7941d] p-5 text-white md:p-6">
                  <div>
                    <div className="mb-3 h-10 w-10 rounded-lg bg-white/20" />
                    <h3 className="mb-3 text-sm font-bold leading-tight md:text-base">
                      {currentEvent.mainCard.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-white/90">
                      {currentEvent.mainCard.description}
                    </p>
                  </div>
                  <Link
                    href={`/events/${currentEvent.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#f7941d] transition hover:bg-white/90 md:px-4"
                  >
                    View Event Details
                    <span aria-hidden="true">›</span>
                  </Link>
                </div>
              </div>

              {/* Main image */}
              <Link
                href={`/events/${currentEvent.slug}`}
                className="group relative block h-80 overflow-hidden rounded-[20px] bg-black md:h-full"
              >
                <Image
                  src={currentEvent.mainCard.image}
                  alt={currentEvent.mainCard.title}
                  fill
                  unoptimized={shouldBypassOptimization(currentEvent.mainCard.image)}
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 transition-all group-hover:bg-black/25" />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#111827] opacity-0 transition-opacity group-hover:opacity-100">
                  View Details →
                </div>
              </Link>

              {/* Side cards */}
              <div className="space-y-4">
                {currentEvent.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="relative h-40 overflow-hidden rounded-[20px] bg-[#000000ba] text-white"
                  >
                    <Image
                      src={stat.image}
                      alt={stat.label}
                      fill
                      unoptimized={shouldBypassOptimization(stat.image)}
                      className="absolute object-cover opacity-30"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-5 text-right md:p-6">
                      <div className="text-2xl font-bold md:text-3xl">
                        {stat.label.split("+")[0]}{stat.label.includes("+") ? "+" : ""}
                      </div>
                      <div className="text-sm font-medium opacity-90">
                        {stat.label.includes("+")
                          ? stat.label.split("+")[1]?.trim() || "Participants"
                          : "Date"}
                      </div>
                    </div>
                  </div>
                ))}

                {currentEvent.videos.map((video, idx) => (
                  <div
                    key={idx}
                    className="group relative h-40 overflow-hidden rounded-[20px] bg-black"
                  >
                    <Image
                      src={video.image}
                      alt={video.label}
                      fill
                      unoptimized={shouldBypassOptimization(video.image)}
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/80" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                      <div className="text-sm font-semibold text-white md:text-sm">{video.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
