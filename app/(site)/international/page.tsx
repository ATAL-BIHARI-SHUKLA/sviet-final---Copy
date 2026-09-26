import { InternationalAchievementsSection } from "@/components/international/international-achievements-section";
import { InternationalAdmissionsHelpSection } from "@/components/international/international-admissions-help-section";
import { InternationalFacilitiesSection } from "@/components/international/international-facilities-section";
import { InternationalHeroIntroSection } from "@/components/international/international-hero-intro-section";
import { InternationalIconsSection } from "@/components/international/international-icons-section";
import { InternationalLeadershipSection } from "@/components/international/international-leadership-section";
import { InternationalOpportunitiesSection } from "@/components/international/international-opportunities-section";
import { InternationalProgramPathwaysSection } from "@/components/international/international-program-pathways-section";
import { InternationalStudentTestimonialsSection } from "@/components/international/international-student-testimonials-section";

export default function InternationalPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#111827]">
      {/* Video Hero */}
      <section className="-mt-30 w-full">
        <div className="relative h-screen w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="International campus glimpse video"
          >
            <source
              src="https://res.cloudinary.com/qbxjwpwp/video/upload/v1790443442/sviet_assets/inter/INTERNATIONAL%20GLIMPSE%203%20MIN.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="relative flex h-full flex-col items-start justify-center px-8 pt-30 text-white md:px-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FEA700]">
              SVGOI International
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Your World Begins Here
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Join 2000+ international students from 20+ countries shaping
              their future at SVGOI
            </p>
          </div>
        </div>
      </section>

      <InternationalHeroIntroSection />
      <InternationalLeadershipSection />
      <InternationalProgramPathwaysSection />
      <InternationalFacilitiesSection />
      <InternationalOpportunitiesSection />
      <InternationalAchievementsSection />
      <InternationalIconsSection />
      <InternationalStudentTestimonialsSection />
      <InternationalAdmissionsHelpSection />
    </main>
  );
}
