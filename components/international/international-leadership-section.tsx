import { LeadershipCarousel } from "@/components/about/leadership-carousel";
import type { Leader } from "@/components/about/leader-card";

const INTERNATIONAL_LEADERS: Leader[] = [
  // {
  //   name: "Adv. Shubham Garg",
  //   title: "Director – Placements",
  //   description:
  //     "Shaping globally relevant professionals and entrepreneurs prepared to lead anywhere in the world.",
  //   imageSrc:
  //     "/assets/img/inter/01%20Collage,%20shubham%20sir,%20soni%20sir/Shubham%20sir/SHUBHAM%20SIR.jpeg",
  //   imageAlt: "Adv. Shubham Garg – Director Placements",
  //   messageParagraphs: [
  //     "In an interconnected world where careers transcend borders, true placement excellence lies in cultivating vision, capability, and leadership.",
  //     "Our mission is to shape globally relevant professionals and entrepreneurs who are prepared to influence industries and create value at scale. Our international students exemplify this ethos—excelling in distinguished professional roles and establishing successful ventures that reflect innovation, resilience, and purpose.",
  //     "Anchored by deep industry engagement, strategic mentorship, and outcome-driven preparation, we ensure that every graduate emerges not merely career-ready, but future-ready—equipped to lead, build, and succeed anywhere in the world.",
  //   ],
  // },
  {
    name: "Mr. Sunil Soni",
    title: "Director – International Admissions",
    description:
      "Welcoming students from diverse cultures into a learning environment that values academic excellence and global mindset.",
    imageSrc:
      "/assets/img/inter/01%20Collage,%20shubham%20sir,%20soni%20sir/Soni%20sir/soni%20sir.jpg",
    imageAlt: "Mr. Sunil Soni – Director International Admissions",
    messageParagraphs: [
      "At our institution, international education is not merely about earning a degree; it is about shaping globally competent individuals prepared for life, leadership, and impact.",
      "As Director – International Admissions, I take pride in welcoming students from diverse cultures into a learning environment that values academic excellence, innovation, and personal growth. Our globally aligned curriculum, experienced faculty, and vibrant campus life are designed to nurture confidence, adaptability, and a global mindset.",
      "We remain committed to supporting every international student through a transformative educational journey—one that empowers them to thrive across borders, cultures, and careers.",
    ],
  },
];

export function InternationalLeadershipSection() {
  return (
    <section className="bg-black py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
          Leadership
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
          A Message From Our Leadership
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#E2E8F0]">
          Guidance and vision from the directors who champion our international
          students every step of their journey.
        </p>
        <div className="mt-10">
          <LeadershipCarousel leaders={INTERNATIONAL_LEADERS} />
        </div>
      </div>
    </section>
  );
}
