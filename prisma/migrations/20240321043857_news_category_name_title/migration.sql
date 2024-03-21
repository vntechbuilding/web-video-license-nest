/*
  Warnings:

  - You are about to drop the column `code` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `newsCategory` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `newsCategory` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `page` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "article_domainId_code_idx";

-- DropIndex
DROP INDEX "news_domainId_code_idx";

-- DropIndex
DROP INDEX "newsCategory_domainId_code_idx";

-- DropIndex
DROP INDEX "page_domainId_code_idx";

-- AlterTable
ALTER TABLE "article" DROP COLUMN "code",
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "news" DROP COLUMN "code",
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "newsCategory" DROP COLUMN "code",
DROP COLUMN "name",
ADD COLUMN     "title" TEXT,
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "page" DROP COLUMN "code",
ADD COLUMN     "url" TEXT;

-- CreateIndex
CREATE INDEX "article_domainId_idx" ON "article"("domainId");

-- CreateIndex
CREATE INDEX "page_domainId_idx" ON "page"("domainId");
