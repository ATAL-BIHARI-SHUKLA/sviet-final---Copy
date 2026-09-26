"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Placements", href: "/placements" },
  { label: "Admissions", href: "/admissions" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "Research", href: "/research" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 h-16 border-b border-black/5 bg-white/95 backdrop-blur transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold tracking-tight text-foreground">
          SVGOI
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#1f1f1f] lg:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors duration-200 hover:text-[#F97316]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-enquiry-modal"))}
            className="rounded-full bg-[#F97316] px-4 py-2 text-sm font-bold text-white transition duration-200 hover:scale-105"
          >
            Apply Now
          </button>
          <span className="hidden text-lg text-foreground md:inline">◦◦</span>
        </div>
      </div>
    </header>
  );
}
