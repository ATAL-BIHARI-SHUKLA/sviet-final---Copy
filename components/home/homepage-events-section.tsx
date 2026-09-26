import Image from "next/image";
import Link from "next/link";

import { listFeaturedEvents, listAllEvents } from "@/lib/dal/events";

import { shouldBypassOptimization } from "@/lib/image-utils";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function summary(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}...`;
}

export async function HomepageEventsSection() {
  const [featured, all] = await Promise.all([
    listFeaturedEvents(5),
    listAllEvents(12),
  ]);

  const otherEvents = all.filter((e) => !e.isFeatured).slice(0, 6);

  if (featured.length === 0 && otherEvents.length === 0) return null;

  return (
    <div className="bg-white">
      {/* Signature Campus Events */}
      {featured.length > 0 ? (
        <section className="w-full py-14 md:py-20">
          <div className="mx-auto w-full max-w-360 px-4 md:px-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#1d4ed8]">
                  Featured
                </p>
                <h2 className="mt-2 text-3xl font-bold text-[#111827] md:text-5xl">
                  Signature Campus Events
                </h2>
              </div>
              <Link
                href="/events"
                className="hidden shrink-0 text-sm font-semibold text-[#1d4ed8] hover:underline md:block"
              >
                View all →
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {featured.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                  <article className="h-full overflow-hidden rounded-2xl border border-[#e7e9ef] bg-[#fbfcff] transition-shadow hover:shadow-md">
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized={shouldBypassOptimization(event.image)}
                        className="object-cover object-[50%_20%] transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2 p-5">
                      <span className="inline-block rounded-full bg-[#fff3e0] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[#f97316]">
                        {event.category}
                      </span>
                      <h3 className="text-lg font-semibold leading-tight text-[#0f172a] group-hover:text-[#1d4ed8]">
                        {event.title}
                      </h3>
                      <p className="text-xs font-medium text-[#6b7280]">
                        {formatDate(event.startDate)}
                        {event.venue ? ` · ${event.venue}` : ""}
                      </p>
                      <p className="text-sm leading-relaxed text-[#475569]">
                        {summary(event.description, 120)}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-6 md:hidden">
              <Link
                href="/events"
                className="text-sm font-semibold text-[#1d4ed8] hover:underline"
              >
                View all events →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* More events grid */}
      {otherEvents.length > 0 ? (
        <section className="w-full bg-[#f5f7fb] py-12 md:py-16">
          <div className="mx-auto w-full max-w-360 px-4 md:px-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#f97316]">
                  More from SVGOI
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#111827] md:text-3xl">
                  Recent Campus Events
                </h2>
              </div>
              <Link
                href="/events"
                className="shrink-0 text-sm font-semibold text-[#1d4ed8] hover:underline"
              >
                See all →
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                  <article className="flex h-full gap-4 overflow-hidden rounded-xl border border-[#e8edf7] bg-white p-3 transition-shadow hover:shadow-md">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="112px"
                        unoptimized={shouldBypassOptimization(event.image)}
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#f97316]">
                        {event.category}
                      </p>
                      <h3 className="mt-0.5 text-sm font-semibold leading-snug text-[#111827] group-hover:text-[#1d4ed8]">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-xs text-[#6b7280]">
                        {formatDate(event.startDate)}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
