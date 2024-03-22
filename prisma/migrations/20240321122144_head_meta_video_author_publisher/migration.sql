/*
  Warnings:

  - You are about to drop the column `description` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `newsCategory` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `page` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "newsCategory_domainId_rootId_right_left_idx";

-- AlterTable
ALTER TABLE "news" DROP COLUMN "description",
ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "bestRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaImage" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "publisherId" TEXT,
ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ratingValue" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalRead" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "videoId" TEXT;

-- AlterTable
ALTER TABLE "newsCategory" DROP COLUMN "description",
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaImage" TEXT,
ADD COLUMN     "metaTitle" TEXT;

-- AlterTable
ALTER TABLE "page" DROP COLUMN "description",
ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "bestRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaImage" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "publisherId" TEXT,
ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ratingValue" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalRead" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "videoId" TEXT;

-- CreateTable
CREATE TABLE "author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publisher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT[],
    "file" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "totalWatch" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "author_userId_createdAt_idx" ON "author"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "publisher_userId_createdAt_idx" ON "publisher"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "video_userId_createdAt_idx" ON "video"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "newsCategory_domainId_rootId_right_left_createdAt_idx" ON "newsCategory"("domainId", "rootId", "right", "left", "createdAt");

-- AddForeignKey
ALTER TABLE "author" ADD CONSTRAINT "author_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publisher" ADD CONSTRAINT "publisher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
