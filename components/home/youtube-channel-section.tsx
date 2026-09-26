import Image from "next/image";

const PREVIEW_TILES = [
  {
    image: "/assets/img/section_card/Sportsmania.jpeg",
    label: "Sportsmania 2025 Highlights",
  },
  {
    image: "/assets/img/section_card/Elevate.jpeg",
    label: "Elevate 2.0 — Cultural Fest",
  },
  {
    image: "/assets/img/section_card/TEDx.jpeg",
    label: "TEDx SVIET — Power of One",
  },
  {
    image: "/assets/img/section_card/Convo.jpeg",
    label: "Graduation Ceremony 2025",
  },
];

const FEATURE_BULLETS = [
  "Campus events coverage",
  "Placement success stories",
  "Expert talks & lectures",
  "Student life vlogs",
];

export function YouTubeChannelSection() {
  return (
    <section className="bg-[#111827] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_480px] lg:items-center">
          {/* Left — Channel Info */}
          <div>
            {/* YouTube badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 px-4 py-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#FF0000]">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span className="text-sm font-bold text-[#FF0000]">YouTube</span>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f7941d]">
              Official Channel
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              SVGOI Official
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-400 md:text-lg">
              Campus updates, placement stories, event highlights, and student
              life — all in one place. Stay connected with everything happening
              at SVGOI.
            </p>

            <ul className="mt-6 space-y-2">
              {FEATURE_BULLETS.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f7941d]" />
                  {bullet}
                </li>
              ))}
            </ul>

            <a
              href="https://www.youtube.com/@svietchandigarh3067"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-[#FF0000] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#cc0000]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Subscribe &amp; Explore
            </a>
          </div>

          {/* Right — Thumbnail Grid */}
          <div className="grid grid-cols-2 gap-3">
            {PREVIEW_TILES.map((tile) => (
              <div
                key={tile.label}
                className="group relative overflow-hidden rounded-xl bg-black"
              >
                <div className="relative h-36 md:h-44">
                  <Image
                    src={tile.image}
                    alt={tile.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 240px"
                    className="object-cover transition-all duration-500 group-hover:scale-105 opacity-75 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all" />
                  {/* Play button */}
                  {/* <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000]/90 shadow-lg transition group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 fill-white ml-0.5"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div> */}
                </div>
                <div className="p-2.5">
                  <p className="text-[11px] font-semibold leading-snug text-gray-200 line-clamp-2">
                    {tile.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
