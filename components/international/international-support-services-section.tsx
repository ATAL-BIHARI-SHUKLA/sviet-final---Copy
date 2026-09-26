import Image from "next/image";
import { Briefcase, CalendarDays, House, IdCard, Users } from "lucide-react";

export function InternationalSupportServicesSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-3xl font-semibold leading-tight text-[#111827] md:text-5xl">
          <span className="">Supporting you throughout</span> your
          <br />
          educational journey in India
        </h2>
        <p className="mt-4 text-base text-[#374151] md:text-lg">
          How Office of International Affairs helps.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <article className="relative min-h-72 overflow-hidden rounded-2xl">
              <Image
                src="/assets/img/section_card/Hostels.jpeg"
                alt="Hostel and residence"
                fill
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent" />
              <p className="absolute bottom-4 left-4 text-xl font-semibold text-white md:text-2xl">
                Hostel & Residence
              </p>
            </article>
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="min-h-42 rounded-2xl bg-[#f7941d] p-5 text-white">
                <Briefcase className="h-6 w-6" />
                <p className="mt-12 text-xl font-semibold">Travel Assistance</p>
              </article>
              <article className="min-h-42 rounded-2xl bg-[#0f766e] p-5 text-white">
                <Users className="h-6 w-6" />
                <p className="mt-12 text-xl font-semibold">Students Welfare</p>
              </article>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl bg-[#2563EB] p-5 text-white">
                <IdCard className="h-6 w-6" />
                <p className="mt-12 text-xl font-semibold">FRRO Registration</p>
              </article>
              <article className="rounded-2xl bg-[#dc2626] p-5 text-white">
                <CalendarDays className="h-6 w-6" />
                <p className="mt-12 text-xl font-semibold">
                  Cultural Events & Activities
                </p>
              </article>
            </div>
            <article className="relative min-h-72 overflow-hidden rounded-2xl">
              <Image
                src="/assets/img/section_card/AcademicSupportInternational.jpeg"
                alt="Academic support"
                fill
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent" />
              <House className="absolute left-4 top-4 h-6 w-6 text-white" />
              <p className="absolute bottom-4 left-4 text-xl font-semibold leading-tight text-white md:text-2xl">
                Academic Support & Assistance
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
