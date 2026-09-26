import type { Metadata } from "next";

import { CareersPage } from "@/components/careers/careers-page";

export const metadata: Metadata = {
  title: "Careers at SVGOI",
  description:
    "Join the Swami Vivekanand Group of Institutes team. Explore current faculty and trainer openings and apply online.",
};

export default function Page() {
  return <CareersPage />;
}
