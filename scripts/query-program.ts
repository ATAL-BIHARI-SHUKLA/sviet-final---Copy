import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";

const databaseUrl = process.env.DIRECT_URL;
if (!databaseUrl) throw new Error("DIRECT_URL required");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: tsx scripts/query-program.ts <slug>");
    process.exit(1);
  }

  const program = await prisma.program.findUnique({
    where: { slug },
    select: {
      slug: true,
      title: true,
      shortDescription: true,
      fullDescription: true,
      eligibility: true,
      tuitionCents: true,
      updatedAt: true,
    },
  });
  console.log(JSON.stringify(program, null, 2));
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma["$disconnect"]();
  });
