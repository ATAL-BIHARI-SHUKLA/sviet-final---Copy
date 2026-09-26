import Image from "next/image";
import Link from "next/link";

import type { listFeaturedEvents } from "@/lib/dal/events";

type FeaturedEvent = Awaited<ReturnType<typeof listFeaturedEvents>>[number];

type EventsFeaturedSectionProps = {
  featuredEvents: FeaturedEvent[];
};

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

export function EventsFeaturedSection({
  featuredEvents,
}: EventsFeaturedSectionProps) {
  if (featuredEvents.length === 0) return null;

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-360 px-4 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#1d4ed8]">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#111827] md:text-5xl">
              Signature Campus Events
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featuredEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="group block"
            >
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
                <div className="space-y-3 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#f97316]">
                    {formatDate(event.startDate)}
                  </p>
                  <h3 className="text-xl font-semibold leading-tight text-[#0f172a]">
                    {event.title}
                  </h3>
                  {event.venue ? (
                    <p className="text-sm text-[#475569]">{event.venue}</p>
                  ) : null}
                  <p className="text-sm leading-relaxed text-[#475569]">
                    {summary(event.description, 145)}
                  </p>
                  <span className="inline-block text-sm font-semibold text-[#1d4ed8] group-hover:underline">
                    View Event →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
