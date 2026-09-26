import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

type FounderSectionProps = {
  name: string;
  role: string;
  image: string;
  description: readonly string[];
  socials: {
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  ctaHref?: string;
  ctaLabel?: string;
};

const SOCIAL_ICONS = {
  twitter: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
} as const;

export function FounderSection({
  name,
  role,
  image,
  description,
  socials,
  ctaHref = "/about",
  //   ctaLabel = "LEARN MORE",
}: FounderSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFF] py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-size-[32px_32px] opacity-50" />

      <div className="relative mx-auto max-w-6xl px-6 motion-safe:animate-[fade-in-up_0.8s_ease-out_both]">
        <div>
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#f7941d]/60" aria-hidden="true" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7280]">
              Our Founder
            </p>
          </div>

          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] text-[#111827] lg:text-5xl">
            <span className="">Visionary Leadership ,</span>
            {""}
            <span className="mt-1 text-[#f7941d]">Inspiring Generations</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 lg:items-start">
          <div className="order-1 flex items-start">
            <div className="w-full max-w-md overflow-hidden rounded-xl border border-[#DCE7FF] bg-white shadow-[0_16px_36px_rgba(15,23,42,0.08)]">
              <div className="relative aspect-4/5 w-full">
                <Image
                  src={image}
                  alt={`${name} portrait`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover object-top"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className="order-2 max-w-xl space-y-5 text-[#4B5563] leading-relaxed">
            <div className="space-y-5 text-sm md:text-[0.95rem]">
              {description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 rounded border-l-4 border-[#f7941d] bg-gray-100 px-4 py-3">
              <p className="text-sm font-semibold text-[#111827] md:text-[0.95rem]">
                {role} | {name}
              </p>
            </div>

            {/* <div className="flex flex-wrap items-center gap-3">
              {Object.entries(socials).map(([key, href]) => {
                const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];

                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${key} profile`}
                    className="inline-flex h-10 w-10 items-center justify-center border border-[#DCE7FF] bg-white text-[#6B7280] shadow-[0_8px_18px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#f7941d]/40 hover:text-[#f7941d]"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
