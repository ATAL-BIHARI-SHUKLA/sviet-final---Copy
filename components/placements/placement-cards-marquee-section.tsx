import Image from "next/image";

import type { ShowcaseCard } from "@/lib/dal/placements";

type Props = {
  cards: ShowcaseCard[];
};

export function PlacementCardsMarqueeSection({ cards }: Props) {
  if (cards.length === 0) return null;

  const doubled = [...cards, ...cards];

  return (
    <div className="mt-8 overflow-hidden px-2 pb-2 md:mt-14 md:px-6">
      <style>{`
        @keyframes placementCardsMarquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }

        .animate-placement-cards-marquee {
          animation: placementCardsMarquee 16s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }

        .placement-card-shell {
          border-top-left-radius: 5rem;
          border-top-right-radius: 5rem;
          clip-path: inset(0 round 5rem 5rem 0 0);
        }

        .placement-card-top {
          border-top-left-radius: 5rem;
          border-top-right-radius: 5rem;
        }

        @media (min-width: 768px) {
          .placement-card-shell,
          .placement-card-top {
            border-top-left-radius: 6rem;
            border-top-right-radius: 6rem;
          }

          .placement-card-shell {
            clip-path: inset(0 round 6rem 6rem 0 0);
          }
        }
      `}</style>

      <div className="flex w-max animate-placement-cards-marquee gap-4 sm:gap-6 md:gap-8">
        {doubled.map((card, index) => (
          <article
            key={`${card.id}-${index}`}
            className="w-48 shrink-0 sm:w-52 md:w-64"
          >
            <div className="placement-card-shell relative h-72 overflow-hidden sm:h-76 md:h-92">
              <div className={`placement-card-top absolute inset-x-0 top-0 h-[80%] ${card.cardTone}`}>
                {card.imageSrc ? (
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 224px, 256px"
                    className="object-contain object-bottom"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-b from-white/20 via-white/10 to-transparent">
                    <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white md:text-sm">
                      Image coming soon
                    </span>
                  </div>
                )}
              </div>

              <div className="absolute inset-x-0 bottom-0">
                <div className="rounded-2xl border border-[#2f266d] bg-[#f2f2f2] px-3 py-2.5 text-center text-[0.65rem] font-medium leading-tight text-black sm:text-xs md:px-4 md:py-3 md:text-sm">
                  {card.name} - {card.packageLabel}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
