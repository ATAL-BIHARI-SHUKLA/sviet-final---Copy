import Image from "next/image";

const PLACEMENT_HIGHLIGHT_CARDS = [
  {
    imageSrc: "/assets/img/college/global_recognition.png",
    imageAlt: "SVGOI ranked first in North India",
  },
  {
    imageSrc: "/assets/img/college/global_recognition.png",
    imageAlt: "SVGOI ranked fourth among top engineering colleges in Punjab",
  },
  {
    imageSrc: "/assets/img/college/global_recognition.png",
    imageAlt:
      "SVGOI ranked eighth among outstanding engineering colleges in India",
  },
  {
    imageSrc: "/assets/img/college/global_recognition.png",
    imageAlt: "Global recognition for excellence in education",
  },
  {
    imageSrc: "/assets/img/college/global_recognition.png",
    imageAlt: "Elets World Education Summit award",
  },
  {
    imageSrc: "/assets/img/college/global_recognition.png",
    imageAlt: "Digital learning recognition",
  },
  {
    imageSrc: "/assets/img/college/global_recognition.png",
    imageAlt: "SVGOI recognition banner",
  },
] as const;

export function PlacementHighlightsSection() {
  return (
    <section className="mt-10 rounded-[36px] bg-[#0b3b8f] px-4 py-10 text-white md:mt-16 md:px-8 md:py-16">
      <div className="text-center">
        <p className="text-2xl font-medium leading-none text-white md:text-[2.15rem]">
          If they did it, so can you
        </p>
        <h3 className="mt-4 text-4xl font-extrabold leading-none tracking-[-0.04em] text-[#fea700] md:text-[4.9rem]">
          Placement Highlights
        </h3>
      </div>

      <div className="relative mt-10 overflow-hidden md:mt-12">
        <style>{`
          @keyframes placementHighlightsMarquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .animate-placement-highlights-marquee {
            animation: placementHighlightsMarquee 34s linear infinite;
          }
        `}</style>

        <div className="flex w-max animate-placement-highlights-marquee gap-4 md:gap-6">
          {[...PLACEMENT_HIGHLIGHT_CARDS, ...PLACEMENT_HIGHLIGHT_CARDS].map(
            (card, index) => (
              <article
                key={`${card.imageSrc}-${index}`}
                className="w-52 shrink-0 rounded-[28px] bg-[#0a2f73] p-3 sm:w-56 md:w-73"
              >
                <div className="relative aspect-4/5 overflow-hidden rounded-[22px] bg-[#08265e]">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 640px) 208px, (max-width: 768px) 224px, 292px"
                    className="object-contain object-center p-1"
                  />
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
