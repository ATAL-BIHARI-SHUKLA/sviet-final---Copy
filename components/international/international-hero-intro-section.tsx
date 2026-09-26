import Image from "next/image";
import Link from "next/link";

const FLAGS = [
  { src: "/assets/img/flags/Flag-Cameroon.webp", country: "Cameroon" },
  { src: "/assets/img/flags/Flag-Cote-dIvoire.webp", country: "Côte d'Ivoire" },
  { src: "/assets/img/flags/Flag-Guinea.webp", country: "Guinea" },
  { src: "/assets/img/flags/Flag-Malawi.webp", country: "Malawi" },
  { src: "/assets/img/flags/Flag-Zimbabwe.webp", country: "Zimbabwe" },
  { src: "/assets/img/flags/Flag_of_Austria.webp", country: "Austria" },
  { src: "/assets/img/flags/Flag_of_Egypt.svg", country: "Egypt" },
  { src: "/assets/img/flags/Flag_of_Ghana.svg", country: "Ghana" },
  { src: "/assets/img/flags/Flag_of_Kenya.webp", country: "Kenya" },
  { src: "/assets/img/flags/Flag_of_Lesotho.png", country: "Lesotho" },
  { src: "/assets/img/flags/Flag_of_Liberia.png", country: "Liberia" },
  { src: "/assets/img/flags/Flag_of_Mali.png", country: "Mali" },
  { src: "/assets/img/flags/Flag_of_Mozambique.svg", country: "Mozambique" },
  { src: "/assets/img/flags/Flag_of_Nigeria.png", country: "Nigeria" },
  { src: "/assets/img/flags/Flag_of_Rwanda.png", country: "Rwanda" },
  { src: "/assets/img/flags/Flag_of_South_Sudan.png", country: "South Sudan" },
  { src: "/assets/img/flags/Flag_of_Sudan.png", country: "Sudan" },
  { src: "/assets/img/flags/Flag_of_Tanzania.webp", country: "Tanzania" },
  { src: "/assets/img/flags/Flag_of_Thailand_(CMYK).png", country: "Thailand" },
  { src: "/assets/img/flags/Flag_of_Uganda.png", country: "Uganda" },
  { src: "/assets/img/flags/Flag_of_Yemen.png", country: "Yemen" },
  { src: "/assets/img/flags/Flag_of_Zambia.png", country: "Zambia" },
];

export function InternationalHeroIntroSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Welcome text */}
        <div className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-10">
          <h2 className="text-3xl font-semibold leading-tight text-[#111827] md:text-5xl">
            Welcome to a vibrant
            <br />
            community of over
            <br />
            <span>
              2000+ international students
              <br />
              from 20+ countries.
            </span>
          </h2>

          <div>
            <h3 className="text-2xl font-bold text-[#111827] md:text-3xl">
              International Students
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#374151] md:text-lg">
              At SVGOI, we pride ourselves on being a melting pot of cultures,
              ideas, and innovations. With students from 20+ countries, our
              campus offers a truly global experience.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#374151] md:text-lg">
              Explore diverse programs, state-of-the-art facilities, and a
              supportive environment that nurtures your ambitions.
            </p>
          </div>
        </div>

        {/* Country flags — immediately below welcome text */}
        <div className="mt-10 md:mt-12">
          <h3 className="text-center text-lg font-bold text-[#111827] md:text-xl">
            Students from Around the World
          </h3>
          {/* Mobile: horizontal scroll. md+: 11-column grid → exactly 2 symmetric rows of 11 */}
          <div className="mt-6 flex gap-5 overflow-x-auto pb-3 md:hidden">
            {FLAGS.map((flag) => (
              <div
                key={flag.country}
                className="flex shrink-0 flex-col items-center gap-2"
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-full shadow-md ring-2 ring-gray-100">
                  <Image
                    src={flag.src}
                    alt={`${flag.country} flag`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xs text-gray-500">{flag.country}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 hidden md:grid md:grid-cols-11 md:gap-x-4 md:gap-y-5">
            {FLAGS.map((flag) => (
              <div
                key={flag.country}
                className="flex flex-col items-center gap-2"
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-full shadow-md ring-2 ring-gray-100">
                  <Image
                    src={flag.src}
                    alt={`${flag.country} flag`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <span className="text-center text-xs text-gray-500">
                  {flag.country}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ready to Join — banner image replaces external SVG */}
        <div className="relative mt-14 overflow-hidden bg-[#f5e2bf] px-6 py-8 md:px-10 md:py-10">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_1fr]">
            <div className="relative min-h-52 overflow-hidden md:min-h-64">
              <Image
                src="/assets/img/banner/international.jpeg"
                alt="International students at SVGOI campus"
                fill
                sizes="(max-width: 968px) 100vw, 45vw"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#f5e2bf]/15" />
            </div>

            <div>
              <h3 className="text-2xl font-bold leading-tight text-[#111827] md:text-4xl">
                Ready to Join the Global Learning Community At SVGOI?
              </h3>
              <Link
                href="/admissions"
                className="mt-6 inline-flex items-center bg-[#f7941d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d97706]"
              >
                Apply now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
