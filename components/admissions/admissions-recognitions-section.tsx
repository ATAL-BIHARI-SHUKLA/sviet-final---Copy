const TRUST_STATS = [
  {
    title: "25+ Acres",
    description: "Spacious & modern campus",
    tone: "from-[#0a1f5c] to-[#1d4ed8]",
  },
  {
    title: "250+ Faculty Members",
    description: "Academic and industry expertise",
    tone: "from-[#f7941d] to-[#d97706]",
  },
  {
    title: "25,000+ Alumni Network",
    description: "Strong global presence",
    tone: "from-[#111827] to-[#1f2937]",
  },
  {
    title: "1000+ International Students",
    description: "Diverse learning environment",
    tone: "from-[#1d4ed8] to-[#1e3a8a]",
  },
  {
    title: "350+ Companies Visit Every Year",
    description: "Strong industry connections",
    tone: "from-[#f7941d] to-[#b45309]",
  },
  {
    title: "5000+ Students Placed",
    description: "Career-focused outcomes",
    tone: "from-[#003087] to-[#0a1f5c]",
  },
  {
    title: "Scholarships Available Across Programs",
    description: "Financial support opportunities",
    tone: "from-[#1d4ed8] to-[#003087]",
  },
  {
    title: "₹2.5 Cr+ Startup Support",
    description: "Entrepreneurship ecosystem",
    tone: "from-[#1f2937] to-[#111827]",
  },
] as const;

export function AdmissionsRecognitionsSection() {
  return (
    <section className="bg-[#f5f7fb] py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl  px-4 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {TRUST_STATS.map((item) => (
            <article
              key={item.title}
              className={`relative overflow-hidden rounded-xl bg-linear-to-br p-5 text-white shadow-lg md:p-6 ${item.tone}`}
            >
              <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full border border-white/10" />
              <h3 className="relative text-2xl font-bold leading-tight md:text-3xl">
                {item.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-white/85">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-[#4b5563] md:text-sm">
          Figures represent cumulative institutional data.
        </div>
      </div>
    </section>
  );
}
