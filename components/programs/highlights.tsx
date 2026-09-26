import { Code2, Cpu, FlaskConical, Globe, Trophy, Users } from "lucide-react";

const HIGHLIGHT_ICONS = [
  Code2,
  FlaskConical,
  Globe,
  Users,
  Trophy,
  Cpu,
] as const;

export type ProgramHighlightItem = {
  title: string;
  description?: string;
};

type WhyStudySectionProps = {
  items?: ProgramHighlightItem[];
  id?: string;
  eyebrow: string;
  heading: string;
  intro?: string;
};

export function WhyStudySection({
  items,
  id,
  eyebrow,
  heading,
  intro,
}: WhyStudySectionProps) {
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
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {items.map(({ title, description }, index) => {
          const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length];

          return (
            <div
              key={title}
              className="rounded-xl border border-[#e9e9e9] bg-white px-4 py-8"
            >
              <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff4ec]">
                <Icon className="h-4 w-4 text-[#f7941d]" />
              </div>
              <p className=" text-sm font-semibold text-[#333]">{title}</p>
              {description ? (
                <p className="mt-1.5 text-sm text-[#666]">{description}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ProgramHighlightsSection({ items }: WhyStudySectionProps) {
  return (
    <WhyStudySection
      items={items}
      eyebrow="Why Choose This Program"
      heading="Program Highlights"
    />
  );
}
