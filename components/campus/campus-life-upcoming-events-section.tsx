import Image from "next/image";
import Link from "next/link";

import { getCampusEventsSectionData } from "@/lib/dal/events";

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

import { shouldBypassOptimization } from "@/lib/image-utils";

export async function CampusLifeUpcomingEventsSection() {
  const sectionData = await getCampusEventsSectionData();

  return (
    <section className="w-full  py-14 md:py-18">
      <div className="mx-auto w-full max-w-360 px-4 md:px-6">
        <h2 className="text-4xl font-bold leading-tight tracking-[-0.02em] md:text-5xl">
          <span className="bg-linear-to-r from-[#f7941d] to-[#1d4ed8] bg-clip-text text-transparent">
            Recent events
          </span>
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#424242] md:text-lg">
          Relive the best moments from SVGOI campus events. From tech summits to
          cultural fests, our events bring together students, faculty, and industry
          leaders throughout the year.
        </p>

        <div className="mt-8 flex items-center gap-2 text-2xl font-medium text-[#111827] md:text-3xl">
          <span className="text-[#8f96ad]">▸</span>
          {sectionData.listLabel}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-2xl border border-[#d9ddea] bg-white p-4 shadow-[0_12px_34px_rgba(17,24,39,0.08)] md:p-5">
            {sectionData.featuredEvent ? (
              <Link href={`/events/${sectionData.featuredEvent.slug}`} className="group block">
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={sectionData.featuredEvent.image}
                    alt={sectionData.featuredEvent.title}
                    width={1200}
                    height={760}
                    unoptimized={shouldBypassOptimization(
                      sectionData.featuredEvent.image,
                    )}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-96"
                  />
                </div>
                <div className="mt-5 inline-flex rounded-full bg-[#eef2ff] px-3 py-1 text-sm font-semibold tracking-wide text-[#3348b8]">
                  Featured event
                </div>
                <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#111827] group-hover:text-[#1d4ed8] md:text-4xl">
                  {sectionData.featuredEvent.title}
                </h3>
                <p className="mt-3 text-sm text-[#4b5563] md:text-base">
                  {sectionData.featuredEvent.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[#e6e8f0] pt-4">
                  <p className="text-sm font-semibold text-[#6b7280]">
                    {formatEventDate(sectionData.featuredEvent.startDate)}
                  </p>
                  <span className="inline-flex rounded-full bg-[#f8f0e5] px-3 py-1 text-sm font-semibold uppercase tracking-wide text-[#b45309]">
                    {sectionData.featuredEvent.category}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-[#d7dcef] bg-[#f8faff] p-8 text-center">
                <p className="text-xl font-semibold text-[#1f2937]">
                  No active events
                </p>
                <p className="mt-2 max-w-md text-sm text-[#64748b]">
                  Create upcoming or featured events from the admin dashboard to
                  highlight campus activities here.
                </p>
              </div>
            )}
          </article>

          <div className="rounded-2xl border border-[#d9ddea] bg-white p-3 shadow-[0_12px_30px_rgba(17,24,39,0.06)] md:p-4">
            <div className="max-h-170 overflow-y-auto pr-1 [scrollbar-color:#b7b7d5_transparent] [scrollbar-width:thin]">
              {sectionData.listEvents.length > 0 ? (
                sectionData.listEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group grid gap-4 rounded-xl px-2 py-3 transition hover:bg-[#f8faff] sm:grid-cols-[180px_1fr] md:px-3"
                  >
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={500}
                        height={340}
                        unoptimized={shouldBypassOptimization(event.image)}
                        className="h-28 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold leading-snug text-[#111827] group-hover:text-[#1d4ed8]">
                        {event.title}
                      </h4>
                      <p className="mt-2 line-clamp-2 text-sm text-[#4b5563]">
                        {event.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm font-semibold tracking-wide text-[#6b7280]">
                          {formatEventDate(event.startDate)}
                        </p>
                        <span className="text-sm font-semibold capitalize text-[#1d4ed8] transition group-hover:text-[#f7941d]">
                          {event.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-[#d7dcef] bg-[#f8faff] p-6 text-center">
                  <p className="text-base font-semibold text-[#1f2937]">
                    No events available right now
                  </p>
                  <p className="mt-2 text-sm text-[#64748b]">
                    Add events from the admin dashboard. This section
                    automatically shows upcoming events first and recent
                    completed events when there are no upcoming ones.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
