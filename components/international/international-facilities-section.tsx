import Image from "next/image";
import { Layers, Microscope, Users } from "lucide-react";

export function InternationalFacilitiesSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-[#111827] md:text-5xl">
            State-of-the-
            <span className="">Art Facilities</span>
          </h2>
          <p className="mt-3 text-xl font-medium text-[#111827] md:text-3xl">
            Empowering Your Academic and Personal Growth
          </p>
          <p className="mt-2 text-base text-[#374151] md:text-lg">
            SVGOI is committed to providing an environment conducive to learning
            and innovation.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="relative min-h-96 overflow-hidden rounded-2xl">
            <Image
              src="/assets/img/college/auditorium.png"
              alt="Language training"
              fill
              sizes="33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <Users className="h-6 w-6 text-[#fbbf24]" />
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Language and cultural training
              </h3>
              <p className="mt-2 text-sm md:text-base">
                Support for IELTS prep and pre-departure orientation programs.
              </p>
            </div>
          </article>
          <article className="relative min-h-96 overflow-hidden rounded-2xl">
            <Image
              src="/assets/img/college/lab.jpeg"
              alt="Specialized labs"
              fill
              sizes="33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <Microscope className="h-6 w-6 text-[#fbbf24]" />
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Specialized labs
              </h3>
              <p className="mt-2 text-sm md:text-base">
                Simulation labs, practice zones, and discipline-specific
                infrastructure.
              </p>
            </div>
          </article>
          <article className="relative min-h-96 overflow-hidden rounded-2xl">
            <Image
              src="/assets/img/library.jpeg"
              alt="Digital libraries"
              fill
              sizes="33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <Layers className="h-6 w-6 text-[#fbbf24]" />
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Digital libraries
              </h3>
              <p className="mt-2 text-sm md:text-base">
                Access to books, journals, and e-resources through integrated
                services.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
