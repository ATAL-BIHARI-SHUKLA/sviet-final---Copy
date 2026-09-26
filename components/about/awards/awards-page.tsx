import Image from "next/image";
import Link from "next/link";
import { AwardsHeroSection } from "@/components/about/awards/awards-hero-section";

type Tile = {
  id: string;
  title: string;
  subtitle?: string;
  src?: string;
  type?: "image" | "pdf";
  href?: string;
};

const FEATURED: Tile[] = [
  {
    id: "best-in-north",
    title: "Best Institution — North India",
    subtitle: "4th World Education & Business Award",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443542/sviet_assets/awards/Best%20Institution%20in%20North%20India.jpg",
    type: "image",
    href: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443542/sviet_assets/awards/Best%20Institution%20in%20North%20India.jpg",
  },
  {
    id: "best-placement",
    title: "Best Campus for Placement",
    subtitle: "State & national placement recognition",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443542/sviet_assets/awards/Best%20Campus%20for%20Placement%20in%20North%20India.jpg",
    type: "image",
    href: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443542/sviet_assets/awards/Best%20Campus%20for%20Placement%20in%20North%20India.jpg",
  },
  {
    id: "iste-chapter",
    title: "Best ISTE Faculty Chapter",
    subtitle: "National ISTE recognition",
    src: "/assets/img/awards/ISTE Best Faculty Chapter Award – SVIET 2025.jpg",
    type: "image",
    href: "/assets/img/awards/ISTE Best Faculty Chapter Award – SVIET 2025.jpg",
  },
  {
    id: "csr-ranking",
    title: "CSR Ranking 2025",
    subtitle: "Corporate social responsibility ranking",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443537/sviet_assets/awards/Overall%20Winner%20Trophy%20Youth%20Festival.jpg",
    type: "image",
    href: "https://res.cloudinary.com/qbxjwpwp/raw/upload/v1790443542/sviet_assets/awards/CSR%20Ranking%202025.pdf",
  },
  {
    id: "digii100",
    title: "DIGII100 Summit",
    subtitle: "Digital transformation recognition",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443543/sviet_assets/awards/29th%20Elets%20World%20Education%20Summit%202024%20AWARD.jpg",
    type: "image",
    href: "https://res.cloudinary.com/qbxjwpwp/raw/upload/v1790443540/sviet_assets/awards/DIGII100%20Summit.pdf",
  },
];

const CATEGORIES: { id: string; title: string; items: Tile[] }[] = [
  {
    id: "institutional",
    title: "Institutional Recognition",
    items: [
      {
        id: "autonomous",
        title: "UGC Autonomous Status (2026–2031)",
        subtitle: "Certificate available",
        src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443543/sviet_assets/awards/Autonomous%20post.jpg",
        type: "image",
        href: "https://res.cloudinary.com/qbxjwpwp/raw/upload/v1790443543/sviet_assets/awards/Autonomous%20Letter.pdf",
      },
      {
        id: "naac",
        title: "NAAC Accreditation",
        subtitle: "Accredited with CGPA",
        src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443537/sviet_assets/awards/NAAC%20Accreditation%20Certificate.jpg",
        type: "image",
        href: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443537/sviet_assets/awards/NAAC%20Accreditation%20Certificate.jpg",
      },
      {
        id: "iso",
        title: "ISO Certification",
        subtitle: "Quality management standards",
        src: "https://res.cloudinary.com/qbxjwpwp/raw/upload/v1790443539/sviet_assets/awards/ISO.pdf",
        type: "pdf",
        href: "https://res.cloudinary.com/qbxjwpwp/raw/upload/v1790443539/sviet_assets/awards/ISO.pdf",
      },
    ],
  },
  {
    id: "rankings",
    title: "Rankings & Global Recognition",
    items: [
      {
        id: "csr",
        title: "CSR Ranking 2025",
        subtitle: "National ranking",
        src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443537/sviet_assets/awards/Overall%20Winner%20Trophy%20Youth%20Festival.jpg",
        type: "image",
        href: "https://res.cloudinary.com/qbxjwpwp/raw/upload/v1790443542/sviet_assets/awards/CSR%20Ranking%202025.pdf",
      },
      {
        id: "virtual-labs",
        title: "Virtual Labs Recognition",
        subtitle: "Ranked in Virtual Labs",
        src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443535/sviet_assets/awards/Virtual%20Labs.jpg",
        type: "image",
        href: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443535/sviet_assets/awards/Virtual%20Labs.jpg",
      },
    ],
  },
  {
    id: "people",
    title: "Faculty & Student Achievements",
    items: [
      {
        id: "iste-student",
        title: "ISTE Best Student",
        subtitle: "Student excellence award",
        src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443539/sviet_assets/awards/ISTE%20Best%20Student%20Award%202024.jpg",
        type: "image",
        href: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443539/sviet_assets/awards/ISTE%20Best%20Student%20Award%202024.jpg",
      },
      {
        id: "best-teacher",
        title: "ISTE Best Teacher",
        subtitle: "Faculty excellence",
        src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443539/sviet_assets/awards/ISTE%20Best%20Teacher%20award%202024.jpg",
        type: "image",
        href: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443539/sviet_assets/awards/ISTE%20Best%20Teacher%20award%202024.jpg",
      },
      {
        id: "research-award",
        title: "International Academic Award",
        subtitle: "Research recognition",
        src: "https://res.cloudinary.com/qbxjwpwp/raw/upload/v1790443541/sviet_assets/awards/International%20Academic%20Excellence%20Award%202025.pdf",
        type: "pdf",
        href: "https://res.cloudinary.com/qbxjwpwp/raw/upload/v1790443541/sviet_assets/awards/International%20Academic%20Excellence%20Award%202025.pdf",
      },
    ],
  },
];

