import type { Metadata } from "next";

import { EventsPage as EventsPageView } from "@/components/events/events-page";

export const metadata: Metadata = {
  title: "Events | SVGOI",
  description:
    "Completed event highlights, guest sessions, and campus glimpses at SVGOI.",
};

export default function EventsPage() {
  return <EventsPageView />;
}
