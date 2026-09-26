import Script from "next/script";
import { SiteFooter, SiteHeader } from "@/components/shared/site-chrome";
import { NpfTrackingScript } from "@/components/shared/npf-tracking-script";
import { GlobalEnquiryModal } from "@/components/shared/global-enquiry-modal";
import { FloatingWhatsApp } from "@/components/shared/floating-whatsapp";
import { NIAAChatbot } from "@/components/shared/niaa-chatbot";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NpfTrackingScript />
      <Script
        src="https://widgets.in5.nopaperforms.com/emwgts.js"
        strategy="afterInteractive"
      />
      <GlobalEnquiryModal />
      <SiteHeader />
      <main className="site-main bg-white">{children}</main>
      <SiteFooter />
      <FloatingWhatsApp />
      <NIAAChatbot />
    </>
  );
}
