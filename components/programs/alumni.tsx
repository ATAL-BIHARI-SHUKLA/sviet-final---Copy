import Image from "next/image";
import { Quote } from "lucide-react";

import { ALUMNI_LIST } from "@/components/programs/data";

export function ProgramAlumniSection() {
  return (
    <section className="mx-auto mt-30 mb-15 w-full max-w-300 px-3 md:px-5">
      <p className="text-sm font-semibold tracking-[0.08em] text-[#f7941d] uppercase">
        Student Success
      </p>
      <h2 className="mt-2 text-4xl font-extrabold">Stories From Our Alumni</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-8 grid gap-3">
          <Quote className="h-6 w-6 text-[#f7941d]/30" />
          <p className="text-[#4d4d4d]">
            &quot;SVGOI gave me practical exposure and confidence to solve real
            problems. The placement training and support were exceptional.&quot;
          </p>
          <p className="mt-4 text-xl font-bold">Arjun Sharma</p>
          <p className="text-sm text-[#777]">
            B.Tech CSE &apos;22 • Software Engineer at Infosys
          </p>
          <div className="mt-5 flex items-center gap-2 border-t border-[#eaeaea] pt-4">
            <button className="h-8 w-8 rounded-full border border-[#eaeaea] text-[#666]">
              ‹
            </button>
            <button className="h-8 w-8 rounded-full border border-[#eaeaea] text-[#666]">
              ›
            </button>
            <div className="ml-2 flex gap-1.5">
              <span className="h-2 w-5 rounded-full bg-[#f7941d]" />
              <span className="h-2 w-2 rounded-full bg-[#eaeaea]" />
              <span className="h-2 w-2 rounded-full bg-[#eaeaea]" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {ALUMNI_LIST.map((alumni, index) => (
            <div
              key={alumni.name}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 ${index === 0 ? "border border-[#f1a866] bg-[#fff4ec]" : "border border-[#e9e9e9] bg-white"}`}
            >
              <Image
                src={`https://images.unsplash.com/photo-${index === 0 ? "1727875075949-8b36efd25260" : index === 1 ? "1620829813573-7c9e1877706f" : "1736066330610-c102cab4e942"}?auto=format&fit=crop&w=120&q=80`}
                alt={alumni.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{alumni.name}</p>
                <p className="text-sm text-[#666]">
                  {alumni.company} • {alumni.package}
                </p>
              </div>
            </div>
          ))}
          <div className="rounded-lg bg-[#fff3e7] p-3 text-sm text-[#8d5522]">
            94% of students rated this program highly.
          </div>
        </div>
      </div>
    </section>
  );
}
