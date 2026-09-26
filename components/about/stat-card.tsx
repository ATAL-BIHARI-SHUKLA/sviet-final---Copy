import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  className?: string;
};

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <article
      className={cn(
        "border border-[#DCE7FF] bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F9FF_100%)] p-6 shadow-[0_8px_24px_rgba(30,42,120,0.06)]",
        className,
      )}
    >
      <p className="text-3xl font-bold text-[#f7941d]">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{label}</p>
    </article>
  );
}
