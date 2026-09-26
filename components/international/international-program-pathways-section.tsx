import Link from "next/link";

const PROGRAM_PATHWAYS = [
  {
    title: "Bachelors Programs",
    href: "/program-finder?interest=engineering",
  },
  {
    title: "Certificate Programs",
    href: "/program-finder?interest=computer",
  },
  {
    title: "Diploma",
    href: "/program-finder?interest=paramedical",
  },

  {
    title: "Industry Embedded",
    href: "/program-finder?interest=management",
  },
  {
    title: "Masters programs",
    href: "/program-finder?interest=management",
  },
] as const;

export function InternationalProgramPathwaysSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-3xl font-semibold leading-tight text-[#111827] md:text-5xl">
          Discover our diverse programs
          <br />
          <span className="">tailored pathways to your future</span>
        </h2>
        <p className="mt-4 max-w-2xl text-base text-[#374151] md:text-lg">
          We offer a wide array of programs designed to support your academic
          and professional aspirations.
        </p>

        <div className="mt-8 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PROGRAM_PATHWAYS.map((program, index) => {
            const last = index === PROGRAM_PATHWAYS.length - 1;
            return (
              <Link
                key={program.title}
                href={program.href}
                aria-label={`Explore ${program.title}`}
                className={`group relative h-full min-h-48 overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] ${last ? "bg-linear-to-br from-[#eef3ff] via-white to-[#f8fbff]" : ""}`}
              >
                <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#2563EB]/8 opacity-80 transition group-hover:bg-[#f7941d]/12" />
                <div
                  className={`relative flex h-full flex-col ${last ? "text-[#111827]" : ""}`}
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] ring-1 ring-[#2563EB]/10 transition group-hover:bg-[#2563EB] group-hover:text-white">
                    <span className="text-lg font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold leading-snug text-[#111827] md:text-2xl">
                    {program.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#4b5563] md:text-[15px]">
                    Explore curriculum options, career-oriented learning, and
                    flexible academic pathways.
                  </p>
                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition group-hover:text-[#f7941d]">
                      Know more{" "}
                      <span
                        aria-hidden="true"
                        className="transition group-hover:translate-x-0.5"
                      >
                        ›
                      </span>
                    </span>
                  </div>
                  <span className="absolute bottom-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25 transition group-hover:scale-110 group-hover:bg-[#f7941d] group-hover:shadow-[#f7941d]/30">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
