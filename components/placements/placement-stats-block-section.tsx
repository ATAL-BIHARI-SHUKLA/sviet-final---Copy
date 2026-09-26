import { PLACEMENT_KEY_STATS } from "@/components/placements/placement-data";

export function PlacementStatsBlockSection() {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl bg-linear-to-br from-[#ffffff] to-[#f8f9fb] px-4 py-8 sm:px-5 md:mt-14 md:rounded-[30px] md:px-10 md:py-16">
      <div className="grid gap-4 md:grid-cols-2">
        {PLACEMENT_KEY_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#dbe6ff] bg-white px-4 py-4 text-center sm:px-5 md:py-6"
          >
            <p className="font-extrabold leading-none tracking-[-0.04em] text-[#0b3b8f] text-3xl sm:text-4xl md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-black/75 sm:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-black/65 sm:mt-8 sm:text-sm">
        Data represents cumulative placement achievements.
      </p>
    </div>
  );
}
