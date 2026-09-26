import type { Metadata } from "next";

import { LeadershipPage } from "@/components/about/leadership-page";

export const metadata: Metadata = {
  title: "Leadership | SVGOI",
  description: "Learn how SVGOI leadership drives institutional direction, academic quality, and student-first outcomes.",
};

export default function AboutLeadershipPage() {
  return <LeadershipPage />;
}