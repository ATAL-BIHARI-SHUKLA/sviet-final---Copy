"use client";

import { useRef } from "react";

import { TestimonialCard } from "@/components/placements/testimonial-card";

type Testimonial = {
  imageSrc: string;
  imageAlt: string;
  name: string;
  subtitle: string;
  company: string;
  quote: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const offset = Math.round(track.clientWidth * 0.85);
    track.scrollBy({
      left: direction === "right" ? offset : -offset,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 sm:px-4 sm:text-sm"
          aria-label="Previous testimonial"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 sm:px-4 sm:text-sm"
          aria-label="Next testimonial"
        >
          Next
        </button>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-6"
      >
        {testimonials.map((testimonial) => (
          <div
            key={`${testimonial.name}-${testimonial.company}`}
            className="w-full min-w-full snap-start sm:min-w-[80%] lg:min-w-[48%]"
          >
            <TestimonialCard
              imageSrc={testimonial.imageSrc}
              imageAlt={testimonial.imageAlt}
              name={testimonial.name}
              subtitle={testimonial.subtitle}
              company={testimonial.company}
              quote={testimonial.quote}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
