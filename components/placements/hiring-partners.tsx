"use client";

import Image from "next/image";

const ROW_1 = [
  {
    name: "Bajaj Auto",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443461/sviet_assets/companies/Bajaj_Auto_Ltd_logo.svg.png",
  },
  { name: "HDFC Bank", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443455/sviet_assets/companies/HDFC.webp" },
  { name: "Accenture", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443467/sviet_assets/companies/accenture.png" },
  { name: "Amazon", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443461/sviet_assets/companies/amazon.png" },
  { name: "Bebo", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443461/sviet_assets/companies/bebo.png" },
  { name: "BOA", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443461/sviet_assets/companies/boa.webp" },
  { name: "CC", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443461/sviet_assets/companies/cc.png" },
  { name: "Chetu", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443457/sviet_assets/companies/chetu.png" },
  { name: "Credflow", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443457/sviet_assets/companies/credflow-logo.png" },
  { name: "Dabur", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443457/sviet_assets/companies/dabur.png" },
  { name: "Escalon", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443457/sviet_assets/companies/escalon.png" },
  { name: "Fisco", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443457/sviet_assets/companies/fisco.png" },
];

const ROW_2 = [
  { name: "Grazetti", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443454/sviet_assets/companies/grazetti.jpg" },
  { name: "Jio Digital", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443455/sviet_assets/companies/jio_digital.png" },
  { name: "Mamsys", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443455/sviet_assets/companies/mamsys.png" },
  {
    name: "Park Hospital",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443454/sviet_assets/companies/park-hospital-logo.webp",
  },
  { name: "Pysoft", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443450/sviet_assets/companies/pysoft_logo.jpg" },
  { name: "Rapido", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443450/sviet_assets/companies/rapoido%20logo.png" },
  { name: "Reliance", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443450/sviet_assets/companies/reliance.webp" },
  { name: "Sopra", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443450/sviet_assets/companies/sopra.png" },
  { name: "Tata", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443450/sviet_assets/companies/tata.webp" },
  { name: "Wipro", src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443449/sviet_assets/companies/wipro.png" },
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
