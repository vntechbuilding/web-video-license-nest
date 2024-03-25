-- CreateTable
CREATE TABLE "menu" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "text" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentId" TEXT,
    "domainId" TEXT NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "menu_domainId_sortOrder_idx" ON "menu"("domainId", "sortOrder");

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
