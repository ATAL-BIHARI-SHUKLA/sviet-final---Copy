import Image from "next/image";

type LogoCardProps = {
  title: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
};

export function LogoCard({
  title,
  description,
  logoSrc,
  logoAlt,
}: LogoCardProps) {
  const hasLogo = Boolean(logoSrc?.trim());
  const isExternalLogo = /^https?:\/\//.test(logoSrc);

  return (
    <article className="border border-[#DCE7FF] bg-white p-6 shadow-[0_8px_24px_rgba(30,42,120,0.08)]">
      {hasLogo ? (
        <div className="relative h-12 w-32">
          <Image
            src={logoSrc}
            alt={logoAlt}
            fill
            unoptimized={isExternalLogo}
            loading="lazy"
            className="object-contain object-left"
            sizes="128px"
          />
        </div>
      ) : null}

      <h3
        className={`text-lg font-semibold text-[#111827] ${hasLogo ? "mt-4" : "mt-0"}`}
      >
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
        {description}
      </p>
    </article>
  );
}
