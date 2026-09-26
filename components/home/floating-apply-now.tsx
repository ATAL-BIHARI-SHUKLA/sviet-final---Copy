"use client";

import { useEffect, useState } from "react";

export function FloatingApplyNow() {
  const [heroInView, setHeroInView] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const heroSection = document.getElementById("home-hero");
    if (!heroSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(heroSection);

    const initialSlide = Number(
      heroSection.getAttribute("data-active-slide") ?? "0",
    );
    if (!Number.isNaN(initialSlide)) {
      setActiveSlide(initialSlide);
    }

    const handleHeroSlideChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ activeSlide?: number }>;
      const nextSlide = customEvent.detail?.activeSlide;
      if (typeof nextSlide === "number") {
        setActiveSlide(nextSlide);
      }
    };

    window.addEventListener("hero-slide-change", handleHeroSlideChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hero-slide-change", handleHeroSlideChange);
    };
  }, []);

  const handleClick = () => {
    window.dispatchEvent(new Event("open-enquiry-modal"));
  };

  const shouldHide = heroInView && activeSlide === 0;

  if (shouldHide) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Apply now"
      className="floating-apply-now-tab fixed right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-xl bg-[#f7941d] px-3 py-5 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_24px_rgba(247,148,29,0.35)] transition hover:bg-[#d97706]"
    >
      Apply Now
    </button>
  );
}
