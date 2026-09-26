"use client";

import { useEffect, useState } from "react";

import { AdmissionsHeroSection } from "@/components/admissions/admissions-hero-section";
import { AdmissionsRelatedLinksSection } from "@/components/admissions/admissions-related-links-section";
import { AdmissionsStudyOverviewSection } from "@/components/admissions/admissions-study-overview-section";
import { AdmissionsValueGridSection } from "@/components/admissions/admissions-value-grid-section";
import { AdmissionsCareerProgramsSection } from "@/components/admissions/admissions-career-programs-section";
import { AdmissionsRecognitionsSection } from "@/components/admissions/admissions-recognitions-section";
import { AdmissionsEnrichingWaysSection } from "@/components/admissions/admissions-enriching-ways-section";
import { AdmissionsHowToApplySection } from "@/components/admissions/admissions-how-to-apply-section";
import { InternationalOpportunitiesSection } from "@/components/international/international-opportunities-section";
import { AdmissionsFinalCtaSection } from "@/components/admissions/admissions-final-cta-section";
import {
  type ProgramOption,
  type ProgramsApiResponse,
} from "@/components/admissions/types";

export default function AdmissionsPage() {
  const [programs, setPrograms] = useState<ProgramOption[]>([]);

  useEffect(() => {
    let active = true;

    const loadPrograms = async () => {
      try {
        const response = await fetch("/api/programs", { cache: "no-store" });
        const payload = (await response.json()) as ProgramsApiResponse;

        if (!active) return;

        if (!response.ok || !payload.success || !Array.isArray(payload.data)) {
          setPrograms([]);
          return;
        }

        setPrograms(payload.data);
      } catch {
        if (active) setPrograms([]);
      }
    };

    loadPrograms();
    return () => { active = false; };
  }, []);

  return (
    <div className="bg-white text-[#111]">
      <AdmissionsHeroSection />
      <div className="mt-20"></div>
      <AdmissionsRecognitionsSection />
      <AdmissionsStudyOverviewSection />
      <AdmissionsHowToApplySection />
      <AdmissionsCareerProgramsSection programs={programs} />
      <AdmissionsValueGridSection />
      <AdmissionsEnrichingWaysSection />
      <AdmissionsRelatedLinksSection />
      <InternationalOpportunitiesSection />
      <AdmissionsFinalCtaSection />
    </div>
  );
}
