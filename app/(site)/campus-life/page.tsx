import type { Metadata } from "next";

import { CampusLifeExactPage } from "@/components/campus/campus-life-page";

export const metadata: Metadata = {
  title: "Campus Life | SVGOI",
  description:
    "Experience vibrant campus life at SVGOI. Explore hostels, sports facilities, cultural events, and student activities.",
};

export default function CampusLifePage() {
  return <CampusLifeExactPage />;
}
