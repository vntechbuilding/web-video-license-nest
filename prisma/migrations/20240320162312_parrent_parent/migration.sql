/*
  Warnings:

  - You are about to drop the column `parrentId` on the `newsCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "newsCategory" DROP CONSTRAINT "newsCategory_parrentId_fkey";

-- DropIndex
DROP INDEX "newsCategory_domainId_parrentId_idx";

-- AlterTable
ALTER TABLE "newsCategory" DROP COLUMN "parrentId",
ADD COLUMN     "parentId" TEXT;

-- CreateIndex
CREATE INDEX "newsCategory_domainId_parentId_idx" ON "newsCategory"("domainId", "parentId");

-- AddForeignKey
ALTER TABLE "newsCategory" ADD CONSTRAINT "newsCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "newsCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
