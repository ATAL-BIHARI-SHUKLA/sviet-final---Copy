import Image from "next/image";
import Link from "next/link";

import BookReleaseWidget from "@/components/Globals/BookReleaseWidget";

type AdmissionsHeroSectionProps = {
  breadcrumb?: string;
  titleLineOne?: string;
  titleLineTwo?: string;
  description?: string;
  ctaLabel?: string;
};

export function AdmissionsHeroSection({
  breadcrumb = "/ Admissions",
  titleLineOne = "Admissions at",
  titleLineTwo = "SVGOI",
  description = "Where Your Future Begins. Step into a learning environment designed to transform ambition into achievement. SVGOI offers a structured, transparent, and student-friendly admission process focused on helping you unlock the right opportunities for your career.",
  ctaLabel = "Apply Now",
}: AdmissionsHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0e1230]">
      <Image
        src="/assets/img/banner/AddmissionBanner.jpeg"
        alt="Admissions"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/65 to-black/35" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-16 pt-36 md:grid-cols-[1fr_360px] md:px-6 md:pb-20 md:pt-40 lg:pb-24 lg:pt-44">
        <div className="text-white">
          <p className="text-sm font-medium text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{" "}
            {breadcrumb}
          </p>
          <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight md:text-6xl">
            {titleLineOne}
            <br />
            {titleLineTwo}
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/85 md:text-base">
            {description}
          </p>
          <a
            href="https://admission.sviet.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-md bg-[#f7941d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d97706]"
          >
            {ctaLabel}
          </a>
        </div>
{/* 
        <div className="rounded-xl bg-white p-5 shadow-2xl md:p-6">
          <BookReleaseWidget />
        </div> */}
      </div>
    </section>
  );
}
