import type { Metadata } from "next";
import { GalleryPage as GalleryPageView } from "@/components/gallery/gallery-sectioned-page";

export const metadata: Metadata = {
  title: "Gallery | SVGOI",
  description:
    "Browse SVGOI campus visuals, category filters, achievements graphics, and immersive gallery highlights.",
};

export default function GalleryPage() {
  return <GalleryPageView />;
}
