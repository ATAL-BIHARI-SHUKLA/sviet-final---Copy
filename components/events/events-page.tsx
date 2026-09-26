import {
  getEventDeduplicationKey,
  listFeaturedEvents,
  listAllEvents,
} from "@/lib/dal/events";
import { EventsAllSection } from "@/components/events/events-calendar-section";
import { EventsFeaturedSection } from "@/components/events/events-featured-section";
import { EventsHeroSection } from "@/components/events/events-hero-section";
import { DistinguishedLeadersSection } from "@/components/home/leaders";

export async function EventsPage() {
  const [featured, all] = await Promise.all([
    listFeaturedEvents(5),
    listAllEvents(50),
  ]);

  const featuredKeys = new Set(featured.map(getEventDeduplicationKey));
  const otherEvents = all.filter(
    (event) =>
      !event.isFeatured && !featuredKeys.has(getEventDeduplicationKey(event)),
  );

  // Collect gallery images first, then fall back to cover images
  const allImages = all
    .flatMap((e) => e.images)
    .filter(Boolean)
    .slice(0, 18);

  return (
    <div className="bg-white text-[#111827]">
      <EventsHeroSection />
      <EventsFeaturedSection featuredEvents={featured} />
      <EventsAllSection events={otherEvents} allImages={allImages} />
      <DistinguishedLeadersSection />
    </div>
  );
}
