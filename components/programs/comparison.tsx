import { COMPARISON_ROWS } from "@/components/programs/data";

export function ProgramComparisonSection() {
  return (
    <section className="mx-auto mt-30 w-full max-w-300 px-3 md:px-5">
      <p className="text-sm font-semibold tracking-[0.08em] text-[#f7941d] uppercase">
        Program Comparison
      </p>
      <h2 className="mt-2 text-4xl font-extrabold">
        Compare with Other Programs
      </h2>
      <div className="overflow-hidden mt-10 rounded-xl border border-[#e9e9e9] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-t py-8 border-[#efefef] bg-white text-[#666]">
            <tr>
              <th className="px-4 py-3 bg-[#f7941d] text-white ">Feature</th>
              <th className="px-4 py-3 bg-[#f7941d] text-white ">B.Tech CSE</th>
              <th className="px-4 py-3 bg-[#f7941d] text-white ">B.Tech ECE</th>
              <th className="px-4 py-3 bg-[#f7941d] text-white ">B.Tech ME</th>
              <th className="px-4 py-3 bg-[#f7941d] text-white ">BCA</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row[0]} className="border-t border-[#efefef]">
                <td className="px-4 py-5">{row[0]}</td>
                <td className="px-4 py-3 font-semibold">{row[1]}</td>
                <td className="px-4 py-3">{row[2]}</td>
                <td className="px-4 py-3">{row[3]}</td>
                <td className="px-4 py-3">{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-[#999]">
        * Data based on 2023-24 placements. Fees subject to revision.
      </p>
    </section>
  );
}
