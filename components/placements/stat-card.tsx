type StatCardProps = {
  value: string;
  label: string;
};

export function StatCard({ value, label }: StatCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{label}</p>
    </article>
  );
}