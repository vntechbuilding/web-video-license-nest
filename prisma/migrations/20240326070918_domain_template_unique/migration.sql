/*
  Warnings:

  - A unique constraint covering the columns `[domainId,templateType,code]` on the table `domainTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "domainTemplate_domainId_templateType_code_key" ON "domainTemplate"("domainId", "templateType", "code");
