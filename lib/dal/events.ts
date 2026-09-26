import "server-only";

import { prisma } from "@/lib/prisma";
import { getTodayStart } from "@/lib/events/status";
import type { RegisterEventInput } from "@/lib/validation/events";
import { safeRead } from "@/lib/dal/safe-read";

export type CampusEventListItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  venue: string | null;
  startDate: Date;
  endDate: Date | null;
  category: string;
  isFeatured: boolean;
  images: string[];
  createdAt: Date;
};

export type CampusEventsSectionData = {
  featuredEvent: CampusEventListItem | null;
  listEvents: CampusEventListItem[];
  listLabel: "Next big events" | "Recent events";
  hasUpcomingEvents: boolean;
};

type EventDeduplicationKey = {
  title: string;
  startDate: Date;
  endDate: Date | null;
};

export function getEventDeduplicationKey(event: EventDeduplicationKey) {
  return [
    event.title.trim().toLowerCase(),
    event.startDate.toISOString(),
    event.endDate?.toISOString() ?? "",
  ].join("|");
}

export function dedupeEvents<T extends EventDeduplicationKey>(events: T[]) {
  const seen = new Set<string>();

  return events.filter((event) => {
    const key = getEventDeduplicationKey(event);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export async function listUpcomingEvents(limit?: number) {
  const todayStart = getTodayStart();

  const events = await safeRead(
    () =>
      prisma.event.findMany({
        where: { startDate: { gte: todayStart } },
        orderBy: { startDate: "asc" },
        take: limit,
      }),
    [],
  );

  return dedupeEvents(events);
}

export async function listRecentEvents(limit = 6) {
  const events = await safeRead(
    () =>
      prisma.event.findMany({
        orderBy: { startDate: "desc" },
        take: limit,
      }),
    [],
  );

  return dedupeEvents(events);
}

export async function listFeaturedEvents(limit = 5) {
  const events = await safeRead(
    () =>
      prisma.event.findMany({
        where: { isFeatured: true },
        orderBy: { startDate: "desc" },
        take: limit,
        include: { speakers: { orderBy: { displayOrder: "asc" } } },
      }),
    [],
  );

  return dedupeEvents(events);
}

export async function listAllEvents(limit = 50) {
  const events = await safeRead(
    () =>
      prisma.event.findMany({
        orderBy: { startDate: "desc" },
        take: limit,
        include: { speakers: { orderBy: { displayOrder: "asc" } } },
      }),
    [],
  );

  return dedupeEvents(events);
}

export async function getEventBySlug(slug: string) {
  return safeRead(
    () =>
      prisma.event.findUnique({
        where: { slug },
        include: { speakers: { orderBy: { displayOrder: "asc" } } },
      }),
    null,
  );
}

export async function getCampusEventsSectionData(): Promise<CampusEventsSectionData> {
  const todayStart = getTodayStart();

  const [featuredEvent, upcomingEvents, recentEvents] = await safeRead(
    () =>
      Promise.all([
        prisma.event.findFirst({
          where: { isFeatured: true },
          orderBy: { startDate: "desc" },
        }),
        prisma.event.findMany({
          where: { startDate: { gte: todayStart } },
          orderBy: { startDate: "asc" },
          take: 5,
        }),
        prisma.event.findMany({
          where: { startDate: { lt: todayStart } },
          orderBy: { startDate: "desc" },
          take: 5,
        }),
      ]),
    [null, [], []] as const,
  );

  const hero = featuredEvent ?? upcomingEvents[0] ?? recentEvents[0] ?? null;
  const hasUpcomingEvents = upcomingEvents.length > 0;

  // Upcoming first, then recent past — exclude the hero card and duplicates.
  const listEvents = dedupeEvents([...upcomingEvents, ...recentEvents])
    .filter((e) => e.id !== hero?.id)
    .slice(0, 4);

  return {
    featuredEvent: hero,
    listEvents,
    listLabel: hasUpcomingEvents ? "Next big events" : "Recent events",
    hasUpcomingEvents,
  };
}

export async function registerForEvent(data: RegisterEventInput) {
  return prisma.eventRegistration.create({ data });
}
