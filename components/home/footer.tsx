import Link from "next/link";

const quickLinks = [
  "Admissions",
  "Scholarships",
  "Placements",
  "Campus Life",
  "Events",
];
const navLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Admissions", href: "/admissions" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function HomeFooter() {
  return (
    <footer className="bg-black px-4 py-10 text-white md:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <section>
            <p className="text-3xl font-bold">SVGOI</p>
            <p className="mt-4 text-sm font-medium leading-relaxed text-white/75">
              Swami Vivekanand Group of Institutes, Village Pamaur, Rajpura,
              Patiala, Punjab.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="mt-4 grid gap-3">
              {quickLinks.map((item) => (
                <li key={item} className="text-sm font-medium text-white/80">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold">Enquire Now</h3>
            <p className="mt-4 text-sm text-white/75 leading-relaxed">
              For admissions, programme details, or any queries, reach us
              directly.
            </p>
            <div className="mt-5 grid gap-3">
              <a
                href="https://admission.sviet.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-4 py-2 text-sm font-bold transition duration-200 hover:scale-105"
              >
                Apply Online ↗
              </a>
              <a
                href="tel:+919465233333"
                className="text-sm font-medium text-white/80 hover:text-white"
              >
                📞 +91 94652 33333
              </a>
              <a
                href="tel:18001201200"
                className="text-sm font-medium text-white/80 hover:text-white"
              >
                📞 Toll Free: 1800-120-1200
              </a>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold">Navigation</h3>
            <ul className="mt-4 grid gap-3">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6">
          <div className="mb-4 flex flex-wrap gap-4 text-xs text-white/50">
            <Link href="/svgoi-in-town" className="hover:text-white/80">
              SVGOI In Your Town
            </Link>
            <Link href="/privacy-policy" className="hover:text-white/80">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white/80">
              Terms &amp; Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-white/80">
              Refund &amp; Cancellation Policy
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full bg-white/10 px-3 py-2 text-sm font-bold"
            >
              FB
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full bg-white/10 px-3 py-2 text-sm font-bold"
            >
              IG
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="rounded-full bg-white/10 px-3 py-2 text-sm font-bold"
            >
              IN
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="rounded-full bg-white/10 px-3 py-2 text-sm font-bold"
            >
              YT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
