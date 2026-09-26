import type { Metadata } from "next";

import { ContactPageComponent } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Us | SVGOI",
  description:
    "Get in touch with SVGOI admissions team. Visit our campus in Banur, Punjab or reach us online.",
};

export default function Page() {
  return <ContactPageComponent />;
}
