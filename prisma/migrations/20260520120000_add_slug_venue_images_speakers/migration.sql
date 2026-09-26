-- Add missing columns to Event model and create EventSpeaker table

-- Add slug column (table is empty so no data migration needed)
ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "slug" TEXT;
ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "venue" TEXT;
ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "images" TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "driveGalleryUrl" TEXT;

-- Add updatedAt if not present
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='Event' AND column_name='updatedAt'
  ) THEN
    ALTER TABLE "Event" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
  END IF;
END $$;

-- Backfill slug from id for any existing rows, then make it NOT NULL UNIQUE
UPDATE "Event" SET "slug" = "id" WHERE "slug" IS NULL;
ALTER TABLE "Event" ALTER COLUMN "slug" SET NOT NULL;

-- Create unique constraint for slug
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Event_slug_key'
  ) THEN
    ALTER TABLE "Event" ADD CONSTRAINT "Event_slug_key" UNIQUE ("slug");
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "Event_slug_idx" ON "Event"("slug");

-- Create EventSpeaker table
CREATE TABLE IF NOT EXISTS "EventSpeaker" (
  "id"           TEXT          NOT NULL,
  "eventId"      TEXT          NOT NULL,
  "name"         TEXT          NOT NULL,
  "photo"        TEXT,
  "bio"          TEXT,
  "linkedin"     TEXT,
  "twitter"      TEXT,
  "company"      TEXT,
  "designation"  TEXT,
  "displayOrder" INTEGER       NOT NULL DEFAULT 0,
  "createdAt"    TIMESTAMP(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EventSpeaker_pkey" PRIMARY KEY ("id")
);

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'EventSpeaker_eventId_fkey'
  ) THEN
    ALTER TABLE "EventSpeaker"
      ADD CONSTRAINT "EventSpeaker_eventId_fkey"
      FOREIGN KEY ("eventId") REFERENCES "Event"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "EventSpeaker_eventId_displayOrder_idx"
  ON "EventSpeaker"("eventId", "displayOrder");
