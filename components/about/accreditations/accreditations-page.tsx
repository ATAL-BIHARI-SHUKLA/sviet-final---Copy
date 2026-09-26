import Image from "next/image";

import { AccreditationCard } from "@/components/about/accreditations/accreditation-card";
import { ApprovalGrid } from "@/components/about/accreditations/approval-grid";
import { CertificateBlock } from "@/components/about/accreditations/certificate-block";
import { MembershipCard } from "@/components/about/accreditations/membership-card";
import { SectionHeader } from "@/components/about/accreditations/section-header";
import { SectionWrapper } from "@/components/about/accreditations/section-wrapper";

const ACCREDITATIONS = [
  {
    title: "NAAC Accreditation",
    description:
      "Recognized with NAAC B++ Grade (2.94 Score, 2024), reflecting institutional focus on quality learning and continuous improvement.",
    logoSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790442925/sviet_assets/NAAC-Logo.jpg",
    logoAlt: "NAAC accreditation logo",
  },
  {
    title: "Program Quality Assurance",
    description:
      "Program delivery is aligned with applicable national quality frameworks and outcome-based academic practices.",
    logoSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790442916/sviet_assets/vl.jpg",
    logoAlt: "Program quality assurance logo",
  },
  {
    title: "UGC Recognition",
    description:
      "Institutional operations and academic standards are maintained in line with relevant UGC norms and expectations.",
    logoSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790442916/sviet_assets/UGC_India_Logo.png",
    logoAlt: "UGC approval logo",
  },
];

const OTHER_APPROVALS = [
  {
    title: "AICTE Approved",
    description:
      "Technical and professional programs are structured in accordance with applicable regulatory expectations.",
    logoSrc:
      "https://images.financialexpressdigital.com/2022/03/1600x960_1015320-aicte-1.jpg",
    logoAlt: "AICTE alignment logo",
  },
  {
    title: "PCI Recognition",
    description:
      "Pharmacy programs follow standards prescribed for curriculum quality, training, and compliance.",
    logoSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443533/sviet_assets/ap_logs/pci.png",
    logoAlt: "PCI approval logo",
  },
  {
    title: "NCTE Recognition",
    description:
      "Teacher education pathways are maintained with required academic and regulatory safeguards.",
    logoSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790442925/sviet_assets/NCTE.jpg",
    logoAlt: "NCTE approval logo",
  },
  {
    title: "Bar Council Framework",
    description:
      "Legal education offerings are aligned to professional standards for law and applied legal studies.",
    logoSrc:
      "https://www.barcouncilofindia.org/d4a265c3a0597b581f64e74c22b87d2f.svg",
    logoAlt: "Bar Council of India logo",
  },
  // {
  //   title: "State-Level Recognition",
  //   description:
  //     "Institutional operations continue under valid state-level recognition and compliance mechanisms.",
  //   logoSrc: "",
  //   logoAlt: "State government recognition logo",
  // },
];

const MEMBERSHIPS = [
  {
    logoSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443535/sviet_assets/affliation/IKGPTU.webp",
    logoAlt: "IKGPTU affiliation logo",
  },
  {
    logoSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443535/sviet_assets/affliation/MRSPTU.webp",
    logoAlt: "MRSPTU affiliation logo",
  },
  {
    logoSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443535/sviet_assets/affliation/NCVT.webp",
    logoAlt: "NCVT affiliation logo",
  },
  {
    logoSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443535/sviet_assets/affliation/PSBTE.png",
    logoAlt: "PSBTE affiliation logo",
  },
  {
    logoSrc: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443534/sviet_assets/affliation/Punjabi_University.avif",
    logoAlt: "Punjabi University affiliation logo",
  },
];

