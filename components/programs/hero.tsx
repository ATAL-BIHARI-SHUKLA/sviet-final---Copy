import Image from "next/image";
import Link from "next/link";

import { PROGRAM_META_CHIPS } from "@/components/programs/data";

type ProgramHeroSectionProps = {
  slug: string;
  title: string;
  department?: string | null;
  durationMonths: number;
  tuitionCents: number | null;
  mode?: string | null;
  shortDescription?: string | null;
  heroImage?: string | null;
};

function formatMode(mode?: string | null) {
  if (!mode) {
    return null;
  }

  return mode
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatCurrency(valueInCents: number | null) {
  if (valueInCents == null) {
    return null;
  }

  return `₹${(valueInCents / 100).toLocaleString("en-IN")}`;
}

function formatDuration(durationMonths: number) {
  const years = durationMonths / 12;
  if (Number.isInteger(years)) {
    return `${years} Years`;
  }

  return `${years.toFixed(1)} Years`;
}

export function ProgramHeroSection({
  slug,
  title,
  department,
  durationMonths,
  tuitionCents,
  mode,
  shortDescription,
  heroImage,
}: ProgramHeroSectionProps) {
  const dynamicChips = [
    formatDuration(durationMonths),
    formatCurrency(tuitionCents),
    formatMode(mode),
  ].filter((chip): chip is string => Boolean(chip));

  const chips = dynamicChips.length > 0 ? dynamicChips : PROGRAM_META_CHIPS;

  return (
    <section className="mx-auto mt-15 mb-15 w-full max-w-300 px-3 md:px-5">
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-6">
          <p className="text-[11px] text-[#f7941d] ">
            Recommended for students interested in{" "}
            {department ?? "Engineering / Tech Careers"}
          </p>

          <h1 className="mt-2 text-5xl font-extrabold leading-tight">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-[#4b4b4b]">
            {shortDescription ?? "Contact admissions for full program details."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#ddd] bg-white px-3 py-1"
              >
                {chip}
              </span>
            ))}
          </div>
          <Image
            src={
              heroImage && heroImage.startsWith("/")
                ? heroImage
                : "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80"
            }
            alt="Program"
            width={1400}
            height={560}
            className="mt-4 h-52.5 w-full rounded-xl object-cover"
            draggable={false}
          />
        </div>

        <aside className="space-y-3 rounded-xl border border-[#e6e6e6] bg-white p-4">
          <p className="text-sm text-[#555]">Applications</p>
          <p className="text-6xl font-extrabold">
            120{" "}
            <span className="text-sm font-semibold text-[#f7941d] mb-10">
              Filling Fast
            </span>
          </p>
          <a
            href="https://admission.sviet.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded bg-[#f7941d] px-4 py-2.5 text-center font-semibold text-white"
          >
            Apply Now
          </a>
          <button className="w-full rounded border border-[#f7941d] px-4 py-2.5 font-semibold text-[#f7941d]">
            Download Brochure
          </button>
          <button className="w-full rounded border border-[#e6e6e6] px-4 py-2.5 font-semibold text-[#555]">
            Enquire
          </button>
          <div className="space-y-5 pb-5 border-t border-[#eaeaea] pt-7 mt-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#888]">Duration</span>
              <span className="font-medium text-[#222]">
                {formatDuration(durationMonths)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#888]">Fees</span>
              <span className="font-medium text-[#222]">
                {formatCurrency(tuitionCents)} / Year
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#888]">Affiliation</span>
              <span className="font-medium text-[#222]">PTU, Punjab</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#888]">Approval</span>
              <span className="font-medium text-[#222]">AICTE Approved</span>
            </div>
          </div>
          <div className="rounded bg-[#fff6ee] p-3 text-sm text-[#8d5522]">
            75% scholarship seats available for early applicants.
          </div>
        </aside>
      </div>
    </section>
  );
}
