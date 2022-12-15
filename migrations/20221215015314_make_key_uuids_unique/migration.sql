/*
  Warnings:

  - A unique constraint covering the columns `[accessKeyUuid]` on the table `AccessKeyPair` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[secretKeyUuid]` on the table `AccessKeyPair` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccessKeyPair_accessKeyUuid_key" ON "AccessKeyPair"("accessKeyUuid");

-- CreateIndex
CREATE UNIQUE INDEX "AccessKeyPair_secretKeyUuid_key" ON "AccessKeyPair"("secretKeyUuid");
