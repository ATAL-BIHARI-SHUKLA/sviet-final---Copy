import type { Metadata } from "next";

import { IsteHeroSection } from "@/components/iste/hero-section";
import { IsteMissionVision } from "@/components/iste/mission-vision";
import { IsteDepartment } from "@/components/iste/department";
import { IsteManagementDesk } from "@/components/iste/management-desk";
import { IsteBigCards } from "@/components/iste/big-cards";

export const metadata: Metadata = {
  title: "ISTE SVIET Chapter",
  description:
    "The ISTE SVIET Chapter — uniting students, educators, and professionals to advance technical education and create future leaders.",
};

export default function IstePage() {
  return (
    <>
      <IsteHeroSection />
      <IsteMissionVision />
      <IsteDepartment />
      <IsteManagementDesk />
      <IsteBigCards />
    </>
  );
}
