-- CreateEnum
CREATE TYPE "urlType" AS ENUM ('NEWS', 'NEWSCATEGORY', 'PAGE', 'ARTICLE');

-- DropForeignKey
ALTER TABLE "userForgotPasswordCode" DROP CONSTRAINT "userForgotPasswordCode_userId_fkey";

-- CreateTable
CREATE TABLE "domain" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "url" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "urlType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "domainId" TEXT NOT NULL,
    "refId" TEXT NOT NULL,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsCategory" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "summary" TEXT,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "domainId" TEXT NOT NULL,
    "rootId" TEXT,
    "parrentId" TEXT,
    "left" INTEGER NOT NULL DEFAULT 1,
    "right" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "newsCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "image" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "domainId" TEXT NOT NULL,
    "rootId" TEXT,
    "categoryId" TEXT,
    "left" INTEGER NOT NULL DEFAULT 0,
    "right" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "domainId" TEXT NOT NULL,

    CONSTRAINT "page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "domainId" TEXT NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "domain_domain_key" ON "domain"("domain");

-- CreateIndex
CREATE INDEX "domain_domain_idx" ON "domain"("domain");

-- CreateIndex
CREATE INDEX "domain_userId_domain_idx" ON "domain"("userId", "domain");

-- CreateIndex
CREATE INDEX "url_domainId_url_createdAt_idx" ON "url"("domainId", "url", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "url_domainId_url_key" ON "url"("domainId", "url");

-- CreateIndex
CREATE INDEX "newsCategory_domainId_rootId_right_left_idx" ON "newsCategory"("domainId", "rootId", "right", "left");

-- CreateIndex
CREATE INDEX "newsCategory_domainId_parrentId_idx" ON "newsCategory"("domainId", "parrentId");

-- CreateIndex
CREATE INDEX "newsCategory_domainId_code_idx" ON "newsCategory"("domainId", "code");

-- CreateIndex
CREATE INDEX "news_domainId_rootId_right_left_idx" ON "news"("domainId", "rootId", "right", "left");

-- CreateIndex
CREATE INDEX "news_domainId_code_idx" ON "news"("domainId", "code");

-- CreateIndex
CREATE INDEX "news_domainId_categoryId_idx" ON "news"("domainId", "categoryId");

-- CreateIndex
CREATE INDEX "page_domainId_code_idx" ON "page"("domainId", "code");

-- CreateIndex
CREATE INDEX "article_domainId_code_idx" ON "article"("domainId", "code");

-- CreateIndex
CREATE INDEX "admin_username_idx" ON "admin"("username");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_phone_idx" ON "user"("phone");

-- AddForeignKey
ALTER TABLE "userForgotPasswordCode" ADD CONSTRAINT "userForgotPasswordCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain" ADD CONSTRAINT "domain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url" ADD CONSTRAINT "url_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newsCategory" ADD CONSTRAINT "newsCategory_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newsCategory" ADD CONSTRAINT "newsCategory_parrentId_fkey" FOREIGN KEY ("parrentId") REFERENCES "newsCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "newsCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
