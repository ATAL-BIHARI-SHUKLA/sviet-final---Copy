import Image from "next/image";
import Link from "next/link";
import { ClipboardCheck, Search, Users } from "lucide-react";

const audienceCards = [
  {
    title: "How To Join Us ?",
    href: "/admissions",
    image: "/assets/img/section_card/HowToJoin.jpeg",
    icon: Users,
    iconLabel: "Prospective students",
  },
  {
    title: "Already With Us ?",
    href: "/campus-life",
    image: "/assets/img/section_card/AlreadyJoin.JPG.jpeg",
    icon: Search,
    iconLabel: "Current students",
  },
  {
    title: "Still Thinking ? Know about Us",
    href: "/research",
    image: "/assets/img/section_card/StillThinking.jpeg",
    icon: ClipboardCheck,
    iconLabel: "Faculties and professors",
  },
] as const;

export function EducationBeyondSection() {
  return (
    <section className="bg-[#ffffff] py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="text-xl font-medium leading-tight text-[#6B7280] md:text-2xl">
          Career Starts Here
        </p>
        <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-[#000000] md:text-5xl">
          Make the Right Decision, Backed by Real Insights
        </h2>
        <p className="mt-3 text-2xl font-medium leading-tight text-[#111827] md:text-4xl">
          Find what matters to you
        </p>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#6B7280] md:text-lg">
          From placements and rankings to career-focused initiatives, get a
          clear view of what sets SVGOI apart.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {audienceCards.map((card) => {
            const CardIcon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group relative block h-64 !rounded-[15px]  overflow-hidden rounded-[28px]"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-[28px] bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <CardIcon
                    className="h-10 w-10 text-[#f7941d]"
                    aria-label={card.iconLabel}
                  />
                  <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#ffffff]">
                    {card.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-[#f7941d] transition group-hover:gap-3">
                    Explore
                    <span aria-hidden="true">›</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
