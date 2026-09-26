import { Suspense } from "react";
import type { Metadata } from "next";

import { PlacementsPageComponent } from "@/components/placements/placements-page";

export const metadata: Metadata = {
  title: "Placements | SVGOI",
  description:
    "Explore SVGOI placements with recruiter engagement, career preparation support, and student outcome-focused training pathways.",
};

export default function AboutPlacementsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <PlacementsPageComponent />
    </Suspense>
  );
}