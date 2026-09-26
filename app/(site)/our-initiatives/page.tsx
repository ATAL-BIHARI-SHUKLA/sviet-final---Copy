import type { Metadata } from "next";

import { NewInitiativePage } from "@/components/our-initiatives/new-initiative-page";

export const metadata: Metadata = {
  title: "Our Initiatives | SVGOI",
  description:
    "Explore SVIET's flagship student initiatives — The Uniques, Super 60, and the UNIQUE ZONE incubation center. Innovation, entrepreneurship, and student leadership.",
};

export default function Page() {
  return <NewInitiativePage />;
}
