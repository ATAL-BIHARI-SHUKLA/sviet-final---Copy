import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy of SVIET — Swami Vivekanand Group of Institutes.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f7941d]">
        Legal
      </p>
      <h1 className="mt-3 text-4xl font-bold text-[#111827] md:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-[#6b7280]">
        Last updated: May 2025
      </p>

      <div className="prose prose-neutral mt-12 max-w-none text-[#374151]">
        <Section title="1. Introduction">
          <p>
            Swami Vivekanand Group of Institutes (SVGOI / SVIET), hereinafter referred to as
            &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;the Institute&rdquo;, is committed to
            protecting the privacy of all visitors to our website{" "}
            <strong>www.sviet.ac.in</strong> and of all students, parents, and other individuals
            who interact with us. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We may collect the following categories of information:</p>
          <ul>
            <li>
              <strong>Personal identification information</strong> — name, email address, phone
              number, date of birth, address, submitted through enquiry or admission forms.
            </li>
            <li>
              <strong>Academic information</strong> — marks, qualifications, and documents you
              provide during the admission process.
            </li>
            <li>
              <strong>Usage data</strong> — IP address, browser type, pages visited, and time
              spent on our website, collected automatically via cookies and analytics tools.
            </li>
            <li>
              <strong>Communications</strong> — messages you send us via contact forms, email, or
              WhatsApp.
            </li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process admission enquiries and applications.</li>
            <li>Send you updates about admissions, events, and programmes.</li>
            <li>Improve our website and services.</li>
            <li>Comply with legal and regulatory obligations.</li>
            <li>Respond to your queries and provide support.</li>
          </ul>
          <p>
            We do not sell, trade, or rent your personal information to third parties for marketing
            purposes.
          </p>
        </Section>

        <Section title="4. Cookies">
          <p>
            Our website uses cookies to enhance your browsing experience, analyse website traffic,
            and personalise content. You can instruct your browser to refuse all cookies or to
            indicate when a cookie is being sent. However, if you do not accept cookies, some parts
            of our website may not function properly.
          </p>
        </Section>

        <Section title="5. Third-Party Services">
          <p>
            We use third-party services including Google Analytics and NoPaperForms for enquiry
            management and chatbot functionality. These services operate under their own privacy
            policies. We recommend reviewing their respective policies.
          </p>
        </Section>

        <Section title="6. Data Security">
          <p>
            We implement appropriate technical and organisational measures to protect your personal
            information against unauthorised access, alteration, disclosure, or destruction. However,
            no method of transmission over the Internet is 100% secure and we cannot guarantee
            absolute security.
          </p>
        </Section>

        <Section title="7. Data Retention">
          <p>
            We retain personal information for as long as necessary to fulfil the purposes described
            in this policy, or as required by law. Admission-related records are retained for the
            duration prescribed by the relevant university and regulatory bodies.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your data, subject to legal obligations.</li>
            <li>Withdraw consent for marketing communications at any time.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:info@sviet.ac.in" className="text-[#f7941d] hover:underline">
              info@sviet.ac.in
            </a>
            .
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new policy on this page with a revised date. We encourage you to review
            this page periodically.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <address className="not-italic">
            <strong>Swami Vivekanand Group of Institutes</strong>
            <br />
            Village Ramnagar, Near Banur, Tehsil Rajpura,
            <br />
            Patiala, Punjab — 140601
            <br />
            Email:{" "}
            <a href="mailto:info@sviet.ac.in" className="text-[#f7941d] hover:underline">
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
