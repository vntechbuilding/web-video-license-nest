-- DropIndex
DROP INDEX "news_domainId_categoryId_idx";

-- DropIndex
DROP INDEX "page_domainId_idx";

-- CreateIndex
CREATE INDEX "news_domainId_categoryId_createdAt_idx" ON "news"("domainId", "categoryId", "createdAt");

-- CreateIndex
CREATE INDEX "news_createdAt_idx" ON "news"("createdAt");

-- CreateIndex
CREATE INDEX "page_domainId_createdAt_idx" ON "page"("domainId", "createdAt");

-- CreateIndex
CREATE INDEX "page_createdAt_idx" ON "page"("createdAt");
