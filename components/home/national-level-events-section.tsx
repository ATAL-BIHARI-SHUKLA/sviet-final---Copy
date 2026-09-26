import { listAllEvents } from "@/lib/dal/events";
import {
  CurriculumOpportunitiesSection,
  type CurriculumEvent,
} from "@/components/home/curriculum-opportunities";

function fmt(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function NationalLevelEventsSection() {
  const events = await listAllEvents(12);

  if (events.length === 0) {
    return <CurriculumOpportunitiesSection />;
  }

  const mapped: CurriculumEvent[] = events.map((e, i) => ({
    id: i + 1,
    slug: e.slug,
    name: e.title,
    mainCard: {
      title: e.title,
      description: e.description,
      image: e.image,
    },
    stats: [
      {
        image: e.images[0] ?? e.image,
        label: fmt(e.startDate),
      },
    ],
    videos: [
      {
        image: e.images[1] ?? e.images[0] ?? e.image,
        label: e.venue ?? "SVGOI Campus",
      },
    ],
  }));

  return <CurriculumOpportunitiesSection events={mapped} />;
}
