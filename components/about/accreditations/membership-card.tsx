import Image from "next/image";

type MembershipCardProps = {
  
  logoSrc: string;
  logoAlt: string;
};

export function MembershipCard({

  logoSrc,
  logoAlt,
}: MembershipCardProps) {
  const hasLogo = Boolean(logoSrc?.trim());
  const isExternalLogo = /^https?:\/\//.test(logoSrc);

  return (
    <article className="">
      {hasLogo ? (
        <div className="relative h-32 w-46">
          <Image
            src={logoSrc}
            alt={logoAlt}
            fill
            unoptimized={isExternalLogo}
            loading="lazy"
            className="object-contain object-center"
            sizes="444px"
          />
        </div>
      ) : null}
    </article>
  );
}
