import Image from "next/image";

type CertificateBlockProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  ctaLabel: string;
};

export function CertificateBlock({
  imageSrc,
  imageAlt,
  title,
  description,
  ctaLabel,
}: CertificateBlockProps) {
  return (
    <article className="grid gap-8 border border-[#DCE7FF] bg-white p-6 shadow-[0_8px_24px_rgba(30,42,120,0.08)] lg:grid-cols-2 lg:items-center">
      <div className="relative aspect-4/3 overflow-hidden border border-[#BFDBFE] bg-[#EFF6FF]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          loading="lazy"
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-[#111827]">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
          {description}
        </p>
        {ctaLabel !== "null" ? (
          <button
            type="button"
            className="mt-6 inline-flex items-center rounded-md border border-[#BFDBFE] bg-white px-4 py-2 text-sm font-semibold text-[#f7941d] transition hover:border-[#60A5FA] hover:bg-[#EFF6FF]"
          >
            {ctaLabel}
          </button>
        ) : null}
      </div>
    </article>
  );
}