const GALLERY = [
  "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443544/sviet_assets/awards/1st%20Runner-Up%20at%20Mrs.%20Himachal%202025%20A.jpg",
  "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443543/sviet_assets/awards/1st%20Runner-Up%20at%20Mrs.%20Himachal%202025%20B.jpg",
  "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443542/sviet_assets/awards/Best%20Actor%20Award%201.jpg",
  "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443542/sviet_assets/awards/Best%20Actor%20Award%202.jpg",
  "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443536/sviet_assets/awards/Prof.%20Ankur%20Gill.jpg",
  "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443537/sviet_assets/awards/Overall%20Winner%20Trophy%20Youth%20Festival.jpg",
  "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445439/sviet_assets/misc/p5clvtfnhtcgmy6pachr.jpg",
  "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445436/sviet_assets/misc/mimgnkubbvwrxtmnnrkr.jpg",
  "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445437/sviet_assets/misc/wazre5f3adwtzyd7bk1q.jpg",
  "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445435/sviet_assets/misc/pufucncr35cd0iitwqsl.jpg",
  "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790445438/sviet_assets/misc/rzbmr0visog44uuxyvk4.jpg",
];

export function AwardsPage() {
  return (
    <main className="bg-white text-slate-900">
      <AwardsHeroSection />

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <h2 className="text-3xl font-extrabold">Featured Achievements</h2>
        <p className="mt-2 text-sm text-slate-600">
          Recent institutional highlights
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((f) => (
            <article
              key={f.id}
              className="group relative overflow-hidden rounded-2xl bg-white  transition-transform "
            >
              <div className="relative h-56 w-full bg-slate-50">
                {f.type === "image" && f.src ? (
                  <Image
                    src={f.src}
                    alt={f.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover object-[50%_30%]"
                    priority={false}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-4">
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-red-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <div className="text-center">
                        <div className="text-sm font-semibold">Document</div>
                        <div className="text-sm text-slate-500">PDF</div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{f.subtitle}</p>
                <div className="mt-3">
                  {f.href ? (
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                    >
                      View
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold">{cat.title}</h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((it) => (
                <div
                  key={it.id}
                  className="group flex items-stretch overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:"
                >
                  <div className="relative h-28 w-1/3 shrink-0 md:h-auto">
                    {it.type === "image" && it.src ? (
                      <Image
                        src={it.src}
                        alt={it.title}
                        fill
                        sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
                        className="object-cover object-[50%_30%]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-50">
                        <div className="flex flex-col items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-red-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          <div className="text-sm text-slate-500">PDF</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {it.title}
                    </h4>
                    <p className="mt-1 text-sm text-slate-600">{it.subtitle}</p>
                    <div className="mt-auto">
                      {it.href ? (
                        <a
                          href={it.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block text-sm font-medium text-indigo-600"
                        >
                          View document
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <h3 className="text-2xl font-extrabold">Visual Gallery</h3>
        <p className="mt-2 text-sm text-slate-600">
          Select highlights — click to open
        </p>

        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY.map((g, idx) => (
            <div
              key={g + idx}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg shadow-md transition-transform "
            >
              <a
                href={g}
                target="_blank"
                rel="noreferrer"
                title={`Open gallery image ${idx + 1}`}
                className="block relative h-64 w-full"
              >
                <span className="sr-only">Open gallery image {idx + 1}</span>
                <Image
                  src={g}
                  alt={`award-${idx}`}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover object-[50%_30%]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
