import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";

const databaseUrl = process.env.DIRECT_URL;

if (!databaseUrl) {
  throw new Error("DIRECT_URL is required.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
  const slug = process.argv[2];

  if (!slug) {
    throw new Error("Usage: tsx scripts/delete-course.ts <slug>");
  }

  const joinRows = await prisma.programSpecialization.deleteMany({
    where: { program: { slug } },
  });
  const programRows = await prisma.program.deleteMany({
    where: { slug },
  });

  console.log(
    `Deleted ${programRows.count} program(s) and ${joinRows.count} specialization row(s) for ${slug}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma["$disconnect"]();
  });
