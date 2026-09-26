import { Award, Briefcase, Building2, TrendingUp } from "lucide-react";
import Image from "next/image";

export type ProgramOutcomeItem = {
  title: string;
  description?: string;
  image?: string | null;
};

const STAT_ICONS = [TrendingUp, Award, Briefcase, Building2] as const;

type PlacementSectionProps = {
  data?: ProgramOutcomeItem[];
  id?: string;
  eyebrow: string;
  heading: string;
  intro?: string;
};

function hasRenderableImage(image?: string | null) {
  return Boolean(image && image.startsWith("/"));
}

export function PlacementSection({
  data,
  id,
  eyebrow,
  heading,
  intro,
}: PlacementSectionProps) {
  if (!data?.length) {
    return null;
  }

  return (
    <section
      id={id}
      className="mx-auto mt-30 mb-15 w-full max-w-300 px-3 md:px-5"
    >
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.08em] text-[#f7941d] uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-4xl text-white font-extrabold">{heading}</h2>
          {intro ? (
            <p className="mt-3 max-w-3xl text-sm text-[#666]">{intro}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-15 grid gap-4 md:grid-cols-4">
        {data.map(({ title, description, image }, index) => {
          const Icon = STAT_ICONS[index % STAT_ICONS.length];

          return (
            <article
              key={title}
              className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white"
            >
              {hasRenderableImage(image) ? (
                <div className="relative aspect-16/10">
                  <Image
                    src={image as string}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff4ec]">
                  <Icon className="h-5 w-5 text-[#f7941d]" />
                </div>
                <p className="text-sm text-[#666]">Career Outcome</p>
                <p className="mt-2 text-2xl font-bold leading-tight">{title}</p>
                {description ? (
                  <p className="mt-1 text-sm text-[#7a7a7a]">{description}</p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ProgramOutcomesSection({ data }: PlacementSectionProps) {
  return (
    <PlacementSection
      data={data}
      eyebrow="Placement Outcomes"
      heading="Graduate Outcomes"
    />
  );
}
