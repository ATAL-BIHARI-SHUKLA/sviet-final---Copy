import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  id?: string;
  title: string;
  description?: string;
  eyebrow?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  eyebrowClassName?: string;
};

export function SectionHeader({
  id,
  title,
  description,
  eyebrow,
  centered = false,
  className,
  titleClassName,
  descriptionClassName,
  eyebrowClassName,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.22em] text-[#f7941d]",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-3xl font-bold tracking-tight text-[#f7941d] md:text-4xl",
          eyebrow ? "mt-3" : "",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-[#6B7280]",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
