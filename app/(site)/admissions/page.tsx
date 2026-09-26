import { Suspense } from "react";
import type { Metadata } from "next";

import AdmissionsPageClient from "@/components/admissions/admissions-page";

export const metadata: Metadata = {
  title: "Admissions 2025 | SVGOI",
  description:
    "Apply for admission to B.Tech, MBA, BCA programs at SVGOI. Check eligibility, scholarship options, and admission procedure.",
};

export default function AdmissionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AdmissionsPageClient />
    </Suspense>
  );
}
