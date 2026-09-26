import Image from "next/image";

const ENRICHING_ITEMS = [
  {
    title: "Career-oriented curriculum",
    description:
      "Programs are structured to build capability, confidence, and clear career direction.",
  },
  {
    title: "Practical exposure and live projects",
    description:
      "Students apply classroom learning through hands-on work and guided industry tasks.",
  },
  {
    title: "Strong placement ecosystem",
    description:
      "Focused support helps students prepare for interviews, hiring rounds, and career transitions.",
  },
  {
    title: "Vibrant campus life",
    description:
      "The campus experience supports personal growth, collaboration, and a balanced student journey.",
  },
  {
    title: "Innovation and entrepreneurship culture",
    description:
      "Students are encouraged to build, test, and explore new ideas through a supportive ecosystem.",
  },
] as const;

export function AdmissionsEnrichingWaysSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-[1fr_360px] md:px-6 lg:grid-cols-[1fr_420px]">
        <div>
          <h2 className="text-4xl font-bold leading-tight text-[#1b1b22] md:text-5xl">
            Why Choose <span className="text-[#2563EB]">SVGOI</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-[#4a4a58] md:text-base">
            SVGOI focuses on building capability, not just degrees.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {ENRICHING_ITEMS.map((item) => (
              <article key={item.title}>
                <p className="text-base font-semibold text-[#111]">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#4a4a58]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl">
          <Image
            src="/assets/img/infrastructure/buildings/admin.jpg"
            alt="Students learning"
            width={420}
            height={500}
            className="h-full min-h-75 w-full object-left object-cover"
          />
        </div>
      </div>
    </section>
  );
}
