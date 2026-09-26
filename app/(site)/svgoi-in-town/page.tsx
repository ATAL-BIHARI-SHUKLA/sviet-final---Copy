import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SVGOI in Your Town",
  description:
    "Find SVGOI representatives near you. Our counsellors are present across Punjab, Haryana, Bihar, Nepal, Himachal Pradesh, and Jammu & Kashmir.",
};

type Representative = {
  name: string;
};

type Region = {
  state: string;
  representatives: Representative[];
};

const REGIONS: Region[] = [
  {
    state: "Punjab",
    representatives: [
      { name: "Mr. Gagandeep Singh" },
      { name: "Mr. Talwinder Singh" },
      { name: "Mr. Jaspreet Singh" },
      { name: "Mr. Tarandeep Singh" },
    ],
  },
  {
    state: "Haryana",
    representatives: [
      { name: "Mr. Manik Dhiman" },
    ],
  },
  {
    state: "Bihar and Nepal",
    representatives: [
      { name: "Mr. Ankur Garg" },
      { name: "Mr. Vikrant Choudhary" },
    ],
  },
  {
    state: "Himachal Pradesh",
    representatives: [
      { name: "Mr. Akshay" },
      { name: "Mr. Pankaj Sandhu" },
      { name: "Mr. Vishal Koundal" },
    ],
  },
  {
    state: "Jammu and Kashmir",
    representatives: [
      { name: "Mr. Muzaffar Ahmad" },
      { name: "Mr. Kunal Koul" },
      { name: "Mr. Tajamul" },
      { name: "Mr. Junaid" },
      { name: "Mr. Salman" },
    ],
  },
];

export default function SvgoiInYourTownPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-[#111827] px-4 py-20 text-center text-white md:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f7941d]">
          Admissions
        </p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">
          SVGOI In Your Town
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
          Our representatives are present across multiple states to guide you
          through admissions, programmes, and campus life — right in your
          region.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#f7941d] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#e07b10]"
          >
            Enquiry Now →
          </Link>
          <a
            href="https://admission.sviet.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
          >
            Apply Online ↗
          </a>
        </div>
      </div>

      {/* Representatives grid */}
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((region) => (
            <div
              key={region.state}
              className="rounded-none border border-[#e5e7eb] bg-white p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block h-1 w-8 bg-[#f7941d]" />
                <h2 className="text-lg font-bold text-[#111827]">
                  {region.state}
                </h2>
              </div>
              <ul className="space-y-2">
                {region.representatives.map((rep) => (
                  <li
                    key={rep.name}
                    className="flex items-center gap-2 text-sm text-[#374151]"
                  >
                    <span className="text-[#f7941d]">•</span>
                    {rep.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 border border-[#f7941d]/30 bg-[#fff8f2] p-8 text-center">
          <h3 className="text-2xl font-bold text-[#111827]">
            Want to connect with a representative?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6b7280]">
            Reach out to us and we will put you in touch with the counsellor
            nearest to you.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
            <a
              href="tel:+919465233333"
              className="inline-flex items-center gap-2 border border-[#f7941d] px-5 py-2.5 font-semibold text-[#f7941d] transition hover:bg-[#f7941d] hover:text-white"
            >
              📞 +91 94652 33333
            </a>
            <a
              href="tel:18001201200"
              className="inline-flex items-center gap-2 border border-[#f7941d] px-5 py-2.5 font-semibold text-[#f7941d] transition hover:bg-[#f7941d] hover:text-white"
            >
              📞 Toll Free: 1800-120-1200
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
