import type { Metadata } from "next";

import { S60Page } from "@/components/our-initiatives/s60-page";

export const metadata: Metadata = {
  title: "S60 | Our Initiatives | SVGOI",
  description:
    "Super 60 — SVGOI's flagship placement-readiness program that selects and trains 60 high-potential students for top-tier industry roles.",
};

export default function Page() {
  return <S60Page />;
}
