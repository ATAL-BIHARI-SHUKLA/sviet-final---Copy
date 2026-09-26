"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import {
  achievementGraphics,
  galleryItems,
  type GalleryItem,
} from "./gallery-data";

import { shouldBypassOptimization } from "@/lib/image-utils";

function getItemByTitle(title: string) {
  const item = galleryItems.find((entry) => entry.title === title);
  if (!item) {
    throw new Error(`Missing gallery item: ${title}`);
  }
  return item;
}

const campusInfrastructure = [
  getItemByTitle("Main Campus Gate"),
  getItemByTitle("Campus Front View"),
  getItemByTitle("Administration Block"),
];

const academicSpaces = [
  getItemByTitle("Academic Block One"),
  getItemByTitle("Academic Block Four"),
  getItemByTitle("Academic Block Eight"),
  getItemByTitle("Library Interior"),
  getItemByTitle("Research Center"),
  getItemByTitle("Laboratory Facility"),
];

const eventsAndFestivals = [
  getItemByTitle("Campus Auditorium"),
  getItemByTitle("Sportsmania Highlight"),
  getItemByTitle("Elevate Event"),
  getItemByTitle("Conference Moment"),
];

const studentLife = [
  getItemByTitle("Hostel Residence"),
  getItemByTitle("Library Interior"),
  getItemByTitle("Campus Front View"),
  getItemByTitle("Administration Block"),
];

const sportsActivities = [
  getItemByTitle("Playground"),
  getItemByTitle("Cricket Ground"),
  getItemByTitle("Kabaddi Arena"),
];

const gallerySequence: GalleryItem[] = [
  ...campusInfrastructure,
  ...academicSpaces,
  ...eventsAndFestivals,
  ...studentLife,
  ...sportsActivities,
];

function GalleryCard({
  item,
  index,
  onOpen,
  className = "",
}: {
  item: GalleryItem;
  index: number;
  onOpen: (item: GalleryItem) => void;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.button
      type="button"
      className={`group relative block w-full overflow-hidden rounded-[14px] bg-[#0f172a] text-left shadow-sm outline-none ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      onClick={() => onOpen(item)}
    >
      <div className="relative overflow-hidden">
        {!loaded ? (
          <div className="absolute inset-0 animate-pulse bg-linear-to-br from-slate-200 via-slate-100 to-slate-200" />
        ) : null}
        <div className={`relative overflow-hidden ${item.aspectClass}`}>
          <Image
            src={item.src}
            alt={item.alt}
            width={1200}
            height={900}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={shouldBypassOptimization(item.src)}
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition duration-500 ease-out ${
              loaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-[1.05]`}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition duration-300 group-hover:opacity-100">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
            {item.category}
          </p>
          <h3 className="mt-1 text-lg font-semibold leading-tight">
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-white/85">
            {item.caption}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function GallerySectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2563eb]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0f172a] md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#475569] md:text-base">
        {description}
      </p>
    </div>
  );
}

function Lightbox({
  items,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const activeItem = items[activeIndex];
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowRight") {
        onNext();
      }
      if (event.key === "ArrowLeft") {
        onPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!activeItem) {
    return null;
  }

  const handleTouchEnd = (touchEnd: number) => {
    if (touchStart === null) {
      return;
    }

    const delta = touchStart - touchEnd;
    if (delta > 50) {
      onNext();
    } else if (delta < -50) {
      onPrev();
    }

    setTouchStart(null);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={activeItem.title}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close lightbox backdrop"
        onClick={onClose}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[18px] bg-[#0f172a] shadow-2xl"
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.98, y: 10 }}
        transition={{ duration: 0.22 }}
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white md:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
              {activeItem.category}
            </p>
            <h3 className="mt-1 text-lg font-semibold md:text-2xl">
              {activeItem.title}
            </h3>
          </div>
          <button
            type="button"
            className="rounded-full border border-white/15 p-2 text-white transition hover:bg-white/10"
            onClick={onClose}
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
          <div className="relative min-h-80 bg-black/40 md:min-h-160">
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 70vw"
              unoptimized={shouldBypassOptimization(activeItem.src)}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col justify-between gap-6 border-t border-white/10 bg-[#0b1220] p-5 text-white lg:border-t-0 lg:border-l lg:p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#fbbf24]">
                Caption
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                {activeItem.caption}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
                onClick={onPrev}
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
                onClick={onNext}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GalleryHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#0b1220] bg-black">
      <div className="absolute inset-0">
        <Image
          src="/assets/img/college/auditorium.png"
          alt="SVGOI auditorium"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-black/15" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32 lg:py-36">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
          SVGOI Visual Archive
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Gallery
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
          Explore life at SVGOI through real campus moments, told in a
          section-based experience that stays focused on campus visuals.
        </p>
      </div>
    </section>
  );
}

