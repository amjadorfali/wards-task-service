/*
  Warnings:

  - You are about to drop the column `compareType` on the `Assertion` table. All the data in the column will be lost.
  - You are about to drop the column `healthCheckId` on the `Assertion` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `Assertion` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Assertion` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Assertion` table. All the data in the column will be lost.
  - You are about to drop the column `verifySSL` on the `HealthCheck` table. All the data in the column will be lost.
  - You are about to drop the column `healthCheckId` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[assertionId]` on the table `HealthCheck` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `interval` to the `HealthCheck` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Interval" AS ENUM ('SECOND_30', 'SECOND_45', 'MINUTE_1', 'MINUTE_2', 'MINUTE_3', 'MINUTE_5', 'MINUTE_10', 'MINUTE_15', 'MINUTE_30');

-- DropForeignKey
ALTER TABLE "Assertion" DROP CONSTRAINT "Assertion_healthCheckId_fkey";

-- AlterTable
ALTER TABLE "Assertion" DROP COLUMN "compareType",
DROP COLUMN "healthCheckId",
DROP COLUMN "key",
DROP COLUMN "type",
DROP COLUMN "value",
ADD COLUMN     "assertions" JSONB,
ADD COLUMN     "httpPassword" TEXT,
ADD COLUMN     "httpUserName" TEXT,
ADD COLUMN     "requestBody" JSONB,
ADD COLUMN     "verifySSL" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HealthCheck" DROP COLUMN "verifySSL",
ADD COLUMN     "assertionId" INTEGER,
ADD COLUMN     "port" INTEGER,
ALTER COLUMN "enabled" SET DEFAULT true,
DROP COLUMN "interval",
ADD COLUMN     "interval" "Interval" NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "healthCheckId";

-- CreateIndex
CREATE UNIQUE INDEX "HealthCheck_assertionId_key" ON "HealthCheck"("assertionId");

-- AddForeignKey
ALTER TABLE "HealthCheck" ADD CONSTRAINT "HealthCheck_assertionId_fkey" FOREIGN KEY ("assertionId") REFERENCES "Assertion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
