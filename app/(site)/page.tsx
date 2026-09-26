import type { Metadata } from "next";

import { HomePage } from "@/components/home/homepage";

export const metadata: Metadata = {
  title: "SVGOI | Swami Vivekanand Group of Institutes",
  description:
    "Top engineering and management college group in Punjab. 100% placement assistance, industry partnerships, and world-class infrastructure.",
  openGraph: {
    title: "SVGOI | Premier Institute Group in Punjab",
    description: "Admissions open for B.Tech, MBA, BCA programs. Apply now.",
    type: "website",
  },
};

export default function Page() {
  return <HomePage />;
}
