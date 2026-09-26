import { prisma } from "../lib/prisma";

async function main() {
  const rows = await prisma.program.findMany({
    where: { isActive: true },
    select: { slug: true, title: true, isFeatured: true },
    orderBy: { title: "asc" },
  });

  const byTitle: Record<string, string[]> = {};
  for (const r of rows) {
    if (!byTitle[r.title]) byTitle[r.title] = [];
    byTitle[r.title].push(r.slug);
  }

  let dupeCount = 0;
  for (const [title, slugs] of Object.entries(byTitle)) {
    if (slugs.length > 1) {
      dupeCount++;
      console.log(`DUPE (${slugs.length}x): "${title}"`);
      for (const s of slugs) console.log("  ->", s);
    }
  }

  console.log(`\nTotal active programs: ${rows.length}, duplicate titles: ${dupeCount}`);
  await prisma.$disconnect();
}

main().catch(console.error);
