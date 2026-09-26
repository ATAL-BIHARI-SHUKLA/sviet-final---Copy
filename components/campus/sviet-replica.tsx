import Image from "next/image";
import Link from "next/link";
import eventsData from "@/data/data/event";

type NavItem = {
  label: string;
  href: string;
};

type SimpleCard = {
  title: string;
  subtitle?: string;
  image: string;
  date?: string;
  venue?: string;
};

type EventRecord = {
  id: number;
  name: string;
  headerImage: string;
  overview: string;
  date: string;
  venue: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "ABOUT", href: "#" },
  { label: "PROGRAMS", href: "/programs" },
  { label: "PLACEMENTS", href: "#" },
  { label: "ADMISSIONS", href: "#" },
  { label: "CAMPUS LIFE", href: "/campus-life" },
  { label: "EVENTS & SPOTLIGHT", href: "/events" },
  { label: "STUDENT PORTAL", href: "#" },
  { label: "CONTACT US", href: "#" },
];

const RECRUITERS = [
  "Deloitte.",
  "amazon",
  "wipro",
  "Infosys",
  "tcs",
  "Calvin Klein",
  "Dabur",
  "mamy's",
];

const DEFAULT_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80";

const normalizedEvents = (eventsData as EventRecord[]).map((event) => ({
  title: event.name,
  subtitle: event.overview,
  image: event.headerImage || DEFAULT_EVENT_IMAGE,
  date: event.date,
  venue: event.venue,
}));

const UPCOMING_EVENTS: SimpleCard[] = normalizedEvents;

const WORKSHOPS: SimpleCard[] = normalizedEvents.slice(0, 2);

const FACILITIES = [
  "Computer Labs",
  "Central Library",
  "Sports Complex",
  "Research Labs",
];

function truncateToWords(text: string | undefined, maxWords: number) {
  if (!text) {
    return "";
  }

  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) {
    return text;
  }

  return `${words.slice(0, maxWords).join(" ")} ....`;
}

function TopUtilityBar() {
  return (
    <div className="w-full border-b border-neutral-200 bg-[#f8f8f8] px-3 py-1 text-[10px] text-neutral-700 md:px-5 md:text-sm">
      <div className="mx-auto flex w-full max-w-300 items-center justify-between">
        <p className="truncate">
          Accredited higher education institute in Engineering & Core Studies.
        </p>
        <div className="ml-3 flex items-center gap-3 whitespace-nowrap">
          <span>WhatsApp</span>
          <span className="rounded bg-[#f7941d] px-2 py-0.5 text-white">
            1800-180-000
          </span>
          <span>◎</span>
          <span>◐</span>
        </div>
      </div>
    </div>
  );
}

function MainNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex w-full max-w-300 items-center justify-between px-3 py-3 md:px-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-sm bg-[#1d65b9]" />
          <span className="font-serif text-[42px] leading-none text-[#1d65b9]">
            SVGOI
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-[11px] font-semibold tracking-wide text-[#1b1b1b] lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-[#f7941d]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HomeHero() {
  return (
    <section className="mx-auto mt-2 w-full max-w-300 px-3 md:px-5">
      <div
        className="relative h-82 overflow-hidden rounded-md bg-cover bg-center md:h-96"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.56), rgba(0,0,0,0.72)), url('https://images.unsplash.com/photo-1485872299829-c673f5194813?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="grid h-full grid-cols-1 items-end gap-4 p-4 text-white md:grid-cols-[0.48fr_0.52fr] md:p-8">
          <div className="relative flex h-full items-end justify-start">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
              alt="Student"
              width={900}
              height={1200}
              className="h-72 w-64 rounded-xl object-cover md:h-80 md:w-72"
            />
            <div className="absolute left-2 top-4 rounded bg-black/35 px-3 py-2 text-sm font-semibold backdrop-blur-sm">
              <p>11 LPA</p>
              <p className="text-white/85">MOON MANDAL</p>
              <p className="mt-1 rounded-full bg-[#1469d9] px-2 py-0.5 text-center">
                Jio
              </p>
            </div>
          </div>
          <div className="pb-2">
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Launch Your Career
              <br />
              With Industry-Ready
              <br />
              Degrees
            </h1>
            <div className="mt-5 grid grid-cols-3 gap-3 border-l border-white/25 pl-3 text-left md:gap-6">
              <div>
                <p className="text-5xl font-extrabold md:text-6xl">3,000+</p>
                <p className="text-sm font-medium text-white/85">
                  Offer Letters
                </p>
              </div>
              <div>
                <p className="text-5xl font-extrabold md:text-6xl">12,000+</p>
                <p className="text-sm font-medium text-white/85">
                  Dreams Fulfilled
                </p>
              </div>
              <div>
                <p className="text-5xl font-extrabold md:text-6xl">350+</p>
                <p className="text-sm font-medium text-white/85">
                  Companies Visited Per Year
                </p>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href="https://admission.sviet.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-[#f7941d] px-6 py-3 text-sm font-semibold text-white md:text-base"
              >
                Apply Now ↗
              </a>
              <button className="rounded-lg border border-white/60 bg-black/45 px-6 py-3 text-sm font-semibold text-white md:text-base">
                Talk To Counselor ↗
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-20 hidden -rotate-90 rounded-t-md bg-[#f7941d] px-3 py-2 text-sm font-semibold text-white md:block">
          APPLY NOW
        </div>
      </div>
    </section>
  );
}

function CampusHero() {
  return (
    <section className="mx-auto mt-2 w-full max-w-300 overflow-hidden rounded-md px-3 md:px-5">
      <div
        className="relative h-85 overflow-hidden rounded-md bg-cover bg-center md:h-110"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.68), rgba(0,0,0,0.36)), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="flex h-full flex-col justify-end p-5 text-white md:p-8">
          <h1 className="text-6xl font-extrabold leading-[0.9] tracking-tight md:text-8xl">
            CAMPUS LIFE
          </h1>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-4xl font-extrabold leading-[0.95] md:text-6xl">
                PIONEERING
                <br />
                <span className="text-[#f7941d]">POSSIBILITIES</span>
              </h2>
              <p className="mt-2 text-lg font-medium">Research & Innovation</p>
            </div>
            <div className="max-w-sm">
              <p className="text-xl font-medium leading-tight md:text-3xl">
                Technology Enhanced Experimental Learning With Advance Learning
                Centers & Labs.
              </p>
              <button className="mt-4 rounded-lg bg-[#f7941d] px-6 py-3 text-base font-semibold text-white">
                Video Tour ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramFinderSection() {
  return (
    <section className="mx-auto mt-12 w-full max-w-300 px-3 md:px-5">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-xl border border-[#dfdfdf] bg-[#f7f7f7] p-6 md:p-10">
          <h3 className="text-5xl font-black uppercase leading-[0.95] text-[#111] md:text-6xl">
            Find Your Own Program
          </h3>
          <p className="mt-2 text-sm text-[#555]">
            Answer a few quick questions to discover programs tailored to your
            goals.
          </p>
          <div className="mt-6 h-1 w-full rounded-full bg-[#dfdfdf]">
            <div className="h-full w-1/4 rounded-full bg-[#f7941d]" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Engineering & Technology",
              "Business & Management",
              "Design & Creative Arts",
              "Science & Research",
              "Healthcare & Medicine",
              "Architecture & Planning",
            ].map((option) => (
              <button
                key={option}
                className="flex items-center justify-between rounded-xl border border-[#dddddd] bg-white px-5 py-6 text-left text-lg font-semibold text-[#1e2430]"
              >
                {option}
                <span className="text-[#8b9098]">›</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-[#e2e2e2] bg-[#f7f7f7] p-4">
            <div className="mb-3 h-1 w-full rounded-full bg-[#dedede]">
              <div className="h-full w-[45%] rounded-full bg-[#f7941d]" />
            </div>
            <p className="mb-3 text-sm font-semibold text-[#333]">
              Preferred career outcome
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                "Software Engineer",
                "Entrepreneur",
                "Data Scientist",
                "Product Manager",
                "Digital Marketing",
                "Financial Analyst",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-[#e4e4e4] bg-white p-3 text-[#32373e]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#e2e2e2] bg-[#f7f7f7] p-4">
            <div className="mb-3 h-1 w-full rounded-full bg-[#dedede]">
              <div className="h-full w-[55%] rounded-full bg-[#f7941d]" />
            </div>
            <p className="mb-3 text-sm font-semibold text-[#333]">
              Academic preference
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                "Hands-on & Practical",
                "Theoretical & Research",
                "Balanced Approach",
                "Team Collaboration",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-[#e4e4e4] bg-white p-3 text-[#32373e]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#e2e2e2] bg-[#f7f7f7] p-4">
            <div className="mb-3 h-1 w-full rounded-full bg-[#dedede]">
              <div className="h-full w-[85%] rounded-full bg-[#f7941d]" />
            </div>
            <p className="mb-3 text-sm font-semibold text-[#333]">
              Location & budget
            </p>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-3 gap-2">
                {["On-campus", "Hybrid", "Online"].map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-[#e4e4e4] bg-white p-2 text-center text-[#32373e]"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Up to 2L / year",
                  "2L to 5L / year",
                  "Flexible schedule",
                  "Weekend classes",
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-md border p-2 text-center ${index === 3 ? "border-[#f7941d] bg-[#fff7ef]" : "border-[#e4e4e4] bg-white"}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[#e2e2e2] bg-white p-4">
            <p className="text-sm text-[#f7941d]">BEST MATCH (91%)</p>
            <h4 className="mt-1 text-lg font-bold text-[#222]">
              B.Tech in Computer Science
            </h4>
            <p className="mt-1 text-sm text-[#666]">
              4 years • AICTE approved • Flexible specializations
            </p>
            <div className="mt-3 flex gap-2">
              <button className="rounded bg-[#f7941d] px-3 py-1.5 text-sm font-semibold text-white">
                Apply now
              </button>
              <button className="rounded border border-[#ddd] px-3 py-1.5 text-sm font-semibold">
                Read more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlacementStatsSection() {
  return (
    <section className="mx-auto mt-12 w-full max-w-300 px-3 md:px-5">
      <Image
        src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80"
        alt="Placement banner"
        width={1600}
        height={600}
        className="h-19 w-full rounded-md object-cover md:h-30"
      />
      <div className="mt-8 grid grid-cols-3 gap-4 border-b border-[#ececec] pb-8 text-center">
        <div>
          <p className="text-4xl font-bold text-[#1b1b1b] md:text-5xl">
            12,000+
          </p>
          <p className="text-sm font-semibold">Dreams Fulfilled</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-[#1b1b1b] md:text-5xl">350+</p>
          <p className="text-sm font-semibold">Companies Visited Per Year</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-[#1b1b1b] md:text-5xl">
            3,000+
          </p>
          <p className="text-sm font-semibold">Offer Letters</p>
        </div>
      </div>
    </section>
  );
}

function RecruiterGrid() {
  return (
    <section className="mx-auto mt-6 w-full max-w-300 px-3 md:px-5">
      <h3 className="text-center text-3xl font-black text-[#141414] md:text-4xl">
        Companies That Hire Our Graduates
      </h3>
      <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-md border border-[#ececec] md:grid-cols-4">
        {RECRUITERS.map((company) => (
          <div
            key={company}
            className="flex min-h-24 items-center justify-center border border-[#efefef] px-4 py-7 text-4xl font-semibold text-[#232323] md:text-5xl"
          >
            <span className="scale-90 md:scale-100">{company}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CampusLifeSection() {
  return (
    <section className="mx-auto mt-12 w-full max-w-300 px-3 md:px-5">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-5xl font-extrabold leading-none text-[#141414]">
            A HOME <span className="text-[#f7941d]">AWAY</span>
            <br />
            FROM HOME
          </h3>
          <p className="mt-4 max-w-md text-2xl font-medium leading-tight text-[#1f1f1f]">
            Cosmopolitan Campus With Vibrant Cultures, Multilateral Ideas & A
            Lot More
          </p>
          <button className="mt-5 rounded-lg bg-[#f7941d] px-6 py-3 text-lg font-semibold text-white">
            Video Tour ↗
          </button>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
          alt="Campus building"
          width={1200}
          height={900}
          className="h-75 w-full rounded-lg object-cover md:h-95"
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="space-y-4 rounded-lg bg-[#f4f4f4] p-4">
          <p className="text-2xl font-semibold">WHAT PEOPLE SAY ABOUT US ?</p>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm uppercase tracking-wide text-[#f7941d]">
              Students Speak
            </p>
            <p className="mt-2 text-sm text-[#454545]">
              Outstanding experience and incredible professors. The practical
              learning and world-class support helped me thrive.
            </p>
            <p className="mt-3 text-xl font-bold">Yash Khandelwal</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm uppercase tracking-wide text-[#f7941d]">
              Students Speak
            </p>
            <p className="mt-2 text-sm text-[#454545]">
              Great learning experience and outstanding faculty guidance. Truly
              transformed my educational journey.
            </p>
            <p className="mt-3 text-xl font-bold">Yash Khandelwal</p>
          </div>
        </div>
        <div className="grid gap-4">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
            alt="Student speaking"
            width={1200}
            height={900}
            className="h-70 w-full rounded-lg object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
            alt="Award event"
            width={1200}
            height={900}
            className="h-70 w-full rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="mt-7 rounded-xl bg-black px-6 py-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-2xl font-semibold">APPLY NOW FOR SVGOIEE - 2026</p>
          <a
            href="https://admission.sviet.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-white/30 px-4 py-2 text-sm font-semibold"
          >
            Apply Now ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function EventsSpotlightSection() {
  return (
    <section className="mx-auto mt-12 w-full max-w-300 px-3 md:px-5">
      <div className="rounded-2xl bg-black p-8 text-white">
        <h3 className="text-5xl font-extrabold">GALLERY HIGHLIGHTS</h3>
        <p className="mt-3 max-w-3xl text-base text-white/80 md:text-lg">
          Explore our collection of memorable moments and events that capture
          the vibrant life at Swami Vivekanand Group of Institutions.
        </p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Image
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
          alt="Gallery image"
          width={1200}
          height={900}
          className="h-65 w-full rounded-lg object-cover"
        />
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
          alt="Gallery image"
          width={1200}
          height={900}
          className="h-65 w-full rounded-lg object-cover"
        />
        <Image
          src="https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80"
          alt="Gallery image"
          width={1200}
          height={900}
          className="h-65 w-full rounded-lg object-cover"
        />
        <Image
          src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=1200&q=80"
          alt="Gallery image"
          width={1200}
          height={900}
          className="h-65 w-full rounded-lg object-cover"
        />
      </div>

      <h4 className="mt-8 text-3xl font-bold uppercase text-[#1f1f1f]">
        Memorable Events
      </h4>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-lg">
            <Image
              src={`https://images.unsplash.com/photo-${idx % 2 === 0 ? "1533174072545-7a4b6ad7a6c3" : "1511795409834-ef04bbd61622"}?auto=format&fit=crop&w=1200&q=80`}
              alt="Event"
              width={1200}
              height={800}
              className="h-60 w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent p-4">
              <div className="absolute bottom-4">
                <p className="text-4xl font-extrabold text-white">SPONTANIA</p>
                <p className="mt-1 max-w-52.5 text-[11px] leading-tight text-white/80">
                  Explore our collection of memorable moments and events that
                  capture the vibrant life.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="mx-auto mt-12 w-full max-w-300 px-3 md:px-5">
      <h3 className="text-4xl font-black text-[#141414]">
        The Distinguished: Leaders, Visionaries And Changemakers
      </h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {["Aman Gupta", "Ashneer"].map((name, idx) => (
          <div
            key={name}
            className="overflow-hidden rounded-xl bg-[#f3f3f3] p-3"
          >
            <Image
              src={`https://images.unsplash.com/photo-${idx === 0 ? "1500648767791-00dcc994a43e" : "1507003211169-0a1dd7228f2d"}?auto=format&fit=crop&w=1200&q=80`}
              alt={name}
              width={1200}
              height={900}
              className="h-62.5 w-full rounded-lg object-cover"
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xl font-bold">{name}</p>
              <button className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white">
                Check Event ↗
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AdmissionFormSection() {
  return (
    <section className="mx-auto mt-12 w-full max-w-300 px-3 pb-12 md:px-5">
      <div className="grid items-end gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <form className="space-y-3 rounded-xl bg-[#f2f2f2] p-4">
          <p className="text-sm font-semibold text-[#555]">
            Check your scholarship eligibility
          </p>
          <input
            className="w-full rounded border border-[#dcdcdc] bg-white px-3 py-2 text-sm"
            placeholder="Name"
          />
          <input
            className="w-full rounded border border-[#dcdcdc] bg-white px-3 py-2 text-sm"
            placeholder="Email"
          />
          <input
            className="w-full rounded border border-[#dcdcdc] bg-white px-3 py-2 text-sm"
            placeholder="Phone"
          />
          <button
            type="button"
            className="w-full rounded bg-black px-4 py-2 text-sm font-semibold text-white"
          >
            Check Now
          </button>
        </form>
        <Image
          src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=80"
          alt="Scholarship students"
          width={1400}
          height={700}
          className="h-45 w-full rounded-xl object-cover md:h-55"
        />
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-black px-3 py-8 text-white md:px-5">
      <div className="mx-auto grid w-full max-w-300 gap-8 md:grid-cols-[1fr_1fr_0.7fr]">
        <div>
          <p className="font-serif text-6xl leading-none">SVGOI</p>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            Swami Vivekanand Institute Of Engineering & Technology Promoted By
            Raghunath Rai Memorial Trust.
          </p>
          <p className="mt-3 text-sm text-white/70">
            Village: Pamaur Near Banur Tehsil Rajpura, Distt: Patiala
          </p>
          <p className="mt-2 text-sm text-white/70">
            Admissions: +91 99882 33333
          </p>
        </div>
        <form className="space-y-2">
          <p className="text-2xl font-semibold">Question us</p>
          <input
            className="w-full rounded bg-[#131313] px-3 py-2 text-sm"
            placeholder="First Name"
          />
          <input
            className="w-full rounded bg-[#131313] px-3 py-2 text-sm"
            placeholder="Course"
          />
          <input
            className="w-full rounded bg-[#131313] px-3 py-2 text-sm"
            placeholder="Phone"
          />
          <input
            className="w-full rounded bg-[#131313] px-3 py-2 text-sm"
            placeholder="Email"
          />
          <button
            type="button"
            className="w-full rounded bg-white px-3 py-2 text-sm font-semibold text-black"
          >
            Get started
          </button>
        </form>
        <ul className="space-y-2 text-sm text-white/90">
          {["About Us", "Careers", "FAQs", "Teams", "Contact Us"].map(
            (item) => (
              <li
                key={item}
                className="flex items-center justify-between border-b border-white/10 py-2"
              >
                <span>{item}</span>
                <span>‹</span>
              </li>
            ),
          )}
        </ul>
      </div>
    </footer>
  );
}

function EducationBlocks() {
  return (
    <section className="mx-auto mt-8 w-full max-w-300 px-3 md:px-5">
      <h3 className="text-4xl font-bold text-[#111] md:text-5xl">
        Education Beyond The Classroom
      </h3>
      <p className="mt-2 max-w-5xl text-sm text-[#505050] md:text-base">
        Education at SVGOI goes beyond traditional academics through the 360
        Program and a range of unique experiential initiatives.
      </p>
      <div className="mt-4 overflow-hidden rounded-md border border-[#e7e7e7]">
        <div className="bg-[#b60f1b] px-4 py-2 text-sm font-semibold text-white">
          The Leadership Development Program
        </div>
        <div className="grid gap-4 bg-white p-4 md:grid-cols-[1fr_1fr_auto]">
          <div className="text-sm text-[#444]">
            <p className="font-semibold text-[#222]">Industry Mentorship</p>
            <p className="mt-1">
              Learn from experts through regular sessions that sharpen your
              practical understanding.
            </p>
          </div>
          <div className="text-sm text-[#444]">
            <p className="font-semibold text-[#222]">Leadership Development</p>
            <p className="mt-1">
              Comprehensive training, activities, and mentorship to build
              future-ready leaders.
            </p>
          </div>
          <button className="h-fit rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white">
            GET YOUR OWN STARTUP ↗
          </button>
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-md border border-[#efefef]">
        <div className="bg-[#f7941d] px-4 py-2 text-sm font-semibold text-white">
          Experiences That Shape Future Professionals
        </div>
        <div className="grid gap-4 bg-white p-4 md:grid-cols-[1fr_1fr_auto]">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
            alt="Lecture"
            width={900}
            height={600}
            className="h-36 w-full rounded object-cover"
          />
          <div className="text-sm text-[#444]">
            <p className="font-semibold text-[#222]">
              Startup & Innovation Culture
            </p>
            <p className="mt-1">
              From ideation to execution, students explore hands-on innovation
              through workshops and events.
            </p>
          </div>
          <button className="h-fit rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white">
            GET YOUR OWN STARTUP ↗
          </button>
        </div>
      </div>
      <Image
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
        alt="Ranking banner"
        width={1600}
        height={700}
        className="mt-5 h-55 w-full rounded-xl object-cover"
      />
    </section>
  );
}

function StudentsSpeakAndFormSection() {
  return (
    <section className="mx-auto mt-10 w-full max-w-300 px-3 md:px-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="grid grid-cols-[0.55fr_0.45fr] gap-3 rounded-xl bg-[#f1f1f1] p-3">
          <Image
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80"
            alt="Student"
            width={1000}
            height={1400}
            className="h-77.5 w-full rounded-lg object-cover"
          />
          <div className="space-y-3">
            <div className="rounded-lg bg-white p-3 text-sm text-[#444]">
              Great learning experience and supportive faculty.
            </div>
            <div className="rounded-lg bg-white p-3 text-sm text-[#444]">
              Good exposure to projects and practical knowledge.
            </div>
            <div className="rounded-lg bg-white p-3 text-sm text-[#444]">
              Career support has been outstanding.
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-4xl font-black text-[#1a1a1a]">
            Our Students Speak
          </h3>
          <p className="text-[#555]">
            Hear directly from learners and achievers.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <input
              className="rounded border border-[#ddd] bg-[#f4f4f4] px-3 py-2"
              placeholder="Name"
            />
            <input
              className="rounded border border-[#ddd] bg-[#f4f4f4] px-3 py-2"
              placeholder="Phone"
            />
            <input
              className="col-span-2 rounded border border-[#ddd] bg-[#f4f4f4] px-3 py-2"
              placeholder="Email"
            />
            <button className="col-span-2 rounded bg-[#f7941d] px-4 py-3 font-semibold text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePageReplica() {
  return (
    <div className="bg-background text-[#111]">
      <HomeHero />
      <EducationBlocks />
      <PlacementStatsSection />
      <RecruiterGrid />
      <TestimonialsSection />
      <StudentsSpeakAndFormSection />
      <AdmissionFormSection />
    </div>
  );
}

export function CampusLifePageReplica() {
  return (
    <div className="bg-background text-[#111]">
      <CampusHero />
      <CampusLifeSection />
      <EventsSpotlightSection />
    </div>
  );
}

export function EventsPageReplica() {
  return (
    <div className="bg-background text-[#111]">
      <section className="mx-auto mt-2 w-full max-w-300 px-3 md:px-5">
        <div
          className="relative h-82.5 overflow-hidden rounded-md bg-cover bg-center md:h-105"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1592303637753-cef44e1ca6c1?auto=format&fit=crop&w=1600&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute left-3 top-1/2 w-full -translate-y-1/2 px-3 text-white md:left-10 md:px-0">
            <h1 className="text-8xl font-extrabold leading-none tracking-tight text-white/90 md:text-[8.5rem]">
              EVENTS
            </h1>
            <p className="mt-2 max-w-3xl text-lg font-semibold md:text-3xl">
              SOMETHING IMPORTANT IS HAPPENING, AND I&apos;M PART OF IT
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-300 px-3 md:px-5">
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            height: "360px",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1600&q=80"
            alt="Spontania featured"
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-5 left-5 text-white md:bottom-6 md:left-6">
            <h2 className="text-5xl font-extrabold">SPONTANIA</h2>
            <p className="mt-2 max-w-lg text-sm md:text-base">
              Join the cultural fusion fest where creativity meets spirited
              celebration.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-300 px-3 md:px-5">
        <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
          <div className="rounded-xl bg-[#f7f7f7] p-5 md:p-8">
            <h2 className="text-5xl font-black uppercase tracking-tight text-[#111]">
              ELEVATE
            </h2>
            <p className="mt-3 text-sm text-[#333] md:text-base">
              Cosmopolitan Campus With Vibrant Cultures, Multilateral Ideas & A
              Lot More
            </p>
            <button className="mt-5 rounded-lg bg-[#f7941d] px-5 py-2.5 text-sm font-semibold text-white">
              Visit Highlight
            </button>
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80"
              alt="Spontania split"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-3xl font-bold">SPONTANIA</h3>
              <p className="mt-1 text-sm">
                Explore the cultural fest moments that showcase student talent
                and spirit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-300 px-3 md:px-5">
        <h2 className="text-4xl font-bold">All Upcoming Events</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {UPCOMING_EVENTS.map((event) => (
            <article
              key={event.title}
              className="rounded-xl border border-[#e6e6e6] bg-white p-4"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={1200}
                height={800}
                className="h-36 w-full rounded-lg object-cover"
              />
              <div className="mt-3 flex items-center justify-between text-sm text-[#f7941d] font-semibold">
                <span className="rounded-full border border-[#f7941d] px-2 py-0.5">
                  Cultural
                </span>
                <span>{event.date ?? "TBA"}</span>
              </div>
              <h3 className="mt-2 text-lg font-bold">{event.title}</h3>
              <p className="mt-1 text-sm text-[#555]">
                {truncateToWords(event.subtitle, 30)}
              </p>
              <p className="mt-2 text-sm text-[#777]">
                {event.venue ?? "SVGOI Campus"}
              </p>
              <a className="mt-3 inline-block text-sm font-semibold text-[#f7941d]">
                View Details →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-300 px-3 md:px-5">
        <h2 className="text-4xl font-bold">Workshops</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {WORKSHOPS.map((event) => (
            <article
              key={event.title}
              className="rounded-xl border border-[#e6e6e6] bg-white p-4"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={1200}
                height={800}
                className="h-40 w-full rounded-lg object-cover"
              />
              <div className="mt-2 text-sm text-[#f7941d] font-bold">
                Workshop
              </div>
              <h3 className="mt-1 text-lg font-bold">{event.title}</h3>
              <p className="mt-1 text-sm text-[#777]">{event.date ?? "TBA"}</p>
              <a className="mt-3 inline-block text-sm font-semibold text-[#f7941d]">
                View Details →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-300 px-3 md:px-5">
        <div className="grid gap-3 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <article
              key={idx}
              className="relative overflow-hidden rounded-xl"
              style={{ height: "300px" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80"
                alt={`Spontania ${idx}`}
                width={1600}
                height={900}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-3xl font-extrabold">SPONTANIA</h3>
                <p className="mt-1 max-w-xs text-sm">
                  Experience the cultural celebration with music, dance and live
                  performances.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-300 px-3 md:px-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
            alt="TechVision speaker"
            width={1200}
            height={900}
            className="h-72 w-full rounded-xl object-cover"
          />
          <div className="rounded-xl border border-[#e6e6e6] bg-white p-6">
            <span className="rounded-full bg-[#f7941d] px-3 py-1 text-sm font-bold uppercase text-white">
              Featured Event
            </span>
            <h3 className="mt-4 text-2xl font-black">
              TechVision 2026: Innovation Summit
            </h3>
            <p className="mt-2 text-sm text-[#555]">
              Annual flagship technology summit featuring industry leaders and
              cutting-edge innovations.
            </p>
            <p className="mt-4 text-sm text-[#777]">
              April 15, 2026 · SVGOI Main Auditorium
            </p>
            <div className="mt-5 flex gap-3">
              <button className="rounded-lg bg-[#f7941d] px-4 py-2 text-sm font-semibold text-white">
                View Event
              </button>
              <button className="rounded-lg border border-[#f7941d] px-4 py-2 text-sm font-semibold text-[#f7941d]">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-300 px-3 md:px-5">
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            height: "300px",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80"
            alt="Spontania large banner"
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <div className="absolute bottom-5 left-5 text-white">
            <h3 className="text-4xl font-extrabold">SPONTANIA</h3>
            <p className="mt-2 max-w-lg text-sm">
              Explore our collection of memorable moments and events that
              capture the vibrant life at SVGOI.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-300 px-3 md:px-5 pb-12">
        <h2 className="text-4xl font-bold">Past Events</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Blockchain & Web3 Summit",
              description:
                "Explore decentralized technologies and future of digital finance.",
              date: "Mar 13, 2026",
              location: "SVGOI Tech Hub",
              image:
                "https://images.unsplash.com/photo-1558655146-364db4ea40e1?auto=format&fit=crop&w=1200&q=80",
            },
            {
              title: "Annual Sports Day 2025",
              description: "College sports competition and athletic events.",
              date: "Mar 18, 2025",
              location: "Sports Complex",
              image:
                "https://images.unsplash.com/photo-1521302080371-45145b4c48f8?auto=format&fit=crop&w=1200&q=80",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-[#e6e6e6] bg-white p-4"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={800}
                className="h-40 w-full rounded-lg object-cover"
              />
              <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-[#555]">{item.description}</p>
              <p className="mt-2 text-sm text-[#777]">
                {item.date} · {item.location}
              </p>
              <a className="mt-3 inline-block text-sm font-semibold text-[#f7941d]">
                View Details →
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export const ProgramDetailPageReplica = HomePageReplica;
