import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type InfoCardProps = {
  title: string;
  description: string;
  meta?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  children?: ReactNode;
};

export function InfoCard({ title, description, meta, imageSrc, imageAlt, className, children }: InfoCardProps) {
  return (
    <article
      className={cn(
        "border border-[#DCE7FF] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] p-6 shadow-[0_8px_24px_rgba(30,42,120,0.06)]",
        className,
      )}
    >
      {imageSrc ? (
        <div className="relative mb-5 aspect-16/10 overflow-hidden rounded-2xl bg-[#EEF4FF]">
          <Image src={imageSrc} alt={imageAlt ?? title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
        </div>
      ) : null}
      <h3 className="text-xl font-semibold text-[#111827]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{description}</p>
      {meta ? <p className="mt-3 text-sm font-semibold text-[#f7941d]">{meta}</p> : null}
      {children}
    </article>
  );
}
