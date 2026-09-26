import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const rows = await prisma.program.findMany({
  where: { isActive: true },
  select: { slug: true, title: true, isFeatured: true },
  orderBy: { title: "asc" },
});

// group by title
const byTitle = {};
for (const r of rows) {
  if (!byTitle[r.title]) byTitle[r.title] = [];
  byTitle[r.title].push(r.slug);
}

// show duplicates
for (const [title, slugs] of Object.entries(byTitle)) {
  if (slugs.length > 1) {
    console.log(`DUPE: "${title}"`);
    for (const s of slugs) console.log("  slug:", s);
  }
}
console.log("\nTotal active programs:", rows.length);
await prisma.$disconnect();
