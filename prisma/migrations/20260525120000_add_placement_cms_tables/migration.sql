-- CreateTable
CREATE TABLE "PlacementRecord" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "packageValue" DOUBLE PRECISION NOT NULL,
    "packageLabel" TEXT NOT NULL,
    "imageSrc" TEXT,
    "imageAlt" TEXT,
    "isShowcase" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlacementRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacementTrendYear" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "companiesVisited" INTEGER NOT NULL,
    "highestPackageLpa" DOUBLE PRECISION NOT NULL,
    "averagePackageLpa" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlacementTrendYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacementHighlightBanner" (
    "id" TEXT NOT NULL,
    "badgeText" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "packageLabel" TEXT NOT NULL,
    "batchYear" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlacementHighlightBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacementKeyStat" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlacementKeyStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlacementTrendYear_year_key" ON "PlacementTrendYear"("year");

-- CreateIndex
CREATE INDEX "PlacementRecord_isActive_year_packageValue_idx" ON "PlacementRecord"("isActive", "year", "packageValue");

-- CreateIndex
CREATE INDEX "PlacementRecord_isShowcase_sortOrder_idx" ON "PlacementRecord"("isShowcase", "sortOrder");

-- CreateIndex
CREATE INDEX "PlacementKeyStat_sortOrder_idx" ON "PlacementKeyStat"("sortOrder");