function AnchorNav() {
  const links = [
    ["Campus", "campus-infrastructure"],
    ["Academics", "academic-spaces"],
    ["Events", "events-festivals"],
    ["Life", "student-life"],
    ["Sports", "sports-activities"],
  ] as const;

  return (
    <div className="sticky top-0 z-40 border-b border-[#dbe2f2] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:px-6">
        {links.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className="whitespace-nowrap rounded-full border border-[#dbe2f2] bg-white px-4 py-2 text-sm font-semibold text-[#334155] transition hover:border-[#2563eb] hover:text-[#2563eb]"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

function CampusInfrastructureSection({
  onOpen,
}: {
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <section
      id="campus-infrastructure"
      className="scroll-mt-28 px-4 md:px-6 bg-transparent"
    >
      <div className="mx-auto max-w-7xl py-12 md:py-16">
        <GallerySectionHeader
          eyebrow="Campus Infrastructure"
          title="Buildings, entrances, and the physical character of the campus"
          description="A two-column visual story that highlights the main gate, campus views, and administrative spaces."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <GalleryCard
            item={campusInfrastructure[0]}
            index={0}
            onOpen={onOpen}
            className="lg:min-h-135"
          />
          <div className="grid gap-5">
            <GalleryCard
              item={campusInfrastructure[1]}
              index={1}
              onOpen={onOpen}
              className="lg:min-h-65"
            />
            <GalleryCard
              item={campusInfrastructure[2]}
              index={2}
              onOpen={onOpen}
              className="lg:min-h-65"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AcademicSpacesSection({
  onOpen,
}: {
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <section
      id="academic-spaces"
      className="scroll-mt-28 px-4 md:px-6 bg-[#f0f5ff]"
    >
      <div className="mx-auto max-w-7xl py-12 md:py-16">
        <GallerySectionHeader
          eyebrow="Academic Spaces"
          title="Classrooms, labs, and places where learning takes shape"
          description="A clean card grid that keeps the focus on functional, real campus spaces used for teaching and study."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {academicSpaces.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsFestivalsSection({
  onOpen,
}: {
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <section
      id="events-festivals"
      className="scroll-mt-28 px-4 md:px-6 bg-transparent"
    >
      <div className="mx-auto max-w-7xl py-12 md:py-16">
        <GallerySectionHeader
          eyebrow="Events & Festivals"
          title="A masonry rhythm for campus events, talks, and celebrations"
          description="A dynamic gallery flow that avoids repetitive cards and keeps the storytelling lively."
        />

        <div className="mt-8 columns-1 gap-4 sm:columns-2 xl:columns-3">
          {eventsAndFestivals.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onOpen={onOpen}
              className="mb-4"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StudentLifeSection({
  onOpen,
}: {
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <section
      id="student-life"
      className="scroll-mt-28 px-4 md:px-6 bg-[#f0f5ff]"
    >
      <div className="mx-auto max-w-7xl py-12 md:py-16">
        <GallerySectionHeader
          eyebrow="Student Life"
          title="Daily routines, study moments, and the social fabric of campus"
          description="Mixed layouts create a more editorial feel, showing how students move through the campus during ordinary days."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <GalleryCard
            item={studentLife[0]}
            index={0}
            onOpen={onOpen}
            className="lg:min-h-150"
          />
          <div className="grid gap-5">
            <GalleryCard
              item={studentLife[1]}
              index={1}
              onOpen={onOpen}
              className="lg:min-h-70"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
              <GalleryCard
                item={studentLife[2]}
                index={2}
                onOpen={onOpen}
                className="sm:min-h-60"
              />
              <GalleryCard
                item={studentLife[3]}
                index={3}
                onOpen={onOpen}
                className="sm:min-h-60"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SportsActivitiesSection({
  onOpen,
}: {
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <section
      id="sports-activities"
      className="scroll-mt-28 px-4 md:px-6 bg-transparent"
    >
      <div className="mx-auto max-w-7xl py-12 md:py-16">
        <GallerySectionHeader
          eyebrow="Sports & Activities"
          title="Movement, action, and outdoor energy"
          description="A horizontal rail keeps the section lively and makes sports feel like a browseable collection instead of a static block."
        />

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {sportsActivities.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onOpen={onOpen}
              className="min-w-[78vw] snap-start sm:min-w-105 lg:min-w-130"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementSection() {
  return (
    <section className="px-4 pb-10 md:px-6 md:pb-14">
      <div className="mx-auto max-w-7xl rounded-[20px] border border-[#dbe2f2] bg-white p-5 md:p-7">
        <GallerySectionHeader
          eyebrow="Achievement graphics"
          title="Separated from the gallery so campus visuals stay the focus"
          description="Posters, awards, and recognition graphics are intentionally grouped apart from the gallery photos."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {achievementGraphics.map((item, index) => (
            <motion.article
              key={item.id}
              className="overflow-hidden rounded-[14px] border border-[#e8edf7] bg-[#f8fbff]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className={`relative overflow-hidden ${item.aspectClass}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  loading="lazy"
                  unoptimized={shouldBypassOptimization(item.src)}
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2563eb]">
                  Achievement graphic
                </p>
                <h3 className="text-lg font-semibold text-[#111827]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#475569]">
                  {item.caption}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const sequence = useMemo(() => gallerySequence, []);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (current === null) return 0;
          return (current + 1) % sequence.length;
        });
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (current === null) return 0;
          return (current - 1 + sequence.length) % sequence.length;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, sequence.length]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  const openLightbox = (item: GalleryItem) => {
    const index = sequence.findIndex((entry) => entry.id === item.id);
    setActiveIndex(index);
  };

  const closeLightbox = () => setActiveIndex(null);

  const goNext = () => {
    setActiveIndex((current) => {
      if (current === null) return 0;
      return (current + 1) % sequence.length;
    });
  };

  const goPrev = () => {
    setActiveIndex((current) => {
      if (current === null) return 0;
      return (current - 1 + sequence.length) % sequence.length;
    });
  };

  return (
    <main className="bg-[#f6f8fc] text-[#0f172a]">
      <GalleryHero />
      <AnchorNav />
      <CampusInfrastructureSection onOpen={openLightbox} />
      <AcademicSpacesSection onOpen={openLightbox} />
      <EventsFestivalsSection onOpen={openLightbox} />
      <StudentLifeSection onOpen={openLightbox} />
      <SportsActivitiesSection onOpen={openLightbox} />
      <AchievementSection />

      <AnimatePresence>
        {activeIndex !== null ? (
          <Lightbox
            items={sequence}
            activeIndex={activeIndex}
            onClose={closeLightbox}
            onNext={goNext}
            onPrev={goPrev}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
