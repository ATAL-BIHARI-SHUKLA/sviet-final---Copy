import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

import { getEventBySlug, listAllEvents } from "@/lib/dal/events";
import { shouldBypassOptimization } from "@/lib/image-utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const events = await listAllEvents(100);
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return {
    title: `${event.title} | SVGOI Events`,
    description: event.description.slice(0, 160),
  };
}

function formatDate(date: Date, endDate?: Date | null) {
  const fmt = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  if (endDate && endDate.toDateString() !== date.toDateString()) {
    return `${fmt.format(date)} – ${fmt.format(endDate)}`;
  }
  return fmt.format(date);
}

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

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const speakers = event.speakers ?? [];
  const glimpses = event.images ?? [];
  const dateLabel = formatDate(event.startDate, event.endDate);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#0f172a]">
        <div className="relative h-72 w-full md:h-105 lg:h-130">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              sizes="100vw"
              unoptimized={shouldBypassOptimization(event.image)}
              className="object-cover object-center opacity-70"
            />
          ) : null}
          <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-10 md:px-8 md:pb-14">
          <div className="mx-auto w-full max-w-5xl">
            <Link
              href="/events"
              className="mb-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.18em] text-white/60 hover:text-white"
            >
              ← All Events
            </Link>
            <span className="mb-3 inline-block rounded-full bg-[#f7941d] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {event.category}
            </span>
            <h1 className="text-3xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              {event.title}
            </h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <span className="text-[#f7941d]">📅</span> {dateLabel}
              </span>
              {event.venue ? (
                <span className="flex items-center gap-1">
                  <span className="text-[#f7941d]">📍</span> {event.venue}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Overview + sidebar */}
      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f7941d]">
                Event Overview
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#374151] md:text-lg">
                {event.description}
              </p>
              {event.driveGalleryUrl ? (
                <a
                  href={event.driveGalleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 bg-[#f7941d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d97706]"
                >
                  View Photo Gallery →
                </a>
              ) : null}
            </div>

            <aside className="rounded-2xl border border-[#e5e7eb] bg-[#f8faff] p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                Event Details
              </h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-[#9ca3af]">Date</dt>
                  <dd className="mt-1 font-medium text-[#111827]">
                    {dateLabel}
                  </dd>
                </div>
                {event.venue ? (
                  <div>
                    <dt className="font-semibold text-[#9ca3af]">Venue</dt>
                    <dd className="mt-1 font-medium text-[#111827]">
                      {event.venue}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="font-semibold text-[#9ca3af]">Category</dt>
                  <dd className="mt-1 font-medium capitalize text-[#111827]">
                    {event.category}
                  </dd>
                </div>
                {speakers.length > 0 ? (
                  <div>
                    <dt className="font-semibold text-[#9ca3af]">Speakers</dt>
                    <dd className="mt-1 font-medium text-[#111827]">
                      {speakers.length} Speaker
                      {speakers.length !== 1 ? "s" : ""}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Speakers — only rendered when speakers exist */}
      {speakers.length > 0 ? (
        <section className="border-t border-[#e5e7eb] bg-[#f5f7fb] px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f7941d]">
              Guest Speakers
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
              Meet the Speakers
            </h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {speakers.map((speaker) => (
                <article
                  key={speaker.id}
                  className="rounded-2xl border border-[#dce7ff] bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    {speaker.photo ? (
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#f7941d]/20 bg-[#eef4ff]">
                        <Image
                          src={speaker.photo}
                          alt={speaker.name}
                          fill
                          sizes="64px"
                          className="object-cover object-top"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-xl font-bold text-[#1d4ed8]">
                        {speaker.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold leading-snug text-[#111827]">
                        {speaker.name}
                      </h3>
                      {speaker.designation ? (
                        <p className="mt-0.5 text-sm font-semibold text-[#f7941d]">
                          {speaker.designation}
                        </p>
                      ) : null}
                      {speaker.company ? (
                        <p className="mt-0.5 text-sm text-[#6b7280]">
                          {speaker.company}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {speaker.bio ? (
                    <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                      {speaker.bio}
                    </p>
                  ) : null}

                  {speaker.linkedin || speaker.twitter ? (
                    <div className="mt-3 flex items-center gap-2">
                      {speaker.linkedin ? (
                        <a
                          href={speaker.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${speaker.name} LinkedIn`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0077b5] text-white transition hover:opacity-80"
                        >
                          <FaLinkedinIn size={13} />
                        </a>
                      ) : null}
                      {speaker.twitter ? (
                        <a
                          href={
                            speaker.twitter.startsWith("http")
                              ? speaker.twitter
                              : `https://twitter.com/${speaker.twitter.replace("@", "")}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${speaker.name} Twitter`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1da1f2] text-white transition hover:opacity-80"
                        >
                          <FaTwitter size={13} />
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Event Glimpses — unordered mosaic collage */}
      {glimpses.length > 0 ? (
        <section className="border-t border-[#e5e7eb] px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f7941d]">
              Event Glimpses
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
              Moments from the Event
            </h2>
            <div className="mt-6 grid auto-rows-[140px] grid-cols-3 gap-2 md:auto-rows-[180px] md:gap-3">
              {glimpses.map((src, i) => (
                <div
                  key={src}
                  className={`overflow-hidden rounded-xl ${COLLAGE_CLASSES[i % COLLAGE_CLASSES.length]}`}
                >
                  <Image
                    src={src}
                    alt={`${event.title} moment ${i + 1}`}
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

      {/* CTA */}
      <section className="bg-[#111827] px-4 py-12 text-center md:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Experience SVGOI&apos;s Vibrant Campus Life
          </h2>
          <p className="mt-3 text-sm text-white/70">
            Events like this are just one part of what makes SVGOI a hub for
            learning, innovation, and growth.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/events"
              className="border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              ← Back to Events
            </Link>
            <Link
              href="/admissions"
              className="bg-[#f7941d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d97706]"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
