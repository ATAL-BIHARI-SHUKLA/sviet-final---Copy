import Image from "next/image";

type NewsCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

export function NewsCard({
  imageSrc,
  imageAlt,
  title,
  description,
}: NewsCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="relative aspect-4/3 bg-gray-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-gray-800 transition hover:text-[#a60f2d]"
        >
          Read More
        </button>
      </div>
    </article>
  );
}
