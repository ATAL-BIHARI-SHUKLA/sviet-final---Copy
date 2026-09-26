import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";

import "./globals.css";

const displayFont = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const sansFont = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sviet.ac.in"),
  title: {
    default: "SVGOI | Swami Vivekanand Group of Institutes",
    template: "%s | SVGOI",
  },
  description: "Premier engineering and management college group in Punjab, India.",
  keywords: [
    "SVGOI",
    "engineering college Punjab",
    "B.Tech admissions",
    "MBA college Punjab",
    "SVGOI Banur",
  ],
  icons: {
    icon: "/Logo.ico",
    shortcut: "/Logo.ico",
    apple: "/Logo.ico",
  },
  openGraph: {
    title: "SVGOI | Swami Vivekanand Group of Institutes",
    description: "Premier engineering and management college group in Punjab, India.",
    url: "https://sviet.ac.in",
    siteName: "SVGOI",
    images: [
      {
        url: "/Logo.ico",
        width: 800,
        height: 600,
        alt: "SVGOI Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SVGOI | Swami Vivekanand Group of Institutes",
    description: "Premier engineering and management college group in Punjab, India.",
    images: ["/Logo.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-background text-foreground"
      >
        {children}
      </body>
    </html>
  );
}
