-- CreateEnum
CREATE TYPE "templateType" AS ENUM ('DEFAULT', 'HOME', 'NEWS', 'PAGE', 'ARTICLE');

-- CreateEnum
CREATE TYPE "dataType" AS ENUM ('NEWS', 'NEWS_CATEGORY', 'PAGE', 'MENU', 'TEXT', 'SCRIPT', 'IMAGE', 'CONTENT');

-- AlterTable
ALTER TABLE "domain" ADD COLUMN     "https" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "templateId" TEXT;

-- CreateTable
CREATE TABLE "template" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "version" DOUBLE PRECISION NOT NULL DEFAULT 1,

    CONSTRAINT "template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templateData" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "templateType" "templateType" NOT NULL,
    "name" TEXT NOT NULL,
    "dataType" "dataType" NOT NULL,
    "code" TEXT NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "templateData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domainTemplate" (
    "id" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "templateType" "templateType" NOT NULL,
    "code" TEXT NOT NULL,
    "refId" TEXT,
    "content" TEXT,

    CONSTRAINT "domainTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "templateData_templateId_templateType_idx" ON "templateData"("templateId", "templateType");

-- CreateIndex
CREATE UNIQUE INDEX "templateData_templateType_code_key" ON "templateData"("templateType", "code");

-- CreateIndex
CREATE INDEX "domainTemplate_domainId_templateType_idx" ON "domainTemplate"("domainId", "templateType");

-- AddForeignKey
ALTER TABLE "domain" ADD CONSTRAINT "domain_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "templateData" ADD CONSTRAINT "templateData_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domainTemplate" ADD CONSTRAINT "domainTemplate_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
