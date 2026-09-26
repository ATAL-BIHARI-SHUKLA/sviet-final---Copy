"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaSearch,
  FaTimes,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import { ABOUT_DROPDOWN_ITEMS } from "@/lib/config/about-nav";
import { NccRegistrationButton } from "@/components/shared/ncc-registration-button";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Placements", href: "/placements" },
  { label: "Admissions", href: "/admissions" },
  { label: "Our Initiatives", href: "" },
  { label: "International", href: "/international" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "Research", href: "/research" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

// All six badges are flat artwork on a transparent background, so they sit in the
// strip as one set without any per-slide styling.
const RANKING_BADGES = [
  {
    src: "/assets/img/college/1st.png",
    width: 500,
    height: 500,
    alt: "Ranked 1st Best Institution in North India for execution of industry & academia curriculum at WEBCON 2025",
  },
  {
    src: "/assets/img/college/4th.png",
    width: 500,
    height: 500,
    alt: "Ranked 4th among the top Engineering Colleges of Excellence in Punjab",
  },
  {
    src: "/assets/img/college/8th.png",
    width: 500,
    height: 500,
    alt: "Ranked 8th among the outstanding Engineering Colleges of Excellence in India",
  },
  {
    src: "/assets/img/ranking/5th.png",
    width: 502,
    height: 497,
    alt: "Ranked 5th in Punjab in the CSR Engineering College Survey 2026",
  },
  {
    src: "/assets/img/ranking/12th.png",
    width: 492,
    height: 507,
    alt: "Ranked 12th group rank in Punjab in the CSR Engineering College Survey 2026",
  },
  {
    src: "/assets/img/ranking/48th.png",
    width: 506,
    height: 493,
    alt: "Ranked 48th among the top engineering colleges in India by Higher Education Review",
  },
];

const BADGES_PER_SLIDE = 3;
const BADGE_ROTATION_MS = 4000;

// Badges cycle three at a time so the strip keeps the footprint it had as a single fixed set.
const RANKING_SLIDES = Array.from(
  { length: Math.ceil(RANKING_BADGES.length / BADGES_PER_SLIDE) },
  (_, slide) =>
    RANKING_BADGES.slice(
      slide * BADGES_PER_SLIDE,
      slide * BADGES_PER_SLIDE + BADGES_PER_SLIDE,
    ),
);

type CategorySubgroup = {
  sublabel: string;
  programTitles: string[];
};

type CategoryGroup = {
  category: string;
  programTitles?: string[];
  subgroups?: CategorySubgroup[];
};

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    category: "Engineering",
    subgroups: [
      {
        sublabel: "B.Tech Programs",
        programTitles: [
          "B.Tech Artificial Intelligence",
          "B.Tech Civil Engineering",
          "B.Tech Computer Science & Engineering",
          "B.Tech Electrical Engineering",
          "B.Tech Electronics & Communication Engineering",
          "B.Tech Mechanical Engineering",
        ],
      },
      {
        sublabel: "M.Tech Programs",
        programTitles: [
          "M.Tech Civil Engineering",
          "M.Tech Computer Science Engineering",
          "M.Tech Electronics & Communication Engineering",
          "M.Tech Mechanical Engineering",
        ],
      },
    ],
  },
  {
    category: "Pharmacy",
    programTitles: [
      "B.Pharmacy",
      "M.Pharmacy (Pharmaceutics)",
      "M.Pharmacy (Pharmacology)",
      "Pharma.D",
    ],
  },
  {
    category: "Arts & Education",
    programTitles: [
      "Bachelor of Arts",
      "Bachelor of Arts (Computer Science)",
      "B.A. (Journalism and Mass Communication)",
      "Bachelor in Education",
      "M.A Education",
      "Masters in Education",
    ],
  },
  {
    category: "Commerce",
    programTitles: ["Bachelor of Commerce", "Master of Commerce"],
  },
  {
    category: "Computer Applications",
    programTitles: [
      "B.Sc Information Technology",
      "Bachelor of Computer Applications",
      "Master of Computer Applications",
      "Post Graduate Diploma in Computer Application",
    ],
  },
  {
    category: "Diploma",
    programTitles: [
      "Diploma Computer Science Engineering",
      "Diploma in Civil Engineering",
      "Diploma in Electrical Engineering",
      "Diploma in Mechanical Engineering",
      "Diploma in Medical Lab Technology",
      "Diploma in Pharmacy",
    ],
  },
  {
    category: "Hotel Management",
    programTitles: [
      "B.Voc (Hospitality & Catering Management)",
      "Bachelor of Hotel Management & Catering Technology",
      "Master of Hotel Management & Catering Technology",
      "B.Sc Honors in Nutrition and Dietetics",
    ],
  },
  { category: "Law", programTitles: ["B.A. L.L.B", "LLB"] },
  {
    category: "Management",
    programTitles: [
      "Bachelor of Business Administration",
      "Master of Business Administration",
    ],
  },
  {
    category: "Medical Sciences & Allied Health",
    subgroups: [
      {
        sublabel: "Undergraduate Programs",
        programTitles: [
          "B.Sc (Hons.) Anesthesia Technology",
          "B.Sc. (Hons.) Operation Theater Technology",
          "B.Sc (Hons.) Optometry",
          "B.Sc Cardiac Care Technology",
          "B.Sc. (Hons.) Medical Lab Science",
          "B.Sc. (Hons.) Radio Medical Imaging Technology",
          "Bachelor of Physiotherapy",
          "Bachelor in Hospital Administration",
          "Diploma In Nursing Assistant",
        ],
      },
      {
        sublabel: "Postgraduate Programs",
        programTitles: [
          "M.Sc (Medical Microbiology)",
          "M.Sc (Radiology and Imaging Technology)",
          "M.Sc Anesthesia & Operation Theater Technology",
          "M.Sc Cardiac Care Technology",
          "M.Sc Medical Lab Science (Clinical Biochemistry)",
        ],
      },
    ],
  },

  {
    category: "Science",
    programTitles: [
      "B.Sc Non-Medical",
      "M.Sc Chemistry",
      "M.Sc Math",
      "M.Sc Physics",
    ],
  },
  {
    category: "Vocational & ITI",
    programTitles: ["COPA", "Plumber", "Welder(G&E)"],
  },
];

