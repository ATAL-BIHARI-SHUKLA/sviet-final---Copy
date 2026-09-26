import Image from "next/image";

import { RECRUITERS } from "@/components/programs/data";

export function ProgramRecruitersSection() {
  return (
    <section className="mx-auto mt-30 mb-15 w-full max-w-300 px-3 md:px-5">
      <p className="text-center text-sm font-semibold tracking-[0.08em] text-[#f7941d] uppercase">
        Top Recruiters
      </p>
      <h3 className="text-center mt-1 text-4xl font-extrabold">
        Companies That Hire Our Graduates
      </h3>
      <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-md md:grid-cols-4">
        {RECRUITERS.map((company) => (
          <div
            key={company.name}
            className="flex min-h-24 items-center justify-center border border-[#efefef] px-4 py-7 "
          >
            <Image
              src={company.src}
              alt={company.name}
              width={220}
              height={80}
              className="h-10 max-h-12 max-w-full object-contain filter grayscale opacity-95"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
