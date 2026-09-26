import { researchData } from "../research/research-data";

export function ResearchInnovationsSection() {
  const stats = [
    {
      number: researchData.stats.funding,
      label: "Research grants & funding",
    },
    {
      number: researchData.stats.patents,
      label: "Patents filed and certification",
    },
  ];

  return (
    <section className="bg-[#FFFFFF] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header - Centered */}
        <div className="mb-16 space-y-4 text-center">
          <p className="text-xl font-medium leading-tight text-[#6B7280] md:text-2xl">
            Innovation that drives change.
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#000000] md:text-5xl">
            Research that solves real challenges
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-[#6B7280] md:text-lg">
            A research-intensive learning environment focused on exploring
            practical, cutting-edge solutions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-3 border-r border-[#D1D5DB] last:border-r-0 py-8"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#f7941d]">
                {stat.number}
              </div>
              <p className="text-center text-sm md:text-base font-medium text-[#6B7280]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
