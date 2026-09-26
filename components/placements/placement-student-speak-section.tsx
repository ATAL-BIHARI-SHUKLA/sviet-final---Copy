"use client";

// use video snippets for student speak slides
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STUDENT_SPEAK_SLIDES = [
  {
    videoSrc:
      "/assets/videos/byte/Another success story added to the legacy of SVGOI! Congratulations to our achievers for steppin.mp4",
    alt: "Student story: Aman Verma",
  },
  {
    videoSrc:
      "/assets/videos/byte/Congratulations to all the students for securing placements in Grazitti Interactive, Step2gen &.mp4",
    alt: "Student story: Nikhil Arora",
  },
  {
    videoSrc:
      "/assets/videos/byte/Heartiest congratulations to Aryan, Pharmacy student, on securing his placement as Medical Repre.mp4",
    alt: "Student story: Riya Sharma",
  },
  {
    videoSrc: "/assets/videos/byte/4.mp4",
    alt: "Student story: Simran Kaur",
  },
] as const;

export function PlacementStudentSpeakSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const updateArrowVisibility = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      const scrollLeft = track.scrollLeft;

      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft < maxScrollLeft - 1);
    };

    updateArrowVisibility();
    track.addEventListener("scroll", updateArrowVisibility, { passive: true });
    window.addEventListener("resize", updateArrowVisibility);

    return () => {
      track.removeEventListener("scroll", updateArrowVisibility);
      window.removeEventListener("resize", updateArrowVisibility);
    };
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const offset = Math.round(track.clientWidth * 0.82);
    track.scrollBy({
      left: direction === "right" ? offset : -offset,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-8 pb-1 md:mt-12">
      <div className="text-center">
        <p className="text-lg font-medium leading-none text-black sm:text-xl md:text-2xl">
          Our students speak
        </p>
        <h3 className="mt-2 text-2xl font-bold leading-none tracking-[-0.02em] text-[#0b3b8f] sm:text-3xl md:text-5xl">
          empowering the future
        </h3>
      </div>

      <div className="relative mt-6 md:mt-8">
        {canScrollLeft ? (
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/80 md:flex"
            aria-label="Previous student story"
          >
            <ChevronLeft size={20} />
          </button>
        ) : null}

        {/* per-slide mute controls are rendered inside each slide */}

        {canScrollRight ? (
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/80 md:flex"
            aria-label="Next student story"
          >
            <ChevronRight size={20} />
          </button>
        ) : null}

        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 pt-1 scroll-smooth sm:px-[6vw] md:gap-4 md:px-[12vw]"
          aria-label="Student stories carousel"
        >
          {STUDENT_SPEAK_SLIDES.map((slide, index) => (
            <article
              key={`${slide.videoSrc}-${index}`}
              className="w-[78vw] shrink-0 snap-center overflow-hidden rounded-2xl  sm:w-[62vw] md:w-[42vw] lg:w-[24vw]"
            >
              <div className="relative aspect-858/768 w-full">
                <video
                  src={encodeURI(slide.videoSrc)}
                  autoPlay
                  muted={unmutedIndex !== index}
                  loop
                  playsInline
                  className="h-full w-full object-contain"
                  aria-label={slide.alt}
                />

                <div className="absolute right-3 top-3 z-20">
                  <button
                    type="button"
                    onClick={() =>
                      setUnmutedIndex((cur) => (cur === index ? null : index))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 p-2 text-[#111] shadow-md transition hover:bg-white"
                    aria-pressed={unmutedIndex === index}
                    aria-label={
                      unmutedIndex === index
                        ? "Mute this video"
                        : "Unmute this video"
                    }
                  >
                    {unmutedIndex === index ? (
                      <Volume2 className="h-5 w-5" />
                    ) : (
                      <VolumeX className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
