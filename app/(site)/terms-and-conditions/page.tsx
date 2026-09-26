import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions of use for SVIET — Swami Vivekanand Group of Institutes.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f7941d]">
        Legal
      </p>
      <h1 className="mt-3 text-4xl font-bold text-[#111827] md:text-5xl">
        Terms &amp; Conditions
      </h1>
      <p className="mt-4 text-sm text-[#6b7280]">
        Last updated: May 2025
      </p>

      <div className="prose prose-neutral mt-12 max-w-none text-[#374151]">
        <Section title="1. Acceptance of Terms">
          <p>
            By accessing and using the website <strong>www.sviet.ac.in</strong> (&ldquo;the
            Website&rdquo;) of Swami Vivekanand Group of Institutes (&ldquo;SVGOI&rdquo; /
            &ldquo;SVIET&rdquo; / &ldquo;the Institute&rdquo;), you agree to be bound by these
            Terms &amp; Conditions. If you do not agree with any part of these terms, please do
            not use the Website.
          </p>
        </Section>

        <Section title="2. Use of the Website">
          <p>You agree to use the Website only for lawful purposes and in a manner that does not:</p>
          <ul>
            <li>Infringe the rights of any third party.</li>
            <li>Transmit any unsolicited or unauthorised advertising material.</li>
            <li>
              Transmit any data containing viruses, malware, or any other harmful programs.
            </li>
            <li>
              Attempt to gain unauthorised access to any part of the Website or its related systems.
            </li>
          </ul>
        </Section>

        <Section title="3. Intellectual Property">
          <p>
            All content on this Website — including text, graphics, logos, images, audio clips,
            and software — is the property of SVGOI or its content suppliers and is protected under
            applicable intellectual property laws. You may not reproduce, distribute, or create
            derivative works without prior written permission from the Institute.
          </p>
        </Section>

        <Section title="4. Admission and Enrolment">
          <p>
            Information provided on this Website regarding programmes, fees, eligibility criteria,
            and admission procedures is for general guidance only. The Institute reserves the right
            to modify, cancel, or update programmes, fee structures, and admission criteria at any
            time without prior notice. Final admission is subject to fulfilment of all eligibility
            requirements and institute policies.
          </p>
        </Section>

        <Section title="5. Accuracy of Information">
          <p>
            While we strive to ensure the accuracy and completeness of information on this Website,
            SVGOI makes no warranties or representations, express or implied, as to the accuracy,
            completeness, or fitness for a particular purpose of the content. The Institute shall
            not be liable for any errors, omissions, or outcomes resulting from reliance on such
            information.
          </p>
        </Section>

        <Section title="6. Third-Party Links">
          <p>
            The Website may contain links to third-party websites for your convenience. These links
            do not signify our endorsement of those websites. We have no control over the content
            of linked sites and accept no responsibility for them or for any loss or damage that
            may arise from your use of them.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, SVGOI shall not be liable for any direct,
            indirect, incidental, consequential, or punitive damages arising from your use of, or
            inability to use, the Website or its content.
          </p>
        </Section>

        <Section title="8. Privacy">
          <p>
            Your use of the Website is also governed by our{" "}
            <a href="/privacy-policy" className="text-[#f7941d] hover:underline">
              Privacy Policy
            </a>
            , which is incorporated into these Terms &amp; Conditions by reference.
          </p>
        </Section>

        <Section title="9. Governing Law">
          <p>
            These Terms &amp; Conditions shall be governed by and construed in accordance with the
            laws of India. Any disputes arising in connection with these terms shall be subject to
            the exclusive jurisdiction of the courts in Patiala, Punjab.
          </p>
        </Section>

        <Section title="10. Changes to These Terms">
          <p>
            We reserve the right to revise these Terms &amp; Conditions at any time. Changes will
            be posted on this page with a revised date. Continued use of the Website after any
            changes constitutes your acceptance of the new terms.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            For any questions regarding these Terms &amp; Conditions, please contact:
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
