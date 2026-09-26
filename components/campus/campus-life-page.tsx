import { CampusLifeHeroSection } from "@/components/campus/campus-life-hero";
import { CampusLifeQuickLinksSection } from "@/components/campus/campus-life-quick-links-section";
import { CampusLifeMemoriesSection } from "@/components/campus/campus-life-memories-section";
import { CampusLifeConcertsSection } from "@/components/campus/campus-life-concerts-section";
import { CampusLifeFreshersSection } from "@/components/campus/campus-life-freshers-section";
import { CampusLifeHangoutsSportsClubsSection } from "@/components/campus/campus-life-hangouts-sports-clubs-section";
import { CampusLifeFestsConvocationSection } from "@/components/campus/campus-life-fests-convocation-section";
import { CampusLifeUpcomingEventsSection } from "@/components/campus/campus-life-upcoming-events-section";

const SafeHeroSection =
  typeof CampusLifeHeroSection === "function" ? CampusLifeHeroSection : null;
const SafeQuickLinksSection =
  typeof CampusLifeQuickLinksSection === "function"
    ? CampusLifeQuickLinksSection
    : null;
const SafeMemoriesSection =
  typeof CampusLifeMemoriesSection === "function"
    ? CampusLifeMemoriesSection
    : null;
const SafeUpcomingEventsSection =
  typeof CampusLifeUpcomingEventsSection === "function"
    ? CampusLifeUpcomingEventsSection
    : null;
const SafeConcertsSection =
  typeof CampusLifeConcertsSection === "function"
    ? CampusLifeConcertsSection
    : null;
const SafeFreshersSection =
  typeof CampusLifeFreshersSection === "function"
    ? CampusLifeFreshersSection
    : null;
const SafeHangoutsSection =
  typeof CampusLifeHangoutsSportsClubsSection === "function"
    ? CampusLifeHangoutsSportsClubsSection
    : null;
const SafeFestsConvocationSection =
  typeof CampusLifeFestsConvocationSection === "function"
    ? CampusLifeFestsConvocationSection
    : null;

export function CampusLifeExactPage() {
  return (
    <div className=" text-[#111] ">
      {SafeHeroSection ? <SafeHeroSection /> : null}
      <div className="">
        {SafeQuickLinksSection ? <SafeQuickLinksSection /> : null}
      </div>
      <div
        className=" scroll-mt-36 md:scroll-mt-44"
        id="campus-student-welfare"
      >
        {SafeMemoriesSection ? <SafeMemoriesSection /> : null}
      </div>
      <div
        className="mx-auto max-w-7xl scroll-mt-36 md:scroll-mt-44"
        id="campus-events"
      >
        {SafeUpcomingEventsSection ? <SafeUpcomingEventsSection /> : null}
      </div>
      {/* <div
        className="mx-auto max-w-7xl scroll-mt-36 md:scroll-mt-44"
        id="campus-bollywood"
      >
        {SafeConcertsSection ? <SafeConcertsSection /> : null}
      </div> */}
      <div className="mx-auto max-w-7xl">
        {SafeFreshersSection ? <SafeFreshersSection /> : null}
      </div>
      <div className="mx-auto max-w-7xl">
        {SafeHangoutsSection ? <SafeHangoutsSection /> : null}
      </div>
      <div className="mx-auto max-w-7xl">
        {SafeFestsConvocationSection ? <SafeFestsConvocationSection /> : null}
      </div>
    </div>
  );
}
