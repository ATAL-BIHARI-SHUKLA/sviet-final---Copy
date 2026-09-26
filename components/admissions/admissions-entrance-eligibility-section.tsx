import { CheckCircle2 } from "lucide-react";

const TEST_PATHWAYS = [
  "Determining admission eligibility",
  "Identifying high-potential students",
] as const;

const APPLICATION_PATHS = ["JEE Main scores", "Merit-based selection"] as const;

const SCHOLARSHIP_OPTIONS = [
  "Merit-Based Scholarships",
  "SVGOI-EEE Performance Scholarships",
  "Merit-Cum-Means Support",
  "Government & Category-Based Scholarships",
  "Financial Assistance for eligible students",
] as const;

export function AdmissionsEntranceEligibilitySection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">
            Entrance &amp; Eligibility
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#1a1a1f] md:text-5xl">
            SVGOI-EEE: One Exam, Multiple Opportunities
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#4f4f5f] md:text-base">
            SVGOI conducts its own entrance and scholarship test - SVGOI-EEE
            (Entrance Exam Eligibility Test).
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-[#d8d8e2] bg-[#f5f7fb] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">
              Eligibility
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-tight text-[#1a1a1f] md:text-3xl">
              Entrance &amp; Application Pathways
            </h3>

            <div className="mt-6 space-y-3">
              {TEST_PATHWAYS.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-[#d8d8e2] bg-white px-4 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-sm font-medium text-[#1a1a1f] md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {/* {APPLICATION_PATHS.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#d8d8e2] bg-white px-4 py-2 text-sm font-medium text-[#1a1a1f]"
                >
                  {item}
                </span>
              ))} */} 
            </div>
          </article>

          <article className="rounded-3xl border border-[#d8d8e2] bg-[#f5f7fb] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">
              Scholarships
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-tight text-[#1a1a1f] md:text-3xl">
              Scholarships &amp; Financial Support
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#4f4f5f] md:text-base">
              SVGOI offers multiple scholarship pathways to support deserving
              students and ensure access to quality education.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {SCHOLARSHIP_OPTIONS.map((item) => (
                <article
                  key={item}
                  className="rounded-xl border border-[#d8d8e2] bg-white p-5 shadow-[0_8px_20px_rgba(30,42,120,0.06)]"
                >
                  <p className="text-base font-semibold text-[#111827]">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
