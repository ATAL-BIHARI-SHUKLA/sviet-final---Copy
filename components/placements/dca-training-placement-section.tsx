const DCA_FEATURES = [
  {
    icon: "📊",
    title: "Skill Development Programs",
    description:
      "Structured aptitude training, coding bootcamps, soft skills workshops, and communication labs — preparing students for every stage of the hiring process.",
  },
  {
    icon: "🎯",
    title: "Mock Interview Drives",
    description:
      "Industry-simulated interview rounds with real recruiters, covering technical, HR, and group discussion rounds across multiple domains.",
  },
  {
    icon: "🤝",
    title: "Corporate Connect Sessions",
    description:
      "Live sessions with hiring managers and HR leaders from top companies, giving students direct access to industry insights and career guidance.",
  },
];

export function DCATrainingPlacementSection() {
  return (
    <section className="bg-[#f8faff] px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f7941d]">
          Department of Corporate Affairs &amp; Training
        </p>
        <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <h2 className="text-3xl font-bold text-[#111827] md:text-4xl">
              DCA — Bridging Academia and Industry
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6b7280]">
              The Department of Corporate Affairs (DCA) at SVGOI is the engine
              behind our placement success — designing and executing programs
              that turn students into workplace-ready professionals before they
              even graduate.
            </p>
          </div>
          <div className="rounded-xl border border-[#dce7ff] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">
              DCA At a Glance
            </p>
            <div className="mt-3 space-y-2">
              {[
                ["2,200+", "Recruiting Partners"],
                ["95%+", "Placement Rate"],
                ["60 LPA", "Highest Package"],
              ].map(([val, label]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-[#374151]">{label}</span>
                  <span className="text-sm font-bold text-[#f7941d]">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {DCA_FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-[#dce7ff] bg-white p-6 shadow-sm"
            >
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="text-base font-bold text-[#111827]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
