import Image from "next/image";

type TestimonialCardProps = {
  imageSrc: string;
  imageAlt: string;
  name: string;
  subtitle: string;
  company: string;
  quote: string;
  className?: string;
};

export function TestimonialCard({
  imageSrc,
  imageAlt,
  name,
  subtitle,
  company,
  quote,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={`rounded-lg border border-gray-200 bg-white p-6 ${className ?? ""}`}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            loading="lazy"
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-base font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{subtitle}</p>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            {company}
          </p>
        </div>
      </div>

      <blockquote className="mt-5 border-l-2 border-gray-300 pl-4 text-sm leading-relaxed text-gray-700">
        “{quote}”
      </blockquote>
    </article>
  );
}
