import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.theuniques.in",
      },
      {
        protocol: "https",
        hostname: "bmnmsbiymz.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "**.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "cdn2.hubspot.net",
      },
      {
        protocol: "https",
        hostname: "concept3d.com",
      },
      {
        protocol: "https",
        hostname: "www.paruluniversity.ac.in",
      },
      {
        protocol: "https",
        hostname: "www.igauge.in",
      },
      {
        protocol: "https",
        hostname: "www.nirfindia.org",
      },
      {
        protocol: "https",
        hostname: "www.ugc.gov.in",
      },
      {
        protocol: "https",
        hostname: "silicon.ac.in",
      },
      {
        protocol: "http",
        hostname: "naac.gov.in",
      },
      {
        protocol: "https",
        hostname: "naac.gov.in",
      },
      {
        protocol: "https",
        hostname: "images.financialexpressdigital.com",
      },
      {
        protocol: "https",
        hostname: "pci.gov.in",
      },
      {
        protocol: "https",
        hostname: "www.barcouncilofindia.org",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: ["10.73.220.15"],
};

export default nextConfig;
