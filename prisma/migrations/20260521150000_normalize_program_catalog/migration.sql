-- CreateEnum
DO $$
BEGIN
  CREATE TYPE "CourseLevel" AS ENUM ('UG', 'PG', 'DIPLOMA', 'VOCATIONAL', 'PROFESSIONAL', 'CERTIFICATE');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "Department" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Specialization" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "departmentId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Specialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "ProgramSpecialization" (
    "programId" TEXT NOT NULL,
    "specializationId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgramSpecialization_pkey" PRIMARY KEY ("programId","specializationId")
);

-- Program refactor
ALTER TABLE "Program"
  ADD COLUMN IF NOT EXISTS "departmentId" TEXT,
  ADD COLUMN IF NOT EXISTS "level" "CourseLevel" NOT NULL DEFAULT 'UG',
  ADD COLUMN IF NOT EXISTS "seoTitle" TEXT,
  ADD COLUMN IF NOT EXISTS "seoDescription" TEXT,
  ADD COLUMN IF NOT EXISTS "metadata" JSONB;

ALTER TABLE "Program"
  ALTER COLUMN "shortDescription" DROP NOT NULL,
  ALTER COLUMN "tuitionCents" DROP NOT NULL,
  ALTER COLUMN "highlights" TYPE JSONB USING CASE WHEN "highlights" IS NULL THEN NULL ELSE to_jsonb("highlights") END,
  ALTER COLUMN "outcomes" TYPE JSONB USING CASE WHEN "outcomes" IS NULL THEN NULL ELSE to_jsonb("outcomes") END,
  ALTER COLUMN "facilities" TYPE JSONB USING CASE WHEN "facilities" IS NULL THEN NULL ELSE to_jsonb("facilities") END;

-- Seed departments from legacy text values.
WITH distinct_departments AS (
  SELECT DISTINCT
    trim("department") AS name,
    lower(regexp_replace(trim("department"), '[^a-z0-9]+', '-', 'g')) AS slug
  FROM "Program"
  WHERE "department" IS NOT NULL
    AND trim("department") <> ''
)
INSERT INTO "Department" ("id", "slug", "name", "sortOrder", "isActive", "createdAt", "updatedAt")
SELECT
  slug AS id,
  slug,
  name,
  row_number() OVER (ORDER BY name) - 1 AS sortOrder,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM distinct_departments
ON CONFLICT ("id") DO NOTHING;

UPDATE "Program"
SET "departmentId" = lower(regexp_replace(trim("department"), '[^a-z0-9]+', '-', 'g'))
WHERE "department" IS NOT NULL
  AND trim("department") <> '';

-- Seed specializations from existing parenthetical titles.
WITH distinct_specializations AS (
  SELECT DISTINCT
    trim(substring("title" from '\\(([^)]+)\\)')) AS name,
    lower(regexp_replace(trim(substring("title" from '\\(([^)]+)\\)')), '[^a-z0-9]+', '-', 'g')) AS slug
  FROM "Program"
  WHERE "title" ~ '\\(([^)]+)\\)'
    AND trim(substring("title" from '\\(([^)]+)\\)')) <> ''
    AND trim(substring("title" from '\\(([^)]+)\\)')) !~* '^hons\\.?$'
)
INSERT INTO "Specialization" ("id", "slug", "name", "isActive", "createdAt", "updatedAt")
SELECT
  slug AS id,
  slug,
  name,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM distinct_specializations
ON CONFLICT ("id") DO NOTHING;

-- Backfill a reasonable level for legacy records. The seed will overwrite this with the canonical value.
UPDATE "Program"
SET "level" = (CASE
  WHEN "title" ILIKE 'Pharm.D%' OR "title" ILIKE 'Pharma.D%' THEN 'PROFESSIONAL'
  WHEN "title" ILIKE 'LLB' OR "title" ILIKE 'Bachelor in Education%' OR "title" ILIKE 'Bachelor of Education%' THEN 'PROFESSIONAL'
  WHEN "title" ILIKE 'Master%' OR "title" ILIKE 'Masters%' OR "title" ILIKE 'M.%' OR "title" ILIKE 'MCA%' OR "title" ILIKE 'MHMCT%' THEN 'PG'
  WHEN "title" ILIKE 'Diploma%' OR "title" ILIKE 'PGDCA%' OR "title" ILIKE 'Post Graduate Diploma%' THEN 'DIPLOMA'
  WHEN "title" ILIKE 'Welder%' OR "title" ILIKE 'Plumber%' OR "title" ILIKE 'COPA%' THEN 'VOCATIONAL'
  ELSE 'UG'
END)::"CourseLevel";

ALTER TABLE "Program"
  ADD CONSTRAINT "Program_departmentId_fkey"
  FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Specialization"
  ADD CONSTRAINT "Specialization_departmentId_fkey"
  FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ProgramSpecialization"
  ADD CONSTRAINT "ProgramSpecialization_programId_fkey"
  FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProgramSpecialization"
  ADD CONSTRAINT "ProgramSpecialization_specializationId_fkey"
  FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE UNIQUE INDEX "Department_slug_key" ON "Department"("slug");
CREATE INDEX "Department_sortOrder_isActive_idx" ON "Department"("sortOrder", "isActive");
CREATE UNIQUE INDEX "Specialization_slug_key" ON "Specialization"("slug");
CREATE INDEX "Specialization_departmentId_isActive_idx" ON "Specialization"("departmentId", "isActive");
CREATE INDEX "Program_departmentId_level_isActive_idx" ON "Program"("departmentId", "level", "isActive");
CREATE INDEX "Program_slug_isActive_idx" ON "Program"("slug", "isActive");
CREATE INDEX "ProgramSpecialization_specializationId_isPrimary_idx" ON "ProgramSpecialization"("specializationId", "isPrimary");

ALTER TABLE "Program"
  DROP COLUMN IF EXISTS "department";