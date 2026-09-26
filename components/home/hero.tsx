"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import BookReleaseWidget from "@/components/Globals/BookReleaseWidget";

type HeroSectionProps = {
  imageSrc?: string;
  imageAlt?: string;
};

type HeroSlide = {
  imageSrc?: string;
  videoSrc?: string;
  imageAlt: string;
};

export function HeroSection({
  imageSrc = "/assets/img/banner/sviet-tag.jpeg",
  imageAlt = "SVGOI Banner",
}: HeroSectionProps) {
  const VIDEO_SLIDE_INDEX = 2;
  const SLIDE_DURATION_MS = 8000;

  const heroSlides: HeroSlide[] = [
    { imageSrc, imageAlt },
    {
      imageSrc: "/assets/img/banner/banner_home_place2.jpeg",
      imageAlt: "SVGOI Campus Highlights",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const shouldShowHeroFilm = activeSlide !== 0;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => {
        if (prev === VIDEO_SLIDE_INDEX) return prev;
        return (prev + 1) % heroSlides.length;
      });
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("hero-slide-change", { detail: { activeSlide } }),
    );
  }, [activeSlide]);

  return (
    <section
      id="home-hero"
      data-active-slide={activeSlide}
      className="w-full bg-[#FFFFFF]"
    >
      <div className="relative w-full overflow-hidden">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="relative w-full h-[min(56vw,420px)] min-h-65 overflow-hidden">
            {heroSlides.map((slide, index) =>
              slide.videoSrc ? (
                <video
                  key={slide.imageAlt}
                  src={slide.videoSrc}
                  aria-label={slide.imageAlt}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${activeSlide === index ? "opacity-100" : "opacity-0"}`}
                />
              ) : (
                <Image
                  key={slide.imageAlt}
                  src={slide.imageSrc ?? ""}
                  alt={slide.imageAlt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 2rem), 100vw"
                  className={`object-cover transition-opacity duration-700 ${activeSlide === index ? "opacity-100" : "opacity-0"}`}
                  priority={index === 0}
                />
              ),
            )}
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 h-24 transition-colors duration-700 ${
                shouldShowHeroFilm
                  ? "bg-linear-to-b from-black/38 via-black/20 to-transparent"
                  : "bg-transparent"
              }`}
            />
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-3 py-1.5">
              {heroSlides.map((slide, index) => (
                <button
                  key={`${slide.imageAlt}-mobile-dot`}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${activeSlide === index ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>

          {/* <div className="w-full max-w-md">
            <BookReleaseWidget />
          </div> */}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block relative w-full aspect-[16/9] overflow-hidden">
          {heroSlides.map((slide, index) =>
            slide.videoSrc ? (
              <video
                key={slide.imageAlt}
                src={slide.videoSrc}
                aria-label={slide.imageAlt}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${activeSlide === index ? "opacity-100" : "opacity-0"}`}
              />
            ) : (
              <Image
                key={slide.imageAlt}
                src={slide.imageSrc ?? ""}
                alt={slide.imageAlt}
                fill
                sizes="100vw"
                className={`object-cover transition-opacity duration-700 ${activeSlide === index ? "opacity-100" : "opacity-0"}`}
                priority={index === 0}
              />
            ),
          )}

          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-28 md:h-32 transition-colors duration-700 ${
              shouldShowHeroFilm
                ? "bg-linear-to-b from-black/38 via-black/20 to-transparent"
                : "bg-transparent"
            }`}
          />

          <div className="absolute bottom-6 left-10 flex items-center gap-2 rounded-full bg-black/35 px-4 py-2">
            {heroSlides.map((slide, index) => (
              <button
                key={`${slide.imageAlt}-desktop-dot`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${activeSlide === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>

          {/* <div className="absolute inset-0 flex items-center justify-end pr-12">
            <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden">
              <BookReleaseWidget />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
