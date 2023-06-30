/*
  Warnings:

  - The values [BROWSER] on the enum `HealthCheckType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Assertion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Header` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HealthCheckType_new" AS ENUM ('SWITCH', 'HTTP', 'SMTP', 'POP3', 'IMAP', 'TCP', 'UDP');
ALTER TABLE "HealthCheck" ALTER COLUMN "type" TYPE "HealthCheckType_new" USING ("type"::text::"HealthCheckType_new");
ALTER TYPE "HealthCheckType" RENAME TO "HealthCheckType_old";
ALTER TYPE "HealthCheckType_new" RENAME TO "HealthCheckType";
DROP TYPE "HealthCheckType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Header" DROP CONSTRAINT "Header_healthCheckId_fkey";

-- DropForeignKey
ALTER TABLE "HealthCheck" DROP CONSTRAINT "HealthCheck_assertionId_fkey";

-- DropTable
DROP TABLE "Assertion";

-- DropTable
DROP TABLE "Header";

-- DropEnum
DROP TYPE "AssertionType";

-- DropEnum
DROP TYPE "CompareType";

-- CreateTable
CREATE TABLE "Metadata" (
    "id" SERIAL NOT NULL,
    "httpUserName" TEXT,
    "httpPassword" TEXT,
    "headers" JSONB,
    "assertions" JSONB,
    "requestBody" JSONB,
    "verifySSL" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HealthCheck" ADD CONSTRAINT "HealthCheck_assertionId_fkey" FOREIGN KEY ("assertionId") REFERENCES "Metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
