import Image from "next/image";

import { cn } from "@/lib/utils";

export type Leader = {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  messageParagraphs?: string[];
  socialLinks?: Array<{
    label: string;
    href: string;
  }>;
  quote?: string;
  quoteAttribution?: string;
  highlight?: string;
};

type LeaderCardProps = {
  name: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  active?: boolean;
  onSelect?: () => void;
  dataIndex?: number;
  className?: string;
};

export function LeaderCard({ name, title, imageSrc, imageAlt, active = false, onSelect, dataIndex, className }: LeaderCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-leader-index={dataIndex}
      aria-current={active ? "true" : undefined}
      aria-label={`Show profile for ${name}`}
      className={cn(
        "snap-start shrink-0 basis-55 overflow-hidden border text-left transition shadow-none sm:basis-60",
        active
          ? "border-[#93C5FD] bg-[#1E3A8A] text-white"
          : "border-[#1E3A8A]/70 bg-[#0F172A]/80 text-[#E2E8F0] hover:bg-[#1E293B]",
        className,
      )}
    >
      <div className="relative aspect-4/3 w-full ">
        <Image
          src={imageSrc}
          alt={imageAlt ?? name}
          fill
          sizes="(max-width: 640px) 220px, (max-width: 1024px) 240px, 240px"
          className="object-cover object-top"
        />
      </div>
      <div className="p-4">
        <p className="text-2xl font-semibold leading-tight">{name}</p>
        <p className={cn("mt-2 text-base", active ? "text-[#BFDBFE]" : "text-[#93C5FD]")}>{title}</p>
      </div>
    </button>
  );
}
