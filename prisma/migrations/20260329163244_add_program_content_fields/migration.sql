-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "curriculum" JSONB,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "eligibility" TEXT,
ADD COLUMN     "facilities" TEXT[],
ADD COLUMN     "faqs" JSONB,
ADD COLUMN     "fullDescription" TEXT,
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mode" TEXT,
ADD COLUMN     "outcomes" TEXT[];
