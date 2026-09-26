/**
 * Direct DDL migration runner — bypasses Prisma schema engine.
 * Uses `pg` directly so it works with Supabase pgBouncer (transaction mode).
 */
import "dotenv/config";
import { Client } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is required");

const client = new Client({ connectionString: DATABASE_URL });

const STEPS: Array<{ name: string; sql: string }> = [
  // ── Columns from the 20260503 refactor migration that never ran ───────────
  {
    name: "Add description to Event",
    sql: `ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "description" TEXT NOT NULL DEFAULT ''`,
  },
  {
    name: "Add image to Event",
    sql: `ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "image" TEXT NOT NULL DEFAULT ''`,
  },
  {
    name: "Add startDate to Event",
    sql: `ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
  },
  {
    name: "Add endDate to Event",
    sql: `ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "endDate" TIMESTAMP(3)`,
  },
  {
    name: "Add category to Event",
    sql: `ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "category" TEXT NOT NULL DEFAULT 'general'`,
  },
  {
    name: "Add isFeatured to Event",
    sql: `ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "isFeatured" BOOLEAN NOT NULL DEFAULT false`,
  },
  {
    name: "Create startDate index",
    sql: `CREATE INDEX IF NOT EXISTS "Event_startDate_idx" ON "Event"("startDate")`,
  },
  {
    name: "Create isFeatured+startDate index",
    sql: `CREATE INDEX IF NOT EXISTS "Event_isFeatured_startDate_idx" ON "Event"("isFeatured", "startDate")`,
  },
  // ── New columns ───────────────────────────────────────────────────────────
  {
    name: "Add slug to Event",
    sql: `ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "slug" TEXT`,
  },
  {
    name: "Add venue to Event",
    sql: `ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "venue" TEXT`,
  },
  {
    name: "Add images to Event",
    sql: `ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "images" TEXT[] NOT NULL DEFAULT '{}'`,
  },
  {
    name: "Add driveGalleryUrl to Event",
    sql: `ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "driveGalleryUrl" TEXT`,
  },
  {
    name: "Add updatedAt to Event (if missing)",
    sql: `
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'Event' AND column_name = 'updatedAt'
        ) THEN
          ALTER TABLE "Event" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
        END IF;
      END $$
    `,
  },
  {
    name: "Backfill slug from id for existing rows",
    sql: `UPDATE "Event" SET "slug" = "id" WHERE "slug" IS NULL`,
  },
  {
    name: "Set slug NOT NULL",
    sql: `ALTER TABLE "Event" ALTER COLUMN "slug" SET NOT NULL`,
  },
  {
    name: "Add UNIQUE constraint on slug (skip if index exists)",
    sql: `
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'Event_slug_key'
        ) AND NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'Event_slug_key'
        ) THEN
          ALTER TABLE "Event" ADD CONSTRAINT "Event_slug_key" UNIQUE ("slug");
        END IF;
      END $$
    `,
  },
  {
    name: "Create slug index",
    sql: `CREATE INDEX IF NOT EXISTS "Event_slug_idx" ON "Event"("slug")`,
  },
  {
    name: "Create EventSpeaker table",
    sql: `
      CREATE TABLE IF NOT EXISTS "EventSpeaker" (
        "id"           TEXT         NOT NULL,
        "eventId"      TEXT         NOT NULL,
        "name"         TEXT         NOT NULL,
        "photo"        TEXT,
        "bio"          TEXT,
        "linkedin"     TEXT,
        "twitter"      TEXT,
        "company"      TEXT,
        "designation"  TEXT,
        "displayOrder" INTEGER      NOT NULL DEFAULT 0,
        "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "EventSpeaker_pkey" PRIMARY KEY ("id")
      )
    `,
  },
  {
    name: "Add foreign key EventSpeaker → Event",
    sql: `
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'EventSpeaker_eventId_fkey'
        ) THEN
          ALTER TABLE "EventSpeaker"
            ADD CONSTRAINT "EventSpeaker_eventId_fkey"
            FOREIGN KEY ("eventId") REFERENCES "Event"("id")
            ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
      END $$
    `,
  },
  {
    name: "Create EventSpeaker index",
    sql: `CREATE INDEX IF NOT EXISTS "EventSpeaker_eventId_displayOrder_idx" ON "EventSpeaker"("eventId", "displayOrder")`,
  },
];

async function run() {
  await client.connect();
  console.log("Connected to database.\n");

  for (const step of STEPS) {
    try {
      await client.query(step.sql);
      console.log(`  ✓ ${step.name}`);
    } catch (err) {
      console.error(`  ✗ ${step.name}:`, (err as Error).message);
      throw err;
    }
  }

  console.log("\nMigration complete.");
  await client.end();
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
