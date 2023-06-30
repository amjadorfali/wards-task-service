/*
  Warnings:

  - You are about to drop the `Metadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HealthCheck" DROP CONSTRAINT "HealthCheck_assertionId_fkey";

-- DropTable
DROP TABLE "Metadata";

-- CreateTable
CREATE TABLE "HealthTaskMetadata" (
    "id" SERIAL NOT NULL,
    "httpUserName" TEXT,
    "httpPassword" TEXT,
    "headers" JSONB,
    "assertions" JSONB,
    "requestBody" JSONB,
    "verifySSL" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "HealthTaskMetadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HealthCheck" ADD CONSTRAINT "HealthCheck_assertionId_fkey" FOREIGN KEY ("assertionId") REFERENCES "HealthTaskMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
