import type { Metadata } from "next";

import { NewInitiativePage } from "@/components/our-initiatives/new-initiative-page";

export const metadata: Metadata = {
  title: "The Uniques | Our Initiatives | SVGOI",
  description:
    "The Uniques Community — a peer-to-peer learning community at SVGOI where students bridge the gap between theory and practice through workshops, study jams, and real-world projects.",
};

export default function Page() {
  return <NewInitiativePage />;
}
