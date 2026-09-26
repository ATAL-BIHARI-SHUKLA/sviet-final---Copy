import Image from "next/image";

type LogoCardProps = {
  name: string;
  logoSrc: string;
  logoAlt: string;
};

export function LogoCard({ name, logoSrc, logoAlt }: LogoCardProps) {
  return (
    <article className="group rounded-lg border border-gray-200 bg-white p-5">
      <div className="relative h-12 w-full">
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 50vw, 220px"
          className="object-contain grayscale transition group-hover:grayscale-0"
        />
      </div>
      <p className="mt-4 text-sm font-semibold text-gray-700">{name}</p>
    </article>
  );
}
