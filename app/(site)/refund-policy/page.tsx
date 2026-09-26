import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy",
  description:
    "Refund and Cancellation Policy of SVIET — Swami Vivekanand Group of Institutes.",
};

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f7941d]">
        Legal
      </p>
      <h1 className="mt-3 text-4xl font-bold text-[#111827] md:text-5xl">
        Refund &amp; Cancellation Policy
      </h1>
      <p className="mt-4 text-sm text-[#6b7280]">Last updated: May 2025</p>

      <div className="prose prose-neutral mt-12 max-w-none text-[#374151]">
        <Section title="Cancellation Policy">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr className="border-b border-[#e5e7eb]">
                <td className="py-3 pr-6 font-semibold text-[#111827] align-top">
                  Cancellation Process
                </td>
                <td className="py-3 text-[#374151]">
                  For cancellations please contact us via the{" "}
                  <a href="/contact" className="text-[#f7941d] hover:underline">
                    Contact Us
                  </a>{" "}
                  link.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-6 font-semibold text-[#111827] align-top">
                  Timeframe
                </td>
                <td className="py-3 text-[#374151]">
                  Requests received later than 7 business days prior to the end
                  of the current service period will be treated as cancellation
                  of services for the next service period.
                </td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section title="Refund Policy">
          <p>
            We will try our best to create the suitable design concepts for our
            clients.
          </p>
          <p>
            In case any client is not completely satisfied with our products we
            can provide a refund.
          </p>
          <p>
            If paid by credit card, refunds will be issued to the original
            credit card provided at the time of purchase and in case of payment
            gateway payments, the refund will be made to the same account.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            If you have any questions about this policy, please contact us:
          </p>
          <address className="not-italic">
            <strong>Swami Vivekanand Group of Institutes</strong>
            <br />
            Village Ramnagar, Near Banur, Tehsil Rajpura,
            <br />
            Patiala, Punjab — 140601
            <br />
            Email:{" "}
            <a
              href="mailto:info@sviet.ac.in"
              className="text-[#f7941d] hover:underline"
            >
              info@sviet.ac.in
            </a>
            <br />
            Phone: +91-94652-33333
          </address>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-[#111827] md:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed">{children}</div>
    </section>
  );
}
