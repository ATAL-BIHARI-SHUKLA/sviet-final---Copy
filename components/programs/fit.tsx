import { CheckCircle2, Circle } from "lucide-react";

import { FIT_TRAITS } from "@/components/programs/data";

export function ProgramFitSection() {
  return (
    <section className="mx-auto mt-30 mb-15 w-full max-w-300 rounded-xl bg-[#f0f0f0] px-3 py-15 md:px-5">
      <p className="text-center text-sm font-semibold tracking-[0.08em] text-[#f7941d] uppercase">
        Program Fit
      </p>
      <h2 className="text-center mt-2 text-4xl font-extrabold">
        Is This Program Right for You?
      </h2>
      <p className="mt-2 text-center text-sm text-[#666]">
        Select the traits that describe you best.
      </p>
      <div className="mx-auto mt-6 grid max-w-4xl gap-3 md:grid-cols-2">
        {FIT_TRAITS.map((item, idx) => (
          <button
            key={item}
            className={`flex items-center gap-2 rounded-lg border px-4 py-4 text-left text-sm font-semibold ${idx === 0 || idx === 3 ? "border-[#f7941d] bg-[#fff7ef] text-[#f7941d]" : "border-[#d9d9d9] bg-white text-[#555]"}`}
          >
            <span>
              {idx === 0 ? "🧩" : idx === 1 ? "💻" : idx === 2 ? "📊" : "🔧"}
            </span>
            <span className="flex-1">{item}</span>
            {idx === 0 || idx === 3 ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Circle className="h-4 w-4 text-[#cfcfcf]" />
            )}
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#86efac] bg-[#f0fff4] px-5 py-2.5 text-sm font-semibold text-[#166534]">
          <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
          You&apos;re a good fit for B.Tech CSE!
        </div>
      </div>
      <div className="mt-4 text-center">
        <button className="rounded-lg bg-[#f7941d] px-6 py-3 text-base font-semibold text-white">
          Start Your Application →
        </button>
      </div>
    </section>
  );
}
