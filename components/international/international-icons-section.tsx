import Image from "next/image";

import eventsData from "@/data/data/event";

type RawEventJs = {
  id: number;
  name: string;
  headerImage?: string;
  logo?: string;
  overview?: string;
  date?: string;
  venue?: string;
};

type EventCategory = "tech" | "summit" | "cultural" | "sports";

type InternationalEvent = {
  title: string;
  category: EventCategory;
  description: string;
  image?: string;
};

const CATEGORY_LABELS: Record<EventCategory, string> = {
  tech: "Tech & Innovation",
  summit: "Global & Leadership",
  cultural: "Cultural",
  sports: "Sports",
};

const CATEGORY_FALLBACK_IMAGES: Record<EventCategory, string> = {
  tech: "/assets/img/section_card/BharatTech.JPG.jpeg",
  summit: "/assets/img/section_card/GFS.JPG",
  cultural: "/assets/img/section_card/Spont.jpeg",
  sports: "/assets/img/section_card/Sportsmania.jpeg",
};

const CATEGORY_MATCHERS: Record<EventCategory, RegExp[]> = {
  tech: [/techxperience/i, /devfest/i, /techathon/i],
  summit: [/tedx/i, /global futures summit/i],
  cultural: [/elevate/i, /spontania/i],
  sports: [/sportsmania/i, /tournament/i],
};

const CARD_GROUPS: Array<{
  title: string;
  description: string;
  category: EventCategory;
  accent: string;
}> = [
  {
    title: "Tech & innovation events",
    description:
      "Participate in hackathons and tech events like DevFest Chandigarh and Bharat TechXperience.",
    category: "tech",
    accent: "from-[#0f766e] to-[#2563eb]",
  },
  {
    title: "Global & leadership platforms",
    description:
      "Engage in TEDx SVGOI and Global Futures Summit to explore ideas and leadership insights.",
    category: "summit",
    accent: "from-[#7c3aed] to-[#1d4ed8]",
  },
  {
    title: "Cultural & campus life",
    description:
      "Experience vibrant fests like Elevate and Spontania celebrating creativity and student talent.",
    category: "cultural",
    accent: "from-[#f97316] to-[#dc2626]",
  },
  {
    title: "Sports & community engagement",
    description:
      "Be part of Sportsmania and tournaments that build teamwork and campus connections.",
    category: "sports",
    accent: "from-[#0f766e] to-[#0f172a]",
  },
] as const;

function normalizeEvent(event: RawEventJs): InternationalEvent | null {
  const title = event.name.trim();
  const description = (event.overview ?? "").trim();
  const image = event.headerImage || event.logo || undefined;
  const normalizedTitle = title.toLowerCase();

  const category = (Object.keys(CATEGORY_MATCHERS) as EventCategory[]).find(
    (key) =>
      CATEGORY_MATCHERS[key].some((pattern) => pattern.test(normalizedTitle)),
  );

  if (!category) {
    return null;
  }

  return {
    title,
    category,
    description,
    image,
  };
}

function formatEventTitles(events: InternationalEvent[], fallback: string) {
  const titles = events.slice(0, 2).map((event) => event.title);

  return titles.length > 0 ? titles.join(", ") : fallback;
}

const internationalEvents = (eventsData as RawEventJs[])
  .map(normalizeEvent)
  .filter((event): event is InternationalEvent => Boolean(event));

const techEvents = internationalEvents.filter(
  (event) => event.category === "tech",
);
const globalEvents = internationalEvents.filter(
  (event) => event.category === "summit",
);
const culturalEvents = internationalEvents.filter(
  (event) => event.category === "cultural",
);
const sportsEvents = internationalEvents.filter(
  (event) => event.category === "sports",
);

const EVENT_GROUPS = {
  tech: techEvents,
  summit: globalEvents,
  cultural: culturalEvents,
  sports: sportsEvents,
} as const;

export function InternationalIconsSection() {
  return (
    <section className="bg-background py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold leading-tight text-[#111827] md:text-5xl">
            Get Global Exposure Through Events &amp; Campus Experiences
          </h2>
          <p className="mt-3 text-base text-[#374151] md:text-lg">
            Be part of real campus events that connect you with innovation,
            culture, and global collaboration.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {CARD_GROUPS.map((group) => {
            const events = EVENT_GROUPS[group.category];
            const featuredTitles = formatEventTitles(
              events,
              CATEGORY_LABELS[group.category],
            );
            const featuredEvent = events[0];

            return (
              <article
                key={group.title}
                className={`group flex h-full min-h-80 flex-col overflow-hidden rounded-3xl bg-linear-to-br ${group.accent} p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.24)] md:p-7`}
              >
                <div className="flex h-full flex-col">
                  {featuredEvent?.image ? (
                    <div className="relative mb-5 h-40 overflow-hidden rounded-2xl border border-white/15 bg-white/10 md:h-44">
                      <Image
                        src={
                          CATEGORY_FALLBACK_IMAGES[group.category]
                        }
                        alt={featuredEvent.title}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                      {CATEGORY_LABELS[group.category]}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-tight md:text-[1.35rem]">
                      {group.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/90 md:text-[0.95rem] md:leading-7">
                      {group.description}
                    </p>
                    <div className="mt-4 text-sm font-medium text-white/80">
                      {featuredTitles}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
