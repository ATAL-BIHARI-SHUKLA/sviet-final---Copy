import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const CONTACT_PHONE = "+91 88474 88524";
const CONTACT_PHONE_HREF = "tel:+918847488524";
const CONTACT_EMAILS = ["dia@sviet.ac.in", "sunilsoni19@gmail.com"];

export function InternationalAdmissionsHelpSection() {
  return (
    <section className="bg-[#FFFFFF] py-12 md:py-16">
      <div className="mx-auto max-w-7xl rounded-2xl bg-[#f9fafb] px-6 py-8 md:px-10 md:py-10">
        <h2 className="text-3xl font-semibold text-[#111827] md:text-5xl">
          Need help with
          <br />
          <span className="">International Admissions?</span>
        </h2>
        <p className="mt-4 max-w-3xl text-base text-[#374151] md:text-lg">
          Our admissions team guides you through eligibility, documentation,
          visa support, and onboarding.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-lg bg-[#f7941d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d97706]"
          >
            Talk to us
          </Link>
          <Link
            href="/admissions"
            className="rounded-lg border border-[#2563EB] px-6 py-3 text-sm font-semibold text-[#2563EB] transition hover:bg-[#2563EB] hover:text-white"
          >
            Start application
          </Link>
        </div>

        {/* Director of International Affairs — contact details */}
        <div className="mt-8 border-t border-[#e5e7eb] pt-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f7941d]">
            International Affairs Office
          </p>
          <p className="mt-2 text-lg font-semibold text-[#111827]">
            Mr. Sunil Kumar Soni
          </p>
          <p className="text-sm text-[#6b7280]">Director – International Affairs</p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
            <a
              href={CONTACT_PHONE_HREF}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#374151] transition hover:text-[#f7941d]"
            >
              <Phone className="h-4 w-4 text-[#f7941d]" aria-hidden="true" />
              {CONTACT_PHONE}
            </a>
            {CONTACT_EMAILS.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#374151] transition hover:text-[#f7941d]"
              >
                <Mail className="h-4 w-4 text-[#f7941d]" aria-hidden="true" />
                {email}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
