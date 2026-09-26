"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const APPLY_STEPS = [
  {
    title: "Complete the online application form",
    detail:
      "Start your admission journey by submitting the online application with accurate details.",
  },
  {
    title: "Receive Application ID via email",
    detail:
      "Once submitted, you will receive a unique Application ID for future reference.",
  },
  {
    title: "Appear for SVGOI-EEE or submit JEE score",
    detail:
      "Students may take the SVGOI-EEE test or apply using valid JEE Main scores.",
  },
  {
    title: "Check merit list and qualification status",
    detail:
      "Review your status after evaluation through the applicable admission route.",
  },
  {
    title: "Attend interview if applicable",
    detail:
      "Some programs may require an interview or additional interaction before confirmation.",
  },
  {
    title: "Document verification",
    detail: "Submit required documents for verification and admissions review.",
  },
  {
    title: "Receive provisional admission offer",
    detail:
      "Eligible applicants receive a provisional offer after successful verification.",
  },
  {
    title: "Complete fee payment",
    detail:
      "Confirm your seat by completing the required admission fee payment.",
  },
  {
    title: "Receive final admission confirmation",
    detail: "Get final confirmation once all formalities are completed.",
  },
  {
    title: "Begin your academic journey",
    detail: "Join SVGOI and start your classes with confidence and clarity.",
  },
] as const;

export function AdmissionsHowToApplySection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-[#f5f7fb] py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-[1fr_0.9fr] md:px-6">
        <div>
          <h2 className="text-4xl font-bold leading-tight text-[#1a1a21] md:text-5xl">
            Admission Process
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-[#4f4f5f] md:text-base">
            Simple. Structured. Transparent.
          </p>

          <div className="mt-7 divide-y divide-[#d8d7e3] border-y border-[#d8d7e3]">
            {APPLY_STEPS.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <article key={step.title} className="py-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(isActive ? -1 : index)}
                    className="flex w-full items-start justify-between gap-3 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#fed7aa] text-sm font-semibold text-[#f7941d]">
                        {index + 1}
                      </span>
                      <p className="text-base font-semibold text-[#16161d] md:text-lg">
                        {step.title}
                      </p>
                    </div>
                    <ChevronDown
                      className={`mt-1 h-4 w-4 shrink-0 text-[#64637c] transition ${isActive ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isActive ? (
                    <p className="ml-9 mt-2 max-w-2xl text-sm leading-relaxed text-[#4f4f5f]">
                      {step.detail}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>

        <div className="relative flex items-center justify-center bg-[#f5f7fb]">
          <Image
            src="/assets/img/banner/processform.png"
            alt="SVGOI admission process steps"
            width={900}
            height={1200}
            className="h-auto w-full max-w-140 object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
