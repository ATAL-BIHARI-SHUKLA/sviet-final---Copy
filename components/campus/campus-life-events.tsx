import Image from "next/image";
import eventsData from "@/data/data/event";

const eventImages = [
  "/assets/img/campus-life/r1c1.png",
  "/assets/img/campus-life/r1c2.png",
  "/assets/img/campus-life/r2c1.png",
  "/assets/img/campus-life/r2c2.png",
  "/assets/img/campus-life/r2c3.png",
  "/assets/img/campus-life/r3c1.png",
  "/assets/img/campus-life/r3c2.png",
];

type CampusEvent = {
  id: number;
  name: string;
  headerImage: string;
  overview: string;
};

const events = (eventsData as CampusEvent[]).slice(0, 7).map((event, index) => ({
  title: event.name,
  text:
    event.overview.length > 120
      ? `${event.overview.slice(0, 117)}...`
      : event.overview,
  image: event.headerImage || eventImages[index] || eventImages[0],
}));

export function CampusLifeEventsSection() {
  return (
    <section className="mt-15 mb-15 mx-auto w-full max-w-[1280px] px-2 pb-8 pt-5 md:px-5 md:pb-12 md:pt-8">
      <h3 className="text-[34px] font-medium uppercase text-[#111] md:text-[40px]">MEMORABLE EVENTS</h3>

      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-3">
        {events.slice(0, 2).map((event, idx) => (
          <article key={`first-${idx}`} className="relative overflow-hidden rounded-md">
            <Image src={event.image} alt={event.title} width={1200} height={800} className="h-[148px] w-full object-cover md:h-[400px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3">
              <h4 className="text-[16px] font-extrabold leading-none text-white md:text-[42px]">{event.title}</h4>
              <p className="mt-1 max-w-[240px] text-[7px] leading-[1.35] text-white/80 md:text-[10px]">{event.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
        {events.slice(2, 5).map((event, idx) => (
          <article key={`second-${idx}`} className="relative overflow-hidden rounded-md">
            <Image src={event.image} alt={event.title} width={1200} height={800} className="h-[148px] w-full object-cover md:h-[400px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3">
              <h4 className="text-[16px] font-extrabold leading-none text-white md:text-[42px]">{event.title}</h4>
              <p className="mt-1 max-w-[240px] text-[7px] leading-[1.35] text-white/80 md:text-[10px]">{event.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-3">
        {events.slice(5, 7).map((event, idx) => (
          <article key={`third-${idx}`} className="relative overflow-hidden rounded-md">
            <Image src={event.image} alt={event.title} width={1200} height={800} className="h-[148px] w-full object-cover md:h-[400px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3">
              <h4 className="text-[16px] font-extrabold leading-none text-white md:text-[42px]">{event.title}</h4>
              <p className="mt-1 max-w-[240px] text-[7px] leading-[1.35] text-white/80 md:text-[10px]">{event.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
