"use client";
import { useEffect, useState } from "react";

const VIDEO_TESTIMONIALS = [
  {
    src: "/assets/img/inter/Testimonies/WhatsApp%20Video%202026-06-08%20at%2011.13.59%20AM.mp4",
    label: "International Student Testimonial",
  },
  {
    src: "/assets/img/inter/Testimonies/WhatsApp%20Video%202026-06-08%20at%2011.14.14%20AM.mp4",
    label: "International Student Testimonial",
  },
  {
    src: "/assets/img/inter/Testimonies/WhatsApp%20Video%202026-06-08%20at%2011.15.05%20AM.mp4",
    label: "International Student Testimonial",
  },
] as const;

const TESTIMONIALS = [
  {
    title: "SVGOI gave me confidence and global exposure to shape my future.",
    name: "Rohit Banik",
  },
  {
    title:
      "From academics to campus life, every experience here helped me grow.",
    name: "Khalid Mahmood",
  },
  {
    title:
      "I found mentorship, opportunities, and lifelong friendships at SVGOI.",
    name: "Akash Pal",
  },
  {
    title:
      "Supportive faculty and diverse peer groups accelerated my learning.",
    name: "Lina Mbete",
  },
  {
    title:
      "The campus culture helped me build confidence and leadership skills.",
    name: "Aisha Kamara",
  },
  {
    title: "Hands-on projects prepared me well for industry challenges.",
    name: "Daniel Okoro",
  },
  {
    title:
      "A welcoming environment for international students — I felt at home.",
    name: "Maya Chen",
  },
] as const;

export function InternationalStudentTestimonialsSection() {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    function update() {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
      setPage(0);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pageCount = Math.max(1, Math.ceil(TESTIMONIALS.length / itemsPerPage));

  function prev() {
    setPage((p) => Math.max(0, p - 1));
  }

  function next() {
    setPage((p) => Math.min(pageCount - 1, p + 1));
  }

  const start = page * itemsPerPage;
  const visible = TESTIMONIALS.slice(start, start + itemsPerPage);

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-3xl font-semibold leading-tight text-[#111827] md:text-5xl">
          Here Is What Our
          <br />
          <span>International Students Have To Say</span>
        </h2>

        {/* Video testimonials */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {VIDEO_TESTIMONIALS.map((video, index) => (
            <div
              key={index}
              className="overflow-hidden border border-black/10 bg-white shadow-sm"
            >
              <div className="relative aspect-9/16 w-full bg-black">
                <video
                  src={video.src}
                  controls
                  preload="metadata"
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-label={video.label}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f7941d]">
                  Student Story
                </p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {video.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Text testimonials */}
        <div className="mt-10 relative">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={prev}
              className="shrink-0 bg-white/90 p-2 text-xl shadow hover:bg-white"
              disabled={page === 0}
            >
              ‹
            </button>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
              {visible.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="flex h-80 flex-col justify-between overflow-hidden border border-black/10 bg-white p-6"
                >
                  <div>
                    <div className="text-4xl font-bold text-[#f7941d]">
                      &quot;
                    </div>
                    <p className="mt-2 text-base font-semibold leading-snug text-[#111827]">
                      {testimonial.title}
                    </p>
                  </div>

                  <div>
                    <p className="mt-4 text-sm text-[#6b7280]">
                      {testimonial.name}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              aria-label="Next testimonials"
              onClick={next}
              className="shrink-0 bg-white/90 p-2 text-xl shadow hover:bg-white"
              disabled={page >= pageCount - 1}
            >
              ›
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                type="button"
                key={i}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-2 w-8 ${i === page ? "bg-[#f7941d]" : "bg-[#D1D5DB]"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
