import type { Metadata } from "next";

import { AccreditationsPage } from "@/components/about/accreditations/accreditations-page";

export const metadata: Metadata = {
  title: "Accreditations & Approvals | SVGOI",
  description:
    "Explore SVGOI accreditation status, NAAC quality benchmarks, regulatory recognitions, and institutional memberships.",
};

export default function AboutAccreditationsPage() {
  return <AccreditationsPage />;
}