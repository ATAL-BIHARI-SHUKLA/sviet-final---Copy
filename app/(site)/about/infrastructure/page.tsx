import type { Metadata } from "next";

import { InfrastructurePage } from "@/components/about/infrastructure/infrastructure-page";

export const metadata: Metadata = {
  title: "Infrastructure | SVGOI",
  description:
    "Explore SVGOI infrastructure across academic facilities, research spaces, sports amenities, and sustainability systems.",
};

export default function AboutInfrastructurePage() {
  return <InfrastructurePage />;
}