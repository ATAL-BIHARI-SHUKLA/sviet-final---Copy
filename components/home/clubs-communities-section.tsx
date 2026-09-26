import Image from "next/image";
import Link from "next/link";

const CLUBS = [
  {
    name: "Google Developer Groups on Campus",
    tagline: "Build for everyone with Google technologies.",
    logo: "/assets/img/club/GDGC.png",
    bg: "bg-white",
  },
  {
    name: "Microsoft Learn Student Ambassadors",
    tagline: "Lead, learn, and connect with Microsoft tools.",
    logo: "/assets/img/club/mlsa.webp",
    bg: "bg-white",
  },
  {
    name: "GeeksForGeeks Campus Chapter",
    tagline: "Master DSA and competitive programming.",
    logo: "/assets/img/club/gfg.jpg",
    bg: "bg-white",
  },
  {
    name: "CodeChef Campus Chapter",
    tagline: "Compete, grow, and code at every level.",
    logo: "/assets/img/club/cc.png",
    bg: "bg-white",
  },
  {
    name: "IEEE Student Branch",
    tagline: "Advancing technology for humanity.",
    logo: "/assets/img/club/IEEE.jpg",
    bg: "bg-white",
  },
];

export function ClubsCommunitiesSection() {
  return (
    <section className="bg-[#eef2ff] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f7941d]">
          Campus Life
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#111827] md:text-4xl">
              Student Clubs &amp; Communities
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6b7280] md:text-base">
              Active student ecosystem — learn, build, and grow together across
              technology, arts, and culture.
            </p>
          </div>
          <Link
            href="/campus-life"
            className="shrink-0 border border-[#f7941d] px-5 py-2.5 text-sm font-semibold text-[#f7941d] transition hover:bg-[#f7941d] hover:text-white"
          >
            Explore Campus Life →
          </Link>
        </div>

        {/* UNIQUES & Super60 — two feature cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {/* UNIQUES */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-[#e0e7ff] bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative h-72 overflow-hidden md:h-80">
              <Image
                src="/assets/img/college/lab.jpeg"
                alt="The Uniques — lab"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <Image
                  src="/assets/img/uniques_logo.png"
                  alt="The Uniques logo"
                  width={120}
                  height={48}
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
            <div className="border-t border-[#e0e7ff] p-6">
              <h3 className="text-lg font-bold leading-snug text-[#111827]">
                The Uniques Community
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#1d4ed8]">
                Learn, Build, and Grow Together
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-[#6b7280]">
                A community where everyone is welcome. We help students bridge
                the gap between theory and practice through peer-to-peer
                learning, workshops, study jams, and building solutions for
                local businesses.
              </p>
              <Link
                href="https://www.theuniques.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1d4ed8] transition hover:text-[#f7941d]"
              >
                Visit Website →
              </Link>
            </div>
          </div>

          {/* Super60 */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-[#e0e7ff] bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative h-72 overflow-hidden md:h-80">
              <Image
                src="/assets/img/s60.jpg"
                alt="Super60 batch"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-top transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <Image
                  src="/assets/img/s60.png"
                  alt="Super60 logo"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="border-t border-[#e0e7ff] p-6">
              <h3 className="text-lg font-bold leading-snug text-[#111827]">
                Super60 — Elite CSE Batch
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                30–60 first-year CSE students selected annually for enriched
                learning — reasoning, quant, communication, personality
                development, and cutting-edge tech — guaranteeing 100% campus
                placement.
              </p>
              <Link
                href="https://www.supersixty.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1d4ed8] transition hover:text-[#f7941d]"
              >
                Visit Website →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {CLUBS.map((club) => (
            <div
              key={club.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#e0e7ff] bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Logo area */}
              <div className="flex h-32 items-center justify-center p-6 bg-white">
                <div className="relative h-full w-full">
                  <Image
                    src={club.logo}
                    alt={`${club.name} logo`}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-contain"
                  />
                </div>
              </div>
              {/* Info */}
              <div className="border-t border-[#e0e7ff] p-4">
                <h3 className="text-sm font-bold leading-snug text-[#111827]">
                  {club.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6b7280]">
                  {club.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
