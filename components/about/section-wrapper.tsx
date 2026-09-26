import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionWrapperProps = ComponentPropsWithoutRef<"section"> & {
  containerClassName?: string;
};

export function SectionWrapper({ className, containerClassName, children, ...props }: SectionWrapperProps) {
  return (
    <section className={cn("py-16 md:py-20", className)} {...props}>
      <div className={cn("mx-auto max-w-[1280px] px-4 md:px-6", containerClassName)}>{children}</div>
    </section>
  );
}
