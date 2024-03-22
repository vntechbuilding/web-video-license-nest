-- DropIndex
DROP INDEX "news_domainId_rootId_right_left_idx";

-- AlterTable
ALTER TABLE "news" ADD COLUMN     "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "bestRating" SET DEFAULT 5,
ALTER COLUMN "ratingValue" SET DEFAULT 0,
ALTER COLUMN "ratingValue" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "page" ADD COLUMN     "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "bestRating" SET DEFAULT 5,
ALTER COLUMN "ratingValue" SET DEFAULT 0,
ALTER COLUMN "ratingValue" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "news_domainId_rootId_right_left_createdAt_idx" ON "news"("domainId", "rootId", "right", "left", "createdAt");
