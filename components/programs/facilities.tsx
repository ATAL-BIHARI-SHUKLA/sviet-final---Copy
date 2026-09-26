import { BookOpen, Coffee, FlaskConical, Monitor, Wifi } from "lucide-react";
import Image from "next/image";

const FACILITY_ICONS = [Monitor, BookOpen, Monitor, FlaskConical] as const;

export type ProgramFacilityItem = {
  title: string;
  description?: string;
  image?: string | null;
};

type FacilitiesSectionProps = {
  items?: ProgramFacilityItem[];
  id?: string;
  eyebrow: string;
  heading: string;
  intro?: string;
};

function hasRenderableImage(image?: string | null) {
  return Boolean(image && image.startsWith("/"));
}

export function FacilitiesSection({
  items,
  id,
  eyebrow,
  heading,
  intro,
}: FacilitiesSectionProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <section
      id={id}
      className="mx-auto mt-30 mb-15 w-full max-w-300 px-3 md:px-5"
    >
      <p className="text-sm font-semibold tracking-[0.08em] text-[#f7941d] uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-4xl font-extrabold">{heading}</h2>
      {intro ? (
        <p className="mt-3 max-w-3xl text-sm text-[#666]">{intro}</p>
      ) : null}
      <div className="mt-12 grid gap-4 md:grid-cols-4">
        {items.map(({ title, description, image }, index) => {
          const Icon = FACILITY_ICONS[index % FACILITY_ICONS.length];

          return (
            <article
              key={title}
              className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white"
            >
              {hasRenderableImage(image) ? (
                <Image
                  src={image as string}
                  alt={title}
                  width={1000}
                  height={520}
                  className="h-32.5 w-full object-cover"
                />
              ) : null}
              <div className="px-3 py-6">
                <div className="mb-1.5 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#f7941d]" />
                  <p className="text-sm font-semibold">{title}</p>
                </div>
                {description ? (
                  <p className="text-sm text-[#666]">{description}</p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ProgramFacilitiesSection({ items }: FacilitiesSectionProps) {
  return (
    <FacilitiesSection
      items={items}
      eyebrow="Infrastructure"
      heading="Campus Facilities"
    />
  );
}
