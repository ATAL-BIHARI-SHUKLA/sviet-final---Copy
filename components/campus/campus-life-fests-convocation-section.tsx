import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

type FestCard = {
  title: string;
  subtitle: string;
  image: string;
  className: string;
  overlayOnly?: boolean;
};

const FEST_CARDS: FestCard[] = [
  {
    title: "SVGOI Navratri",
    subtitle: "With traditional Garba nights",
    image: "/assets/img/campus-life/r1c1.png",
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    title: "Holi",
    subtitle: "Sharing colors, music and food",
    image: "/assets/img/campus-life/r2c1.png",
    className: "lg:row-span-2",
  },
  {
    title: "Pongal",
    subtitle: "Spreading the diversity of the South",
    image: "/assets/img/campus-life/r2c3.png",
    className: "lg:row-span-2",
  },
  {
    title: "Christmas",
    subtitle: "Sharing the joys of the season",
    image: "/assets/img/campus-life/image2.png",
    className: "lg:row-span-1",
  },
  {
    title: "Chandigarh fashion week",
    subtitle: "Annual technology festival and leading events",
    image: "/assets/img/campus-life/image3.png",
    className: "lg:col-span-2 lg:row-span-1",
  },
];

export function CampusLifeFestsConvocationSection() {
  return (
    <section className="w-full  py-14 md:py-18">
      <div className="mx-auto w-full max-w-360 px-4 md:px-6">
        {/* <header
          id="campus-festivals"
          className="mx-auto max-w-5xl scroll-mt-36 text-center md:scroll-mt-44"
        >
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
            <span className="bg-linear-to-r from-[#1d4ed8] via-[#f7941d] to-[#1d4ed8] bg-clip-text text-transparent">
              Campus Fests & Cultural Carnivals
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#2e2e2e] md:text-lg">
            Experience the magic of SVGOI&apos;s annual festivals, from
            Navratri, Diwali, Holi, and Christmas celebrations to theme-based
            cultural events. Each festival brings a new wave of joy and
            unforgettable moments.
          </p>
        </header> */}
        {/* 
        <div className="mt-10 grid grid-cols-1 gap-6 auto-rows-[260px] sm:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense lg:gap-6">
          {FEST_CARDS.map((card) => (
            <article
              key={card.title}
              className={`group relative h-72 w-full overflow-hidden rounded-2xl border border-white/50 bg-white shadow-[0_12px_30px_rgba(17,24,39,0.12)] transition duration-500 hover:shadow-[0_18px_40px_rgba(17,24,39,0.18)] sm:h-80 lg:h-full ${card.className}`}
            >
              {!card.overlayOnly ? (
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-105"
                />
              ) : (
                <div className="h-full w-full bg-linear-to-br from-[#4f8a8f] via-[#4f8790] to-[#4f7fa1]">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.26)_0,rgba(255,255,255,0.08)_18%,transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.15)_0,transparent_28%)]" />
                </div>
              )}
              <div className="absolute inset-0 border border-white/10 bg-black/30" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between px-3 py-3 md:px-4 md:py-4">
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                  Festive moment
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/18 text-white">
                  {card.overlayOnly ? "✦" : "•"}
                </span>
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/15 bg-black/25 p-6 md:inset-x-5 md:bottom-5 md:p-8">
                <h3 className="text-lg font-semibold leading-tight text-white md:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/85 md:text-sm">
                  {card.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div> */}

        <div className="mt-12 grid items-center gap-8 md:mt-16 md:grid-cols-[1.15fr_0.85fr]">
          <div id="campus-convocation" className="scroll-mt-36 md:scroll-mt-44">
            <h3 className="text-4xl font-medium leading-tight text-[#151515] md:text-5xl">
              The Grand Send-Off
              <br />
              <span className="bg-linear-to-r from-[#1d4ed8] to-[#f7941d] bg-clip-text font-semibold text-transparent">
                Convocation
              </span>
            </h3>
            <p className="mt-5 text-base leading-relaxed text-[#2f2f2f] md:text-lg">
              The annual Convocation Ceremony at SVGOI is not just the end of an
              academic chapter; it is a monumental, grand-scale celebration that
              marks the beginning of your professional journey and a powerful
              tradition of excellence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#2f2f2f] md:text-lg">
              Each year, the Convocation honors a massive graduating cohort with
              over 4000 students across diverse disciplines, with nationally and
              internationally renowned chief guests and guests of honour.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-xl bg-white p-2">
            <div className="col-span-2 overflow-hidden rounded-lg">
              <Image
                src="/assets/img/con1.JPG"
                alt="Convocation ceremony"
                width={900}
                height={500}
                className="h-44 w-full object-cover md:h-52"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/assets/img/con2.JPG"
                alt="Convocation graduates"
                width={500}
                height={500}
                className="h-30 w-full object-cover md:h-36"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/assets/img/con3.JPG"
                alt="Convocation celebration"
                width={500}
                height={500}
                className="h-30 w-full object-cover md:h-36"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl bg-linear-to-r from-[#0f2a6d] to-[#1d4ed8] p-6 text-white md:mt-16 md:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_220px]">
            <div>
              <p className="text-lg font-semibold text-white/85 md:text-xl">
                Never get lost
              </p>
              <h4 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
                Connect with the world of SVGOI on Instagram
              </h4>
              <p className="mt-3 text-sm text-white/85 md:text-base">
                Click the link or scan QR code to connect with us
              </p>
              <a
                href="https://www.instagram.com/svietofficial/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#2a2a2a]">
                  <FaInstagram className="text-[#c13584]" />
                  sviet_official
                </div>
              </a>
            </div>

            <div className="mx-auto h-44 w-44 rounded-xl p-3 md:h-52 md:w-52">
              <Image
                src="/assets/img/svietofficial_qr.png"
                alt="Instagram post 1"
                width={100}
                height={100}
                className="md:h-52 md:w-52 h-44 w-44 -mt-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
