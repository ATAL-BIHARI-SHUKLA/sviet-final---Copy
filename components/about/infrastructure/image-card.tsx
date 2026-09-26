import Image from "next/image";

type ImageCardProps = {
  title: string;
  summary?: string;
  imageSrc: string;
  imageAlt: string;
  onClick?: () => void;
  isActive?: boolean;
};

export function ImageCard({
  title,
  summary,
  imageSrc,
  imageAlt,
  onClick,
  isActive = false,
}: ImageCardProps) {
  return (
    <article
      className={`group overflow-hidden border bg-white shadow-[0_8px_24px_rgba(30,42,120,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(30,42,120,0.14)] ${
        isActive ? "border-[#60A5FA] ring-2 ring-[#BFDBFE]" : "border-[#DCE7FF]"
      }`}
    >
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
      <div className="px-4 py-4">
        <h3 className="text-lg font-semibold text-[#f7941d]">{title}</h3>
        {summary ? (
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            {summary}
          </p>
        ) : null}
        {onClick ? (
          <button
            type="button"
            onClick={onClick}
            className="mt-4 inline-flex items-center rounded-md border border-[#BFDBFE] bg-white px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#111827] transition hover:bg-[#EFF6FF]"
          >
            View Details
          </button>
        ) : null}
      </div>
    </article>
  );
}
