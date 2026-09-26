import Image from "next/image";

const FRESHERS_CARDS = [
  {
    title: "Concerts & Live Shows",
    image: "/assets/img/show3.jpg",
    alt: "Freshers concert stage",
  },
  {
    title: "Exposure",
    image: "/assets/img/campus-life/image2.png",
    alt: "Freshers games and activities",
  },
  {
    title: "Talent showcases & competitions",
    image: "/assets/img/campus-life/image3.png",
    alt: "Talent showcase at freshers festival",
  },
  {
    title: "Orientation activities",
    image: "/assets/img/campus-life/image4.png",
    alt: "Freshers orientation activities",
  },
] as const;

export function CampusLifeFreshersSection() {
  return (
    <section className="w-full  py-14 md:py-18">
      <div className="mx-auto w-full max-w-360 px-4 md:px-6">
        <p className="text-3xl font-medium text-[#111] md:text-4xl">Fresher&apos;s festival</p>

        <h2 className="mt-4 max-w-6xl text-4xl font-medium leading-tight text-[#161616] md:text-5xl">
          A grand welcome to SVGOI with the finest activities to enrich your journey -
          <br />
          <span className="bg-linear-to-r from-[#1d4ed8] via-[#f7941d] to-[#1d4ed8] bg-clip-text font-semibold text-transparent">
            Freshers&apos; Festival
          </span>
        </h2>

        <p className="mt-6 max-w-5xl text-base leading-relaxed text-[#424242] md:text-xl">
          Your journey at SVGOI kicks off with an epic Freshers&apos; Fest - a vibrant celebration featuring live
          performances, games, and a chance to meet new friends. Step into university life with a bang as we roll out
          the red carpet for you with the finest activities, concerts, and a thrilling experience.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-12 md:gap-5">
          {FRESHERS_CARDS.map((card) => (
            <article key={card.title} className="group relative h-95 overflow-hidden rounded-xl md:h-117.5">
              <Image src={card.image} alt={card.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 px-4 pb-5 md:px-5 md:pb-6">
                <h3 className="max-w-56 text-2xl font-semibold leading-tight text-white md:text-3xl">{card.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
