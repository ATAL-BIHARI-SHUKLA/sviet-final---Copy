"use client";

import Image from "next/image";

const ROW_1 = [
  {
    name: "Bajaj Auto",
    src: "/assets/img/companies/Bajaj_Auto_Ltd_logo.svg.png",
  },
  { name: "HDFC Bank", src: "/assets/img/companies/HDFC.webp" },
  { name: "Accenture", src: "/assets/img/companies/accenture.png" },
  { name: "Amazon", src: "/assets/img/companies/amazon.png" },
  { name: "Bebo", src: "/assets/img/companies/bebo.png" },
  { name: "BOA", src: "/assets/img/companies/boa.webp" },
  { name: "CC", src: "/assets/img/companies/cc.png" },
  { name: "Chetu", src: "/assets/img/companies/chetu.png" },
  { name: "Credflow", src: "/assets/img/companies/credflow-logo.png" },
  { name: "Dabur", src: "/assets/img/companies/dabur.png" },
  { name: "Escalon", src: "/assets/img/companies/escalon.png" },
  { name: "Fisco", src: "/assets/img/companies/fisco.png" },
];

const ROW_2 = [
  { name: "Grazetti", src: "/assets/img/companies/grazetti.jpg" },
  { name: "Jio Digital", src: "/assets/img/companies/jio_digital.png" },
  { name: "Mamsys", src: "/assets/img/companies/mamsys.png" },
  {
    name: "Park Hospital",
    src: "/assets/img/companies/park-hospital-logo.webp",
  },
  { name: "Pysoft", src: "/assets/img/companies/pysoft_logo.jpg" },
  { name: "Rapido", src: "/assets/img/companies/rapoido%20logo.png" },
  { name: "Reliance", src: "/assets/img/companies/reliance.webp" },
  { name: "Sopra", src: "/assets/img/companies/sopra.png" },
  { name: "Tata", src: "/assets/img/companies/tata.webp" },
  { name: "Wipro", src: "/assets/img/companies/wipro.png" },
];

export function HiringPartners() {
  return (
    <section className="w-full bg-white py-8 md:py-16">
      <style>{`
        @keyframes slideLeft {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes slideRight {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        .animate-slide-left  { animation: slideLeft  28s linear infinite; will-change: transform; backface-visibility: hidden; }
        .animate-slide-right { animation: slideRight 28s linear infinite; will-change: transform; backface-visibility: hidden; }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex justify-center px-2 md:mb-12">
          <div className="rounded-lg border border-[#0b3b8f]/20 bg-[#0b3b8f] px-5 py-3 sm:px-8 sm:py-4">
            <h2 className="whitespace-nowrap text-center text-lg font-bold text-white sm:text-2xl md:text-3xl">
              Our Hiring Partners
            </h2>
          </div>
        </div>

        <p className="mx-auto mb-6 max-w-4xl text-center text-sm leading-relaxed text-[#4b5563] md:mb-10 md:text-base">
          SVGOI takes pride in building strong relationships with leading
          companies across industries. Our placement cell continuously expands
          its recruiter network to provide diverse career opportunities to
          students.
        </p>

        <div className="space-y-8">
          {/* Row 1 — left */}
          <div className="overflow-hidden">
            <div className="flex gap-5 animate-slide-left sm:gap-8">
              {[...ROW_1, ...ROW_1].map((partner, i) => (
                <div
                  key={`r1-${i}`}
                  className="flex h-14 w-24 shrink-0 items-center justify-center sm:h-16 sm:w-28 md:h-20 md:w-36"
                >
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    width={130}
                    height={70}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — right */}
          <div className="overflow-hidden">
            <div className="flex gap-5 animate-slide-right sm:gap-8">
              {[...ROW_2, ...ROW_2].map((partner, i) => (
                <div
                  key={`r2-${i}`}
                  className="flex h-14 w-24 shrink-0 items-center justify-center sm:h-16 sm:w-28 md:h-20 md:w-36"
                >
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    width={130}
                    height={70}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
