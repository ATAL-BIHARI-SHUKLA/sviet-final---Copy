import { Suspense } from "react";
import type { Metadata } from "next";

import { PlacementsPageComponent } from "@/components/placements/placements-page";

export const metadata: Metadata = {
  title: "Placements | SVGOI",
  description:
    "Placements at SVGOI with 60 LPA highest package, strong recruiter engagement, and structured career readiness support.",
};

export default function PlacementsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <PlacementsPageComponent />
    </Suspense>
  );
}
