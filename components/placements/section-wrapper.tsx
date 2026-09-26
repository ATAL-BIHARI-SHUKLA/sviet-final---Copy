import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionWrapperProps = ComponentPropsWithoutRef<"section"> & {
  containerClassName?: string;
};

export function SectionWrapper({
  className,
  containerClassName,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section className={cn("py-8 sm:py-12 md:py-16", className)} {...props}>
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
