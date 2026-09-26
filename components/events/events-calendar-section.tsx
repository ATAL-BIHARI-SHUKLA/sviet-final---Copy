import Image from "next/image";
import Link from "next/link";

import type { listAllEvents } from "@/lib/dal/events";

type EventItem = Awaited<ReturnType<typeof listAllEvents>>[number];

type EventsAllSectionProps = {
  events: EventItem[];
  allImages: string[];
};

const COLLAGE_CLASSES = [
  "row-span-2 col-span-1",
  "row-span-1 col-span-1",
  "row-span-1 col-span-1",
  "row-span-1 col-span-2",
  "row-span-2 col-span-1",
  "row-span-1 col-span-1",
  "row-span-1 col-span-1",
  "row-span-1 col-span-1",
  "row-span-1 col-span-2",
];

import { shouldBypassOptimization } from "@/lib/image-utils";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function summary(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}...`;
}

export function EventsAllSection({ events, allImages }: EventsAllSectionProps) {
  return (
    <>
      {/* All other events grid */}
      {events.length > 0 ? (
        <section className="w-full bg-[#f5f7fb] py-12 md:py-16">
          <div className="mx-auto w-full max-w-360 px-4 md:px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#1d4ed8]">
              Campus Events
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#0f172a] md:text-4xl">
              More SVGOI Events
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group block"
                >
                  <article className="h-full overflow-hidden rounded-xl border border-[#e8edf7] bg-white transition-shadow hover:shadow-md">
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        unoptimized={shouldBypassOptimization(event.image)}
                        className="object-cover object-[50%_30%] transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#f97316]">
                        {formatDate(event.startDate)}
                      </p>
                      <h3 className="text-base font-semibold leading-snug text-[#111827] group-hover:text-[#1d4ed8]">
                        {event.title}
                      </h3>
                      {event.venue ? (
                        <p className="text-xs text-[#6b7280]">{event.venue}</p>
                      ) : null}
                      <p className="text-xs leading-relaxed text-[#475569]">
                        {summary(event.description, 100)}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Event Glimpses — unordered mosaic collage */}
      {allImages.length > 0 ? (
        <section className="border-t border-[#e5e7eb] px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f7941d]">
              Event Glimpses
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
              Moments from Our Campus
            </h2>
            <div className="mt-6 grid auto-rows-[140px] grid-cols-3 gap-2 md:auto-rows-[180px] md:gap-3">
              {allImages.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className={`overflow-hidden rounded-xl ${COLLAGE_CLASSES[i % COLLAGE_CLASSES.length]}`}
                >
                  <Image
                    src={src}
                    alt={`Event moment ${i + 1}`}
                    width={600}
                    height={400}
                    unoptimized={shouldBypassOptimization(src)}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