const INITIATIVES_DROPDOWN_ITEMS = [
  { label: "The Uniques", href: "/our-initiatives/the-uniques" },
  { label: "S60", href: "/our-initiatives/s60" },
] as const;

const INTERNATIONAL_DROPDOWN_ITEMS = [
  { label: "Our Services", href: "/international/our-services" },
  { label: "Entrepreneurship & Startup Support", href: "/international/entrepreneurship" },
] as const;

const ABOUT_PANEL_GROUPS = [
  {
    title: "Discover SVGOI",
    items: [
      { label: "Overview", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Accreditations & Approvals", href: "/about/accreditations" },
      {
        label: "Awards, Rankings & Ratings",
        href: "/about/awards-recognitions",
      },
    ],
  },
  {
    title: "Explore More",
    items: [
      // { label: "Infrastructure", href: "/about/infrastructure" },
      { label: "Placements", href: "/about/placements" },
      { label: "Life at SVGOI", href: "/campus-life" },
    ],
  },
] as const;

const ABOUT_PANEL_FEATURE = {
  eyebrow: "Admissions Open 2026",
  title: "Join a new generation of learners",
  description:
    "Explore academics, campus life, and the student experience in one focused view.",
  href: "/admissions",
  imageSrc: "/assets/img/nav1.jpeg",
  imageAlt: "Student spotlight",
};

const PROGRAM_PANEL_FEATURE = {
  eyebrow: "Program Finder",
  title: "Find the right program faster",
  description:
    "Browse departments, compare active programs, and jump straight into the degree that fits.",
  href: "/program-finder",
  imageSrc: "/assets/img/nav2.jpeg",
  imageAlt: "Campus building",
};

type ProgramDropdownItem = {
  id: string;
  slug: string;
  title: string;
  department?: string | null;
};

type ProgramsApiResponse = {
  success?: boolean;
  data?: ProgramDropdownItem[];
};

const UTILITY_MESSAGES = [
  " Admissions Open 2026 — Apply Now",
  "Admission Helpline: +91-94652-33333 | Toll Free: 1800-120-1200",
  "NAAC Accredited",
  "Autonomous Institute",
];

const HEADER_SCROLL_ENTER_THRESHOLD = 56;
const HEADER_SCROLL_EXIT_THRESHOLD = 36;
const UTILITY_HIDE_SCROLL_Y = 96;
const UTILITY_SHOW_SCROLL_Y = 44;
const UTILITY_DIRECTION_DELTA = 2;
const UTILITY_UP_REVEAL_DELTA = 18;

type TopUtilityBarProps = {
  isTransparent?: boolean;
  isUtilityHidden?: boolean;
  isLeadershipPage?: boolean;
};

type MainNavbarProps = {
  isTransparent?: boolean;
  isScrolled?: boolean;
  isLeadershipPage?: boolean;
};

export function SiteHeader() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isProgramDetailPage =
    pathSegments[0] === "programs" && pathSegments.length === 2;
  const isLeadershipPage = pathname === "/about/leadership";
  const isHeroOverlayRoute =
    pathname === "/" ||
    pathname === "/research" ||
    pathname === "/admissions" ||
    isLeadershipPage ||
    isProgramDetailPage;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUtilityHidden, setIsUtilityHidden] = useState(false);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let lastScrollY = 0;

    const syncScrollState = () => {
      const scrollY = window.scrollY;

      setIsScrolled((previous) => {
        const nextScrolled = previous
          ? scrollY > HEADER_SCROLL_EXIT_THRESHOLD
          : scrollY > HEADER_SCROLL_ENTER_THRESHOLD;

        return previous === nextScrolled ? previous : nextScrolled;
      });

      setIsUtilityHidden((previous) => {
        if (scrollY <= UTILITY_SHOW_SCROLL_Y) {
          return false;
        }

        const delta = scrollY - lastScrollY;
        const isScrollingDown = delta > UTILITY_DIRECTION_DELTA;
        const isScrollingUp = delta < -UTILITY_DIRECTION_DELTA;

        if (!previous && isScrollingDown && scrollY > UTILITY_HIDE_SCROLL_Y) {
          return true;
        }

        if (
          previous &&
          isScrollingUp &&
          lastScrollY - scrollY > UTILITY_UP_REVEAL_DELTA
        ) {
          return false;
        }

        return previous;
      });

      lastScrollY = scrollY;
      animationFrameId = null;
    };

    const onScroll = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(syncScrollState);
    };

    syncScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  const isTransparent = isHeroOverlayRoute && !isScrolled;

  return (
    <div
      className={[
        "site-header",
        isHeroOverlayRoute ? "site-header-home" : "site-header-default",
        isLeadershipPage ? "site-header-leadership" : "",
        isTransparent ? "navbar-transparent" : "navbar-scrolled",
        isUtilityHidden ? "utility-hidden" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <TopUtilityBar
        isTransparent={isTransparent}
        isUtilityHidden={isUtilityHidden}
        isLeadershipPage={isLeadershipPage}
      />
      <MainNavbar
        isTransparent={isTransparent}
        isScrolled={isScrolled}
        isLeadershipPage={isLeadershipPage}
      />
    </div>
  );
}

export function TopUtilityBar({
  isTransparent = false,
  isUtilityHidden = false,
  isLeadershipPage = false,
}: TopUtilityBarProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  const utilityToneClass = isTransparent
    ? isLeadershipPage
      ? "border-black/10 bg-transparent text-[#000000]"
      : "border-white/25 bg-transparent text-[#FFFFFF]"
    : "border-black/10 bg-[#FFFFFF] text-[#000000]";

  const showPreviousMessage = () => {
    setMessageIndex((prev) =>
      prev === 0 ? UTILITY_MESSAGES.length - 1 : prev - 1,
    );
  };

  const showNextMessage = () => {
    setMessageIndex((prev) => (prev + 1) % UTILITY_MESSAGES.length);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      showNextMessage();
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={`utility-bar w-full border-b px-3 py-2 text-[10px] md:px-5 md:text-sm ${utilityToneClass} ${isUtilityHidden ? "utility-hidden" : ""}`}
    >
      <div className="mx-auto flex w-full max-w-300 items-center justify-between">
        <div className="relative min-w-0 flex-1 pr-3">
          <button
            type="button"
            onClick={showPreviousMessage}
            aria-label="Previous announcement"
            className="absolute left-0 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-[8px] text-current transition-colors duration-300 ease-out hover:text-[#FEA700] md:h-6 md:w-6 md:text-[10px]"
          >
            <FaChevronLeft />
          </button>
          <p
            className="truncate px-8 text-center font-medium md:px-10"
            aria-live="polite"
          >
            {UTILITY_MESSAGES[messageIndex]}
          </p>
          <button
            type="button"
            onClick={showNextMessage}
            aria-label="Next announcement"
            className="absolute right-0 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-[8px] text-current transition-colors duration-300 ease-out hover:text-[#FEA700] md:h-6 md:w-6 md:text-[10px]"
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="ml-3 hidden items-center gap-3 whitespace-nowrap md:flex">
          <span className="flex items-center gap-1 border border-current/20 px-2 py-1">
            <FaPhoneAlt className="text-[9px] md:text-[10px]" />
            <span>1800-120-1200</span>
          </span>

          <a
            href="https://wa.me/919465233333"
            className="inline-flex items-center gap-1 bg-[#FEA700] px-2 py-1 font-semibold text-[#000000] transition-colors duration-300 ease-out hover:bg-[#FFFFFF]"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="text-[10px]" />
            <span>WhatsApp</span>
          </a>
          <a
            href="https://www.facebook.com/svietofficial/"
            className="inline-flex items-center gap-1 border border-current/20 px-2 py-1 text-current transition-colors duration-300 ease-out hover:border-[#FEA700] hover:text-[#FEA700]"
            aria-label="Follow us on Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="text-[10px] md:text-sm" />
          </a>
          <a
            href="https://www.instagram.com/svietofficial/"
            className="inline-flex items-center gap-1 border border-current/20 px-2 py-1 text-current transition-colors duration-300 ease-out hover:border-[#FEA700] hover:text-[#FEA700]"
            aria-label="Follow us on Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-[10px] md:text-sm" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Slides are stacked and cross-faded, so the wrapper needs an explicit width/height
// from the caller — otherwise the absolutely positioned slides collapse it to zero.
function RankingBadgeStrip({
  activeSlide,
  className,
  rowClassName,
  imageClassName,
}: {
  activeSlide: number;
  className: string;
  rowClassName: string;
  imageClassName: string;
}) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      {RANKING_SLIDES.map((slide, index) => {
        const isActive = index === activeSlide;

        return (
          <div
            key={index}
            aria-hidden={!isActive}
            className={`absolute inset-0 flex items-center transition-opacity duration-700 ease-out ${rowClassName} ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.map((badge) => (
              <Image
                key={badge.src}
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className={imageClassName}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function MainNavbar({
  isTransparent = false,
  isScrolled = false,
  isLeadershipPage = false,
}: MainNavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
  const [isMobileInitiativesOpen, setIsMobileInitiativesOpen] = useState(false);
  const [isMobileInternationalOpen, setIsMobileInternationalOpen] = useState(false);
  const [dynamicPrograms, setDynamicPrograms] = useState<ProgramDropdownItem[]>(
    [],
  );
  const [activeRankingSlide, setActiveRankingSlide] = useState(0);

  const navbarToneClass = isTransparent
    ? isLeadershipPage
      ? "border-black/10 bg-transparent text-[#000000]"
      : "border-white/25 bg-transparent text-[#FFFFFF]"
    : "border-black/10 bg-[#FFFFFF] text-[#000000]";

  useEffect(() => {
    let active = true;

    const loadPrograms = async () => {
      try {
        const response = await fetch("/api/programs", { cache: "no-store" });
        const payload = (await response.json()) as ProgramsApiResponse;

        if (!active) {
          return;
        }

        if (!response.ok || !payload.success || !Array.isArray(payload.data)) {
          setDynamicPrograms([]);
          return;
        }

        setDynamicPrograms(payload.data);
      } catch {
        if (active) {
          setDynamicPrograms([]);
        }
      }
    };

    loadPrograms();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (RANKING_SLIDES.length < 2) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rotation = setInterval(() => {
      setActiveRankingSlide((prev) => (prev + 1) % RANKING_SLIDES.length);
    }, BADGE_ROTATION_MS);

    return () => clearInterval(rotation);
  }, []);

  // Variant programs (-svftm / -svcmt) share titles with their canonical counterparts.
  // Process variants first so canonical entries overwrite them in the Map.
  const sorted = [...dynamicPrograms].sort((a, b) => {
    const aV = a.slug.endsWith("-svftm") || a.slug.endsWith("-svcmt") ? 0 : 1;
    const bV = b.slug.endsWith("-svftm") || b.slug.endsWith("-svcmt") ? 0 : 1;
    return aV - bV;
  });
  const programByTitle = new Map<string, { label: string; href: string }>(
    sorted.map((p) => [p.title, { label: p.title, href: `/programs/${p.slug}` }]),
  );

  type ResolvedSubgroup = {
    sublabel: string;
    items: { label: string; href: string }[];
  };
  type ResolvedCategory = {
    category: string;
    items?: { label: string; href: string }[];
    subgroups?: ResolvedSubgroup[];
  };

  const resolvedCategories: ResolvedCategory[] = CATEGORY_GROUPS.flatMap(
    (group): ResolvedCategory[] => {
      if (group.subgroups) {
        const resolvedSubgroups = group.subgroups
          .map((sg) => ({
            sublabel: sg.sublabel,
            items: sg.programTitles
              .map((title) => programByTitle.get(title))
              .filter(
                (item): item is { label: string; href: string } =>
                  item !== undefined,
              ),
          }))
          .filter((sg) => sg.items.length > 0);
        if (resolvedSubgroups.length === 0) return [];
        return [{ category: group.category, subgroups: resolvedSubgroups }];
      }
      const items = (group.programTitles ?? [])
        .map((title) => programByTitle.get(title))
        .filter(
          (item): item is { label: string; href: string } =>
            item !== undefined,
        );
      if (items.length === 0) return [];
      return [{ category: group.category, items }];
    },
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileAboutOpen(false);
    setIsMobileProgramsOpen(false);
    setIsMobileInitiativesOpen(false);
    setIsMobileInternationalOpen(false);
  };

  const toggleMobileAbout = () => {
    setIsMobileAboutOpen((prev) => !prev);
    setIsMobileProgramsOpen(false);
    setIsMobileInternationalOpen(false);
  };

  const toggleMobilePrograms = () => {
    setIsMobileProgramsOpen((prev) => !prev);
    setIsMobileAboutOpen(false);
    setIsMobileInitiativesOpen(false);
    setIsMobileInternationalOpen(false);
  };

  const toggleMobileInitiatives = () => {
    setIsMobileInitiativesOpen((prev) => !prev);
    setIsMobileAboutOpen(false);
    setIsMobileProgramsOpen(false);
    setIsMobileInternationalOpen(false);
  };

  const toggleMobileInternational = () => {
    setIsMobileInternationalOpen((prev) => !prev);
    setIsMobileAboutOpen(false);
    setIsMobileProgramsOpen(false);
    setIsMobileInitiativesOpen(false);
  };

  return (
    <header
      className={`main-navbar w-full border-b transition-[background-color,color,border-color,box-shadow] duration-300 ease-out ${navbarToneClass} ${
        isScrolled ? "shadow-[0_2px_10px_rgba(0,0,0,0.05)]" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex w-full max-w-300 items-center justify-between px-3 py-2.5 md:px-5 md:py-3">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={
              isTransparent
                ? isLeadershipPage
                  ? "/Logo.png"
                  : "/Logo.png"
                : "/Logo.png"
            }
            alt="SVGOI logo"
            width={347}
            height={150}
            className={`main-navbar-logo h-8 md:h-10 w-auto transition-[filter] duration-300 ease-out object-contain `}
            style={{ width: "auto" }}
            priority
          />
        </Link>

        <button
          type="button"
          onClick={toggleMobileMenu}
          className={`inline-flex h-10 w-10 items-center justify-center border transition-colors duration-300 ease-out lg:hidden ${
            isTransparent
              ? "border-white/35 text-[#FFFFFF] hover:border-[#FEA700] hover:text-[#FEA700]"
              : "border-black/20 text-[#000000] hover:border-[#FEA700] hover:text-[#FEA700]"
          }`}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-main-menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className="hidden min-w-0 flex-1 items-center justify-end text-[10px] font-semibold tracking-wide text-current lg:flex lg:gap-1.5 xl:gap-2 xl:text-[10px] 2xl:gap-3 2xl:text-[11px]">
          <RankingBadgeStrip
            activeSlide={activeRankingSlide}
            className="hidden h-16 w-50 2xl:block"
            rowClassName="gap-1"
            imageClassName="h-16 w-16 shrink-0 object-contain"
          />

          {NAV_ITEMS.map((item) =>
            item.label === "About" ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 whitespace-nowrap transition-colors duration-300 ease-out hover:text-[#FEA700]"
                >
                  {item.label}
                  <span className="text-[10px]">▾</span>
                </Link>

                <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-[min(1080px,calc(100vw-2rem))] -translate-x-1/2 whitespace-normal opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                  <div className="border border-black/10 bg-[#FFFFFF] shadow-[0_16px_45px_rgba(0,0,0,0.1)]">
                    <div className="flex max-h-[90vh] flex-col xl:flex-row">
                      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                          {ABOUT_PANEL_GROUPS.map((group) => (
                            <section
                              key={group.title}
                              className="border border-black/10 bg-[#FFFFFF] p-4"
                            >
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FEA700]">
                                {group.title}
                              </p>
                              <div className="mt-3 space-y-1.5">
                                {group.items.map((aboutItem) => {
                                  const isActive = pathname === aboutItem.href;

                                  return (
                                    <Link
                                      key={`${group.title}-${aboutItem.href}-${aboutItem.label}`}
                                      href={aboutItem.href}
                                      className={`flex items-center justify-between border px-3 py-2 text-[12px] font-semibold transition-colors duration-300 ease-out hover:border-[#FEA700]/40 hover:bg-[#FEA700]/10 hover:text-[#000000] ${
                                        isActive
                                          ? "border-[#FEA700]/40 bg-[#FEA700]/10 text-[#000000]"
                                          : "border-transparent text-[#000000]"
                                      }`}
                                    >
                                      <span>{aboutItem.label}</span>
                                      <span className="text-[10px] opacity-60">
                                        ↗
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </section>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-black/10 p-5 xl:sticky xl:top-0 xl:w-96 xl:shrink-0 xl:self-start xl:border-l xl:border-t-0">
                        <Link
                          href={ABOUT_PANEL_FEATURE.href}
                          className="group/card relative block min-h-80 overflow-hidden border border-[#FEA700]/35 bg-[#FFFFFF] p-5 text-[#000000] transition-colors duration-300 ease-out hover:border-[#FEA700]"
                        >
                          <div className="relative z-10 flex h-full min-h-72 flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FEA700]">
                              {ABOUT_PANEL_FEATURE.eyebrow}
                            </span>
                            <h3 className="mt-3 max-w-full text-2xl font-black leading-tight tracking-tight xl:text-3xl text-[#000000]">
                              {ABOUT_PANEL_FEATURE.title}
                            </h3>
                            <p className="mt-3 max-w-full text-sm leading-relaxed text-black/80">
                              {ABOUT_PANEL_FEATURE.description}
                            </p>
                            <div className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#FEA700]">
                              Learn more
                              <span className="transition group-hover/card:translate-x-0.5">
                                →
                              </span>
                            </div>
                          </div>
                          <div className="pointer-events-none absolute inset-0">
                            <Image
                              src={ABOUT_PANEL_FEATURE.imageSrc}
                              alt={ABOUT_PANEL_FEATURE.imageAlt}
                              fill
                              sizes="(max-width: 1280px) 340px, 340px"
                              className="object-cover object-center opacity-60"
                            />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : item.label === "Programs" ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 whitespace-nowrap transition-colors duration-300 ease-out hover:text-[#FEA700]"
                >
                  {item.label}
                  <span className="text-[10px]">▾</span>
                </button>

                <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-[min(1080px,calc(100vw-2rem))] -translate-x-1/2 whitespace-normal opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                  <div className="border border-black/10 bg-[#FFFFFF] shadow-[0_16px_45px_rgba(0,0,0,0.1)]">
                    <div className="flex max-h-[90vh] flex-col xl:flex-row">
                      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5">
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            <Link
                              href="/program-finder"
                              className="min-w-0 border border-[#FEA700]/30 bg-[#FEA700]/10 p-4 transition-colors duration-300 ease-out hover:border-[#FEA700]"
                            >
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FEA700]">
                                Explore
                              </p>
                              <h3 className="mt-3 text-xl font-black leading-tight tracking-tight text-[#000000]">
                                Program Finder
                              </h3>
                              <p className="mt-2 text-sm leading-6 text-black/70">
                                Search by career goal, duration, department, or
                                specialization.
                              </p>
                            </Link>

                            {resolvedCategories.map((resolved) => (
                              <section
                                key={resolved.category}
                                className="min-w-0 border border-black/10 bg-[#FFFFFF] p-4"
                              >
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FEA700]">
                                  {resolved.category}
                                </p>
                                {resolved.subgroups ? (
                                  resolved.subgroups.map((sg) => (
                                    <div key={sg.sublabel} className="mt-3">
                                      <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-black/50">
                                        {sg.sublabel}
                                      </p>
                                      <div className="space-y-1.5">
                                        {sg.items.map((item) => {
                                          const isCurrent =
                                            pathname === item.href;
                                          return (
                                            <Link
                                              key={`${resolved.category}-${sg.sublabel}-${item.href}`}
                                              href={item.href}
                                              className={`block min-w-0 wrap-break-word border px-3 py-2 text-[12px] font-semibold leading-snug transition-colors duration-300 ease-out hover:border-[#FEA700]/40 hover:bg-[#FEA700]/10 hover:text-[#000000] ${
                                                isCurrent
                                                  ? "border-[#FEA700]/40 bg-[#FEA700]/10 text-[#000000]"
                                                  : "border-transparent text-[#000000]"
                                              }`}
                                            >
                                              {item.label}
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="mt-3 space-y-1.5">
                                    {(resolved.items ?? []).map((item) => {
                                      const isCurrent = pathname === item.href;
                                      return (
                                        <Link
                                          key={`${resolved.category}-${item.href}`}
                                          href={item.href}
                                          className={`block min-w-0 wrap-break-word border px-3 py-2 text-[12px] font-semibold leading-snug transition-colors duration-300 ease-out hover:border-[#FEA700]/40 hover:bg-[#FEA700]/10 hover:text-[#000000] ${
                                            isCurrent
                                              ? "border-[#FEA700]/40 bg-[#FEA700]/10 text-[#000000]"
                                              : "border-transparent text-[#000000]"
                                          }`}
                                        >
                                          {item.label}
                                        </Link>
                                      );
                                    })}
                                  </div>
                                )}
                              </section>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-black/10 p-5 xl:sticky xl:top-0 xl:w-96 xl:shrink-0 xl:self-start xl:border-l xl:border-t-0">
                        <Link
                          href={PROGRAM_PANEL_FEATURE.href}
                          className="group/card relative block min-h-80 min-w-0 overflow-hidden border border-[#FEA700]/35 bg-[#FFFFFF] p-5 text-[#000000] transition-colors duration-300 ease-out hover:border-[#FEA700]"
                        >
                          <div className="relative z-10 flex h-full min-h-72 flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FEA700]">
                              {PROGRAM_PANEL_FEATURE.eyebrow}
                            </span>
                            <h3 className="mt-3 max-w-full wrap-break-word text-2xl font-black leading-tight tracking-tight xl:text-3xl text-[#000000]">
                              {PROGRAM_PANEL_FEATURE.title}
                            </h3>
                            <p className="mt-3 max-w-full wrap-break-word text-sm leading-relaxed text-black/80">
                              {PROGRAM_PANEL_FEATURE.description}
                            </p>
                            <div className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#FEA700]">
                              Open finder
                              <span className="transition group-hover/card:translate-x-0.5">
                                →
                              </span>
                            </div>
                          </div>
                          <div className="pointer-events-none absolute inset-0">
                            <Image
                              src={PROGRAM_PANEL_FEATURE.imageSrc}
                              alt={PROGRAM_PANEL_FEATURE.imageAlt}
                              fill
                              sizes="(max-width: 1280px) 340px, 340px"
                              className="object-cover object-center opacity-60"
                            />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : item.label === "Our Initiatives" ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 whitespace-nowrap transition-colors duration-300 ease-out hover:text-[#FEA700]"
                >
                  {item.label}
                  <span className="text-[10px]">▾</span>
                </Link>

                <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-48 -translate-x-1/2 whitespace-normal opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                  <div className="border border-black/10 bg-[#FFFFFF] shadow-[0_16px_45px_rgba(0,0,0,0.1)]">
                    {INITIATIVES_DROPDOWN_ITEMS.map((initiative) => {
                      const isActive = pathname === initiative.href;
                      return (
                        <Link
                          key={initiative.href}
                          href={initiative.href}
                          className={`flex items-center justify-between border-b border-black/5 px-4 py-3 text-[12px] font-semibold transition-colors duration-300 ease-out last:border-b-0 hover:bg-[#FEA700]/10 hover:text-[#000000] ${
                            isActive
                              ? "bg-[#FEA700]/10 text-[#000000]"
                              : "text-[#000000]"
                          }`}
                        >
                          <span>{initiative.label}</span>
                          <span className="text-[10px] opacity-60">↗</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : item.label === "International" ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 whitespace-nowrap transition-colors duration-300 ease-out hover:text-[#FEA700]"
                >
                  {item.label}
                  <span className="text-[10px]">▾</span>
                </Link>

                <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 whitespace-normal opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                  <div className="border border-black/10 bg-[#FFFFFF] shadow-[0_16px_45px_rgba(0,0,0,0.1)]">
                    {INTERNATIONAL_DROPDOWN_ITEMS.map((interItem) => {
                      const isActive = pathname === interItem.href;
                      return (
                        <Link
                          key={interItem.href}
                          href={interItem.href}
                          className={`flex items-center justify-between border-b border-black/5 px-4 py-3 text-[12px] font-semibold transition-colors duration-300 ease-out last:border-b-0 hover:bg-[#FEA700]/10 hover:text-[#000000] ${
                            isActive
                              ? "bg-[#FEA700]/10 text-[#000000]"
                              : "text-[#000000]"
                          }`}
                        >
                          <span>{interItem.label}</span>
                          <span className="text-[10px] opacity-60">↗</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap transition-colors duration-300 ease-out hover:text-[#FEA700]"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>

      {isMobileMenuOpen ? (
        <div
          id="mobile-main-menu"
          className={`absolute left-0 top-full z-40 max-h-[90vh] w-full overflow-y-auto overscroll-contain border-t backdrop-blur-sm lg:hidden ${
            isTransparent
              ? "border-white/20 bg-[#000000]/95 text-[#FFFFFF]"
              : "border-black/10 bg-[#FFFFFF]/98 text-[#000000] shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
          }`}
        >
          <div className="mx-auto w-full max-w-300 px-4 py-4">
            <RankingBadgeStrip
              activeSlide={activeRankingSlide}
              className="mb-3 h-9 w-31"
              rowClassName="gap-2"
              imageClassName={`h-9 w-9 shrink-0 border object-contain ${isTransparent ? "border-white/20" : "border-black/10"}`}
            />

            <nav className="space-y-1 text-sm font-semibold text-current">
              {NAV_ITEMS.map((item) =>
                item.label === "About" ? (
                  <div
                    key="mobile-about-dropdown"
                    className={`border p-1 ${isTransparent ? "border-white/20 bg-black/60" : "border-black/10 bg-[#FFFFFF]"}`}
                  >
                    <button
                      type="button"
                      onClick={toggleMobileAbout}
                      className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors duration-300 ease-out hover:text-[#FEA700]"
                    >
                      <span>{item.label}</span>
                      <span
                        className={`text-sm transition ${isMobileAboutOpen ? "rotate-180" : "rotate-0"}`}
                      >
                        ▾
                      </span>
                    </button>

                    {isMobileAboutOpen ? (
                      <div className="mt-1 grid gap-1 px-2 pb-2">
                        {ABOUT_DROPDOWN_ITEMS.map((aboutItem) => {
                          const isActive = pathname === aboutItem.href;

                          return (
                            <Link
                              key={`mobile-about-${aboutItem.href}`}
                              href={aboutItem.href}
                              onClick={closeMobileMenu}
                              className={`block border px-3 py-2 text-sm transition-colors duration-300 ease-out hover:border-[#FEA700]/40 hover:bg-[#FEA700]/10 hover:text-[#FEA700] ${
                                isActive
                                  ? "border-[#FEA700]/40 bg-[#FEA700]/10 text-[#FEA700]"
                                  : isTransparent
                                    ? "border-white/20 text-[#FFFFFF]"
                                    : "border-black/10 text-[#000000]"
                              }`}
                            >
                              {aboutItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                ) : item.label === "Programs" ? (
                  <div
                    key="mobile-programs-dropdown"
                    className={`border p-1 ${isTransparent ? "border-white/20 bg-black/60" : "border-black/10 bg-[#FFFFFF]"}`}
                  >
                    <button
                      type="button"
                      onClick={toggleMobilePrograms}
                      className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors duration-300 ease-out hover:text-[#FEA700]"
                    >
                      <span>{item.label}</span>
                      <span
                        className={`text-sm transition ${isMobileProgramsOpen ? "rotate-180" : "rotate-0"}`}
                      >
                        ▾
                      </span>
                    </button>

                    {isMobileProgramsOpen ? (
                      <div className="mt-1 flex max-h-[70vh] flex-col gap-3 overflow-y-auto px-2 pb-2">
                        <div
                          className={`border p-2 ${isTransparent ? "border-white/20 bg-black/50" : "border-black/10 bg-[#FFFFFF]"}`}
                        >
                          <Link
                            href="/program-finder"
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 text-sm font-semibold text-[#FEA700] transition-colors duration-300 ease-out hover:text-[#FEA700]"
                          >
                            Program Finder
                          </Link>
                        </div>
                        {resolvedCategories.map((resolved) => (
                          <div
                            key={`mobile-cat-${resolved.category}`}
                            className={`border p-2 ${isTransparent ? "border-white/20 bg-black/50" : "border-black/10 bg-[#FFFFFF]"}`}
                          >
                            <p className="px-1 pb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#FEA700]">
                              {resolved.category}
                            </p>
                            {resolved.subgroups ? (
                              resolved.subgroups.map((sg) => (
                                <div
                                  key={`mobile-sg-${resolved.category}-${sg.sublabel}`}
                                  className="mt-1.5"
                                >
                                  <p
                                    className={`px-1 pb-1 text-[9px] font-bold uppercase tracking-[0.08em] ${isTransparent ? "text-white/50" : "text-black/40"}`}
                                  >
                                    {sg.sublabel}
                                  </p>
                                  <div className="space-y-1">
                                    {sg.items.map((item) => (
                                      <Link
                                        key={`mobile-program-${resolved.category}-${sg.sublabel}-${item.href}`}
                                        href={item.href}
                                        onClick={closeMobileMenu}
                                        className={`block px-3 py-2 text-sm transition-colors duration-300 ease-out hover:text-[#FEA700] ${isTransparent ? "text-[#FFFFFF]" : "text-[#000000]"}`}
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="space-y-1">
                                {(resolved.items ?? []).map((item) => (
                                  <Link
                                    key={`mobile-program-${resolved.category}-${item.href}`}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    className={`block px-3 py-2 text-sm transition-colors duration-300 ease-out hover:text-[#FEA700] ${isTransparent ? "text-[#FFFFFF]" : "text-[#000000]"}`}
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : item.label === "Our Initiatives" ? (
                  <div
                    key="mobile-initiatives-dropdown"
                    className={`border p-1 ${isTransparent ? "border-white/20 bg-black/60" : "border-black/10 bg-[#FFFFFF]"}`}
                  >
                    <button
                      type="button"
                      onClick={toggleMobileInitiatives}
                      className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors duration-300 ease-out hover:text-[#FEA700]"
                    >
                      <span>{item.label}</span>
                      <span
                        className={`text-sm transition ${isMobileInitiativesOpen ? "rotate-180" : "rotate-0"}`}
                      >
                        ▾
                      </span>
                    </button>

                    {isMobileInitiativesOpen ? (
                      <div className="mt-1 grid gap-1 px-2 pb-2">
                        {INITIATIVES_DROPDOWN_ITEMS.map((initiative) => {
                          const isActive = pathname === initiative.href;
                          return (
                            <Link
                              key={`mobile-initiative-${initiative.href}`}
                              href={initiative.href}
                              onClick={closeMobileMenu}
                              className={`block border px-3 py-2 text-sm transition-colors duration-300 ease-out hover:border-[#FEA700]/40 hover:bg-[#FEA700]/10 hover:text-[#FEA700] ${
                                isActive
                                  ? "border-[#FEA700]/40 bg-[#FEA700]/10 text-[#FEA700]"
                                  : isTransparent
                                    ? "border-white/20 text-[#FFFFFF]"
                                    : "border-black/10 text-[#000000]"
                              }`}
                            >
                              {initiative.label}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                ) : item.label === "International" ? (
                  <div
                    key="mobile-international-dropdown"
                    className={`border p-1 ${isTransparent ? "border-white/20 bg-black/60" : "border-black/10 bg-[#FFFFFF]"}`}
                  >
                    <button
                      type="button"
                      onClick={toggleMobileInternational}
                      className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors duration-300 ease-out hover:text-[#FEA700]"
                    >
                      <span>{item.label}</span>
                      <span
                        className={`text-sm transition ${isMobileInternationalOpen ? "rotate-180" : "rotate-0"}`}
                      >
                        ▾
                      </span>
                    </button>

                    {isMobileInternationalOpen ? (
                      <div className="mt-1 grid gap-1 px-2 pb-2">
                        {INTERNATIONAL_DROPDOWN_ITEMS.map((interItem) => {
                          const isActive = pathname === interItem.href;
                          return (
                            <Link
                              key={`mobile-international-${interItem.href}`}
                              href={interItem.href}
                              onClick={closeMobileMenu}
                              className={`block border px-3 py-2 text-sm transition-colors duration-300 ease-out hover:border-[#FEA700]/40 hover:bg-[#FEA700]/10 hover:text-[#FEA700] ${
                                isActive
                                  ? "border-[#FEA700]/40 bg-[#FEA700]/10 text-[#FEA700]"
                                  : isTransparent
                                    ? "border-white/20 text-[#FFFFFF]"
                                    : "border-black/10 text-[#000000]"
                              }`}
                            >
                              {interItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={`mobile-${item.label}`}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 transition-colors duration-300 ease-out hover:text-[#FEA700]"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-semibold md:text-3xl">
            Shape Your Future with Us
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-md">
            Discover limitless opportunities at SVGOI, where innovation,
            learning, and industry connect.
          </p>
          <p className="text-sm leading-relaxed text-white/80 md:text-md">
            Take the first step towards your dreams. Explore our programs and
            get in touch to begin your journey with us.
          </p>
        </div>

        <div className="mt-14 border-t border-white/10 pt-14">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <section>
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/img/sviet_white.png"
                  alt="SVGOI logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto md:h-10"
                  style={{ width: "auto" }}
                />
              </div>

              <div className="mt-6 flex items-center gap-2">
                <a
                  href="https://www.facebook.com/svietofficial/"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center bg-white/15 text-white transition hover:bg-white/25"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/svietofficial/"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center bg-white/15 text-white transition hover:bg-white/25"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://in.linkedin.com/company/svgoichandigarh"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center bg-white/15 text-white transition hover:bg-white/25"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://www.youtube.com/@svietchandigarh3067"
                  aria-label="YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center bg-white/15 text-white transition hover:bg-white/25"
                >
                  <FaYoutube />
                </a>
              </div>

              <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/90">
                <div>
                  <p className="font-semibold uppercase tracking-wide">
                    Address
                  </p>
                  <p>
                    Village Ramnagar, Near Banur, Tehsil Rajpura, Patiala,
                    Punjab - 140601
                  </p>
                  <p className="mt-3">
                    Admission helpline Number : +91-94652-33333
                  </p>
                  <p>Toll Free: 1800-120-1200</p>
                  <p>Email: admission@sviet.ac.in | info@sviet.ac.in</p>
                  <p>Website: www.sviet.ac.in</p>
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-lg font-semibold uppercase">Quick Links</h4>
              <ul className="mt-5 space-y-3 text-sm text-white/85">
                {[
                  {
                    label: "Student ERP Login",
                    href: "https://uj.servergi.com:8079/ISIMSVIET/login",
                  },
                  {
                    label: "Faculty ERP Login",
                    href: "https://uj.servergi.com:8079/SIMWEBSVIET/Login",
                  },
                  {
                    label: "PTU Examination Portal",
                    href: "https://autono.in/",
                  },
                  { label: "SVGOI in your town", href: "/svgoi-in-town" },
                  {
                    label: "E-Brochure",
                    href: "/assets/docs/SVIET-Brochure-2025.pdf",
                  },
                  {
                    label: "How to Apply",
                    href: "https://admission.sviet.ac.in/",
                  },
                  {
                    label: "SVIET - ITI",
                    href: "http://svietiti.in/index.html",
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-lg font-semibold uppercase invisible" aria-hidden="true">
                Spacer
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-white/85">
                {[
                  { label: "Placement Overview", href: "/placements" },
                  { label: "Photo Gallery", href: "/gallery" },
                  { label: "Grievances/Enquiry", href: "/contact" },
                  {
                    label: "Final Year 2026 Group Pictures",
                    href: "https://drive.google.com/drive/folders/1nYNpfNbd1QNf8suyNeGJdM3uoAidO-Dx?usp=drive_link",
                  },
                  { label: "NAAC", href: "https://www.sviet.org.in" },
                  { label: "ISTE Sviet Chapter", href: "/iste" },
                  { label: "Careers", href: "/careers" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-lg font-semibold uppercase invisible" aria-hidden="true">
                Spacer
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-white/85">
                {/* <li>
                  <NccRegistrationButton />
                </li> */}
                {[
                  { label: "Research", href: "/research" },
                  {
                    label: "RNR Scholarship",
                    href: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumXRxmHO2YwQAC3BxfPnoR46m9tK5uUkNerSOE",
                  },
                  { label: "Contact-us", href: "/contact" },
                  { label: "Scholarship", href: "/admissions" },
                  { label: "Refund Policy", href: "/refund-policy" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  {
                    label: "Terms & Conditions",
                    href: "/terms-and-conditions",
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-5">
          <div className="flex flex-col items-center justify-between gap-2 text-sm text-white/65 md:flex-row">
            <p>© {new Date().getFullYear()} SVGOI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
