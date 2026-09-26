import Image from "next/image";

const CONCERT_CARDS = [
  {
    title: "Anuv Jain live in concert",
    image: "/assets/img/show.jpg",
    alt: "Anuv Jain live performance",
  },
  {
    title: "Supersonic EDM night",
    image: "/assets/img/campus-life/r2c2.png",
    alt: "EDM night stage",
  },
  {
    title: "Vishal Shekhar concert",
    image: "/assets/img/show2.jpg",
    alt: "Vishal Shekhar concert",
  },
  {
    title: "Bollywood fusion night",
    image: "/assets/img/campus-life/r3c1.png",
    alt: "Bollywood fusion music event",
  },
] as const;

export function CampusLifeConcertsSection() {
  return (
    <section className="w-full  py-14 md:py-18">
      <div className="mx-auto w-full max-w-360 px-4 md:px-6">
        <p className="inline-flex rounded-full bg-[#e9eeff] px-4 py-1.5 text-sm font-semibold tracking-wide text-[#2840b8] md:text-base">
          Concerts & EDMs
        </p>
        <h2 className="mt-5 max-w-6xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-[#161616] md:text-6xl">
          <span className="bg-linear-to-r from-[#1d4ed8] to-[#f7941d] bg-clip-text text-transparent">
            From EDM nights
          </span>{" "}
          that keep you dancing till dawn to soulful live concerts
        </h2>
        <p className="mt-6 max-w-5xl text-base leading-relaxed text-[#465064] md:text-xl">
          Experience the thrill of live music with some of the biggest artists
          and DJs lighting up the stage at SVGOI. Annually, our music festivals
          bring together genres from rock and pop to Bollywood fusion, ensuring
          there is something for everyone.
        </p>

        <div className="mt-10 flex items-center gap-3 text-2xl font-semibold text-[#1e1e1e] md:text-4xl">
          <span className="text-[#8e95ab]">▸</span>A glimpse of SVGOI concerts
          and EDM
        </div>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:mt-10 md:gap-5">
          {CONCERT_CARDS.map((card, index) => (
            <article
              key={card.title}
              className="group relative h-70.5 min-w-75 snap-start overflow-hidden rounded-2xl border border-white/40 shadow-[0_14px_30px_rgba(17,24,39,0.16)] md:h-120 md:min-w-100"
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 768px) 300px, 420px"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/8" />
              {/* <div className="absolute left-4 top-4 inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-semibold tracking-wide text-white backdrop-blur-sm md:left-5 md:top-5">
                Live event {String(index + 1).padStart(2, "0")}
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-white/12 p-4 backdrop-blur-sm md:inset-x-5 md:bottom-5 md:p-5">
                <h3 className="text-2xl font-semibold leading-tight text-white md:text-4xl">{card.title}</h3>
              </div> */}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
