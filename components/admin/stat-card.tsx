import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  color?: string;
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "bg-slate-900",
}: StatCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
          {trend ? (
            <p className="mt-2 text-sm font-medium text-slate-500">{trend}</p>
          ) : null}
        </div>

        <div className={`rounded-lg p-2 text-white ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </article>
  );
}
