-- AlterTable
ALTER TABLE "domain" ADD COLUMN     "favicons" TEXT;

-- CreateIndex
CREATE INDEX "menu_domainId_parentId_idx" ON "menu"("domainId", "parentId");
