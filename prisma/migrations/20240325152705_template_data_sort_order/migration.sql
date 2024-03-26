/*
  Warnings:

  - A unique constraint covering the columns `[templateId,templateType,code]` on the table `templateData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "templateData_templateId_templateType_idx";

-- DropIndex
DROP INDEX "templateData_templateType_code_key";

-- AlterTable
ALTER TABLE "template" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "templateData" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "template_createdAt_idx" ON "template"("createdAt");

-- CreateIndex
CREATE INDEX "templateData_templateId_templateType_sortOrder_idx" ON "templateData"("templateId", "templateType", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "templateData_templateId_templateType_code_key" ON "templateData"("templateId", "templateType", "code");