const AP_LOGO_MARQUEE = [
  { src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790442916/sviet_assets/UGC_India_Logo.png", alt: "UGC logo" },
  { src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443533/sviet_assets/ap_logs/NAAC.png", alt: "NAAC logo" },
  { src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443533/sviet_assets/ap_logs/pci.png", alt: "Pharmacy Council of India logo" },
  { src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443534/sviet_assets/ap_logs/bci.png", alt: "Bar Council of India logo" },
  { src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443544/sviet_assets/accred/aicte.jpg", alt: "AICTE logo" },
  { src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443544/sviet_assets/accred/ncte.jpg", alt: "NCTE logo" },
  { src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443533/sviet_assets/ap_logs/iste.jpg", alt: "ISTE logo" },
  { src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790442916/sviet_assets/vl.jpg", alt: "virtual labs logo" },
  { src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443534/sviet_assets/ap_logs/1.png", alt: "Approval logo one" },
  { src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443534/sviet_assets/ap_logs/4.png", alt: "Approval logo four" },
  { src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443534/sviet_assets/ap_logs/8.png", alt: "Approval logo eight" },
] as const;

export function AccreditationsPage() {
  const marqueeLogos = [...AP_LOGO_MARQUEE, ...AP_LOGO_MARQUEE];

  return (
    <main className="bg-white">
      <SectionWrapper
        aria-labelledby="accreditations-heading"
        className="relative overflow-hidden border-b border-[#E5E7EB] bg-white"
      >
        <div className=" mb-7 max-w-4xl text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.28em]  md:text-sm">
            About SVGOI
          </p>
          <h1
            id="accreditations-heading"
            className="mt-3 text-3xl font-black tracking-tight md:text-5xl"
          >
            Accreditations <span className="">&amp; Approvals</span>
          </h1>
          <p className=" mt-3 max-w-3xl text-sm leading-relaxed text-[#475569] md:text-base">
            Recognitions that reflect SVGOI&apos;s quality-first academic
            systems, regulatory compliance, and sustained excellence.
          </p>
        </div>
        <div
          className="corporate-marquee-shell mx-auto w-full max-w-7xl bg-transparent py-2"
          aria-label="Accreditation and approval logos"
        >
          <div className="corporate-marquee overflow-hidden">
            <div className="corporate-marquee-track items-center gap-6 md:gap-8">
              {marqueeLogos.map((logo, index) => (
                <div
                  key={`${logo.src}-${index}`}
                  className="relative h-14 w-28 flex-none md:h-36 md:w-46"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 112px, 144px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper aria-labelledby="accreditation-status-heading">
        <article className="grid gap-8 border border-[#DCE7FF] bg-white p-8 shadow-[0_10px_28px_rgba(30,42,120,0.08)] lg:grid-cols-[1.7fr_1fr] lg:items-center">
          <div>
            <h2
              id="accreditation-status-heading"
              className="text-3xl font-bold text-[#111827]"
            >
              SVGOI Accreditation Status
            </h2>
            <p className="mt-4 text-lg font-semibold text-[#111827]">
              NAAC Accredited
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
              The accreditation reflects sustained institutional commitment to
              teaching quality, student development, and improvement-driven
              governance.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-[#4B5563]">
              <li>Structured quality assurance and review mechanisms</li>
              <li>Academic delivery aligned with regulatory expectations</li>
              <li>Continuous improvement across departments and services</li>
            </ul>
          </div>

          <div className="flex items-center justify-start lg:justify-end">
            <div className="relative h-24 w-60">
              <Image
                src="https://res.cloudinary.com/qbxjwpwp/image/upload/v1790442925/sviet_assets/NAAC-Logo.jpg"
                alt="SVGOI accreditation logo"
                fill
                unoptimized
                loading="lazy"
                className="object-contain"
                sizes="240px"
              />
            </div>
          </div>
        </article>
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="key-accreditations-heading"
        className="border-t border-[#E5E7EB]"
      >
        <SectionHeader
          id="key-accreditations-heading"
          title="Key Accreditations"
        />

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ACCREDITATIONS.map((item) => (
            <AccreditationCard
              key={item.title}
              title={item.title}
              description={item.description}
              logoSrc={item.logoSrc}
              logoAlt={item.logoAlt}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="ugc-certificate-heading"
        className="bg-[#F5F7FB]"
      >
        <SectionHeader
          id="ugc-certificate-heading"
          title="Certificate / Document"
        />
        <div className="mt-8">
          <CertificateBlock
            imageSrc="https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443544/sviet_assets/accred/ugc.jpg"
            imageAlt="University Grants Commission certificate preview"
            title="University Grants Commission (UGC)"
            description="SVGOI continues to operate in alignment with applicable UGC norms and quality expectations for higher education institutions. Official communications and notifications are maintained for transparency and reference."
            ctaLabel="null"
          />
        </div>
      </SectionWrapper>

      <SectionWrapper
        aria-labelledby="other-approvals-heading"
        className="bg-[#F5F7FB]"
      >
        <SectionHeader
          id="other-approvals-heading"
          title="Regulatory & Professional Approvals"
          description="Additional recognitions and approvals that strengthen trust, compliance, and discipline-specific standards."
        />

        <ApprovalGrid items={OTHER_APPROVALS} />
      </SectionWrapper>

      {/* <SectionWrapper
        aria-labelledby="important-notice-heading"
        className="border-t border-[#E5E7EB]"
      >
        <article className="border border-[#BFDBFE] bg-[#EFF6FF] p-6">
          <h2
            id="important-notice-heading"
            className="text-2xl font-bold text-[#111827]"
          >
            Important Notice
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
            AICTE approval is not required for universities as per Supreme Court
            judgment and subsequent regulatory clarifications. Stakeholders are
            advised to review the official document for complete context.
          </p>
          <button
            type="button"
            className="mt-5 inline-flex items-center rounded-md border border-[#93C5FD] bg-white px-4 py-2 text-sm font-semibold text-[#f7941d] transition hover:border-[#60A5FA] hover:bg-[#DBEAFE]"
          >
            View Copy of Judgment
          </button>
        </article>
      </SectionWrapper> */}

      <SectionWrapper
        aria-labelledby="memberships-heading"
        className="bg-[#F8FAFF]"
      >
        <SectionHeader
          id="memberships-heading"
          title="Institutional Affiliations"
        />

        <div className="mt-18 flex flex-wrap items-center justify-center gap-6">
          {MEMBERSHIPS.map((item) => (
            <MembershipCard
              key={item.logoSrc}
              logoSrc={item.logoSrc}
              logoAlt={item.logoAlt}
            />
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}
