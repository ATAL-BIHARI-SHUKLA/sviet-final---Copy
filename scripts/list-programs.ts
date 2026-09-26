import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const all = await prisma.program.findMany({
    orderBy: [{ department: { name: "asc" } }, { title: "asc" }],
    select: {
      title: true,
      isActive: true,
      department: {
        select: {
          name: true,
        },
      },
    },
  });

  const byDept: Record<string, typeof all> = {};
  for (const p of all) {
    const departmentName = p.department?.name ?? "Unassigned";
    (byDept[departmentName] ??= []).push(p);
  }

  let total = 0,
    active = 0;
  for (const [dept, progs] of Object.entries(byDept)) {
    console.log(`\n── ${dept} (${progs.length}) ──`);
    for (const p of progs) {
      const flag = p.isActive ? "✅" : "❌";
      console.log(`  ${flag}  ${p.title}`);
      total++;
      if (p.isActive) active++;
    }
  }
  console.log(
    `\nTotal: ${total}  Active: ${active}  Inactive: ${total - active}`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
