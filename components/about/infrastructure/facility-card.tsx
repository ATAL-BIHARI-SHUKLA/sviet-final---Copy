import Image from "next/image";

type FacilityCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export function FacilityCard({ title, description, imageSrc, imageAlt }: FacilityCardProps) {
  return (
    <article className="group overflow-hidden border border-[#DCE7FF] bg-white shadow-[0_8px_24px_rgba(30,42,120,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(30,42,120,0.14)]">
      <div className="relative aspect-4/3 overflow-hidden bg-[#EFF6FF]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-2 px-5 py-5">
        <h3 className="text-xl font-semibold text-[#f7941d]">{title}</h3>
        <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
      </div>
    </article>
  );
}