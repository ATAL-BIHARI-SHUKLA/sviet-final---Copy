const SCHOLARSHIP_OPTIONS = [
  "Merit-Based Scholarships",
  "SVGOI-EEE Performance Scholarships",
  "Merit-Cum-Means Support",
  "Government & Category-Based Scholarships",
  "Financial Assistance for eligible students",
] as const;

export function AdmissionsScholarshipsSection() {
  return (
    <section className="bg-[#f5f7fb] py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">Scholarships</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#1a1a1f] md:text-5xl">
            Scholarships &amp; Financial Support
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#4f4f5f] md:text-base">
            SVGOI offers multiple scholarship pathways to support deserving students and ensure access to quality
            education.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SCHOLARSHIP_OPTIONS.map((item) => (
            <article key={item} className="rounded-xl border border-[#d8d8e2] bg-white p-5 shadow-[0_8px_20px_rgba(30,42,120,0.06)]">
              <p className="text-base font-semibold text-[#111827]">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
