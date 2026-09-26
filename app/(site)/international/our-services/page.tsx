import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  CalendarDays,
  Globe,
  House,
  IdCard,
  Users,
} from "lucide-react";

export default function OurServicesPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#111827]">
      {/* Page Header */}
      <section className="-mt-30 w-full pt-30">
        <div className="bg-black px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-4 flex items-center gap-2 text-xs text-white/50">
              <Link href="/international" className="transition hover:text-white">
                International
              </Link>
              <span>/</span>
              <span className="text-white">Our Services</span>
            </nav>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
              International Office
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-white md:text-5xl">
              Supporting you throughout
              <br />
              your educational journey in India
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              How the Office of International Affairs helps every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* 1 — Study in India Portal */}
      <section className="border-b border-black/10 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
                Service 01
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Globe className="h-6 w-6 text-[#f7941d]" />
                <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
                  Study in India Portal
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                Our dedicated Study in India portal streamlines your entire
                application journey — from course selection and document
                submission to admission confirmation. Access real-time
                application status, download offer letters, and connect with
                our admissions counsellors through a single, secure platform.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#374151]">
                {[
                  "Online application & document upload",
                  "Real-time application tracking",
                  "Direct counsellor chat support",
                  "Scholarship eligibility checker",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#f7941d]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-96 overflow-hidden border border-black/10">
              <Image
                src="/assets/img/inter/02%20Services/01%20STUDY%20IN%20INDIA%20PORTAL/image.webp"
                alt="Study in India Portal"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Hostel & Residence */}
      <section className="border-b border-black/10 bg-[#f6f6f6] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-3">
                {[
                  "/assets/img/inter/02%20Services/02%20Hostel%20%26%20Residence/DSC09186.JPG",
                  "/assets/img/inter/02%20Services/02%20Hostel%20%26%20Residence/DSC09192.JPG",
                  "/assets/img/inter/02%20Services/02%20Hostel%20%26%20Residence/DSC09227.JPG",
                  "/assets/img/inter/02%20Services/02%20Hostel%20%26%20Residence/DSC09272.JPG",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative min-h-36 overflow-hidden border border-black/10"
                  >
                    <Image
                      src={src}
                      alt={`Hostel room ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
                Service 02
              </p>
              <div className="mt-3 flex items-center gap-3">
                <House className="h-6 w-6 text-[#f7941d]" />
                <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
                  Hostel & Residence
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                Safe, comfortable, and fully furnished accommodation on campus
                ensures international students feel at home from day one. Our
                hostels are equipped with modern amenities, 24/7 security,
                high-speed internet, and dedicated mess facilities offering
                diverse cuisines.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#374151]">
                {[
                  "Separate hostels for boys & girls",
                  "24/7 security & CCTV surveillance",
                  "Multi-cuisine mess & cafeteria",
                  "Wi-Fi & laundry facilities",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#f7941d]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — FRRO Registration */}
      <section className="border-b border-black/10 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
                Service 03
              </p>
              <div className="mt-3 flex items-center gap-3">
                <IdCard className="h-6 w-6 text-[#f7941d]" />
                <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
                  FRRO Registration
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                Navigating India's foreigner registration requirements is
                seamless with our dedicated support team. We guide every
                international student through the FRRO (Foreigners Regional
                Registration Office) process, document preparation, and
                annual renewals — so you can focus on your studies rather
                than paperwork.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#374151]">
                {[
                  "Step-by-step registration guidance",
                  "Document checklist & verification",
                  "Appointment scheduling support",
                  "Annual renewal reminders",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#f7941d]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-96 overflow-hidden border border-black/10">
              <Image
                src="/assets/img/inter/02%20Services/03%20FRRO%20Registration/ChatGPT%20Image%20Jun%206,%202026,%2012_28_23%20PM.png"
                alt="FRRO Registration assistance"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Cultural Events & Activities */}
      <section className="border-b border-black/10 bg-[#f6f6f6] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
            Service 04
          </p>
          <div className="mt-3 flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-[#f7941d]" />
            <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
              Cultural Events & Activities
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#374151]">
            SVGOI celebrates the diversity of its international community
            through a rich calendar of cultural events — from Christmas
            celebrations and international football tournaments to Zimbabwe
            Independence Day and multicultural festivals. These events build
            bonds, foster understanding, and make every student feel
            represented.
          </p>

          {/* Gallery grid — Christmas */}
          <div className="mt-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]">
              Christmas Celebrations
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/Christmas/IMG_2625.JPG",
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/Christmas/WhatsApp%20Image%202026-06-06%20at%202.14.20%20PM.jpeg",
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/Christmas/WhatsApp%20Image%202026-06-06%20at%202.14.22%20PM.jpeg",
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/Christmas/WhatsApp%20Image%202026-06-06%20at%202.14.23%20PM.jpeg",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative min-h-56 overflow-hidden border border-black/10"
                >
                  <Image
                    src={src}
                    alt={`Christmas celebration ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Football */}
          <div className="mt-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]">
              Football Tournament
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/Football/IMG_8058.JPG",
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/Football/IMG_8271.JPG",
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/Football/IMG_8463.JPG",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative min-h-56 overflow-hidden border border-black/10"
                >
                  <Image
                    src={src}
                    alt={`Football tournament ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ZIM Independence Day */}
          <div className="mt-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]">
              Zimbabwe Independence Day
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/ZIM%20Independence%20day/IMG_0829.JPG",
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/ZIM%20Independence%20day/IMG_0871.JPG",
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/ZIM%20Independence%20day/IMG_0874.JPG",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative min-h-56 overflow-hidden border border-black/10"
                >
                  <Image
                    src={src}
                    alt={`Zimbabwe Independence Day ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Multi-cultural events */}
          <div className="mt-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]">
              Multicultural Events
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/New%20folder/IMG_8134.JPG",
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/New%20folder/IMG_8178.JPG",
                "/assets/img/inter/02%20Services/04%20Cultural%20Events%20%26%20Activities/New%20folder/IMG_8182.JPG",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative min-h-56 overflow-hidden border border-black/10"
                >
                  <Image
                    src={src}
                    alt={`Multicultural event ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Travel Assistance */}
      <section className="border-b border-black/10 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
                Service 05
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-[#f7941d]" />
                <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
                  Travel Assistance
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                From your first arrival at the airport to every journey home
                during breaks, our travel assistance service ensures you are
                never stranded. We coordinate airport pickups, local transport,
                railway bookings, and group travel for cultural excursions.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#374151]">
                {[
                  "Airport pickup & drop coordination",
                  "Local transport guidance",
                  "Group travel for cultural excursions",
                  "Emergency travel support 24/7",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#f7941d]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: "✈",
                  title: "Airport Transfers",
                  desc: "Pickups and drop-offs coordinated for every arrival and departure.",
                },
                {
                  icon: "🚌",
                  title: "Local Transport",
                  desc: "Guidance on buses, auto-rickshaws, and cab services around campus.",
                },
                {
                  icon: "🚂",
                  title: "Railway Bookings",
                  desc: "Assistance booking train travel during semester breaks and excursions.",
                },
                {
                  icon: "📞",
                  title: "24/7 Emergency Support",
                  desc: "Round-the-clock helpline for any travel emergency or urgent situation.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="border border-black/10 bg-white p-5"
                >
                  <div className="mb-3 text-2xl">{card.icon}</div>
                  <p className="font-semibold text-[#111827]">{card.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#6b7280]">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Students Welfare */}
      <section className="border-b border-black/10 bg-[#f6f6f6] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative min-h-96 overflow-hidden border border-black/10">
              <Image
                src="/assets/img/inter/02%20Services/06%20Students%20Welfare/0.png"
                alt="Students Welfare support"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
                Service 06
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Users className="h-6 w-6 text-[#f7941d]" />
                <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
                  Students Welfare
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                Your wellbeing is our priority. Our dedicated welfare team
                provides personal counselling, health support referrals,
                grievance resolution, and peer mentoring to ensure every
                international student thrives academically and personally.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#374151]">
                {[
                  "Personal & mental health counselling",
                  "Health support & medical referrals",
                  "Grievance redressal system",
                  "International peer mentor programme",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#f7941d]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Academic Support */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
                Service 07
              </p>
              <div className="mt-3 flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-[#f7941d]" />
                <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
                  Academic Support & Assistance
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                Dedicated academic support ensures international students
                overcome language barriers, adapt to the Indian curriculum,
                and excel in their studies. From remedial classes and
                tutoring to research guidance and library access, our academic
                assistance team is always available.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#374151]">
                {[
                  "Remedial & bridge classes",
                  "One-on-one faculty mentoring",
                  "Research & dissertation guidance",
                  "Language support for non-English speakers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#f7941d]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-96 overflow-hidden border border-black/10">
              <Image
                src="/assets/img/inter/02%20Services/07%20Academic%20Support%20%26%20Assistance/IMG_2311.JPG"
                alt="Academic support and assistance"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to experience these services?
          </h2>
          <p className="mt-3 text-base text-white/75">
            Apply now and let our team guide you through every step.
          </p>
          <Link
            href="/admissions"
            className="mt-6 inline-flex items-center bg-[#f7941d] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#d97706]"
          >
            Apply for Admission
          </Link>
        </div>
      </section>
    </main>
  );
}
