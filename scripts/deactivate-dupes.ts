import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });

const SLUGS_TO_DEACTIVATE = [
  "bachelor-of-business-administration-svftm",
  "bachelor-of-computer-applications-svftm",
  "bachelor-of-business-administration-svcmt",
  "bachelor-of-computer-applications-svcmt",
];

async function main() {
  const result = await prisma.program.updateMany({
    where: { slug: { in: SLUGS_TO_DEACTIVATE } },
    data: { isActive: false },
  });
  console.log(`Deactivated ${result.count} duplicate programs.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
