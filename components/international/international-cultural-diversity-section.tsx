import Image from "next/image";
import { Flag, Sparkles, Users } from "lucide-react";

export function InternationalCulturalDiversitySection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <article className="overflow-hidden rounded-2xl">
          <Image
            src="/assets/img/banner/interplay.jpeg"
            alt="Cultural diversity"
            width={1600}
            height={900}
            className="h-96 w-full object-cover md:h-[500px] lg:h-[600px]"
          />
        </article>

        <h2 className="mt-20 text-3xl font-semibold leading-tight text-[#111827] md:text-5xl">
          Making your education an adventure
          <br />
          <span className="">with cultural diversity at SVGOI</span>
        </h2>
        <p className="mt-4 text-base text-[#374151] md:text-lg">
          Our campus is a tapestry of cultures, fostering mutual respect and
          understanding.
        </p>

        <div className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-3">
          <article className="group relative overflow-hidden rounded-2xl border border-[#dbe3f5] bg-linear-to-br from-white to-[#f8fbff] p-6 shadow-[0_10px_25px_rgba(17,24,39,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#2563EB]/25 hover:shadow-[0_16px_34px_rgba(37,99,235,0.14)]">
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#2563EB]/8 transition group-hover:bg-[#f7941d]/12" />
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] ring-1 ring-[#2563EB]/15 transition group-hover:bg-[#2563EB] group-hover:text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-semibold leading-snug text-[#111827] md:text-2xl">
              Cultural Festivals
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#374151] md:text-base">
              Events where students showcase their heritage through dance, music
              and art.
            </p>
          </article>

          <article className="group relative overflow-hidden rounded-2xl border border-[#dbe3f5] bg-linear-to-br from-white to-[#f8fbff] p-6 shadow-[0_10px_25px_rgba(17,24,39,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#2563EB]/25 hover:shadow-[0_16px_34px_rgba(37,99,235,0.14)]">
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#2563EB]/8 transition group-hover:bg-[#f7941d]/12" />
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] ring-1 ring-[#2563EB]/15 transition group-hover:bg-[#2563EB] group-hover:text-white">
              <Users className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-semibold leading-snug text-[#111827] md:text-2xl">
              International Student Clubs
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#374151] md:text-base">
              Join clubs that celebrate global traditions, culture, and
              collaboration.
            </p>
          </article>

          <article className="group relative overflow-hidden rounded-2xl border border-[#dbe3f5] bg-linear-to-br from-white to-[#f8fbff] p-6 shadow-[0_10px_25px_rgba(17,24,39,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#2563EB]/25 hover:shadow-[0_16px_34px_rgba(37,99,235,0.14)]">
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#2563EB]/8 transition group-hover:bg-[#f7941d]/12" />
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] ring-1 ring-[#2563EB]/15 transition group-hover:bg-[#2563EB] group-hover:text-white">
              <Flag className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-semibold leading-snug text-[#111827] md:text-2xl">
              National Day Celebrations
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#374151] md:text-base">
              Celebrate national identity and cross-cultural respect through
              campus activities.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
