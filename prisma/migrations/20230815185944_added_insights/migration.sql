/*
  Warnings:

  - You are about to drop the column `assertionId` on the `health_check` table. All the data in the column will be lost.
  - You are about to drop the column `inProgress` on the `health_check` table. All the data in the column will be lost.
  - You are about to drop the column `lastChecked` on the `health_check` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[metadataId]` on the table `health_check` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[insightsId]` on the table `health_check` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `insightsId` to the `health_check` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "health_check" DROP CONSTRAINT "health_check_assertionId_fkey";

-- DropIndex
DROP INDEX "health_check_assertionId_key";

-- AlterTable
ALTER TABLE "health_check" DROP COLUMN "assertionId",
DROP COLUMN "inProgress",
DROP COLUMN "lastChecked",
ADD COLUMN     "insightsId" TEXT NOT NULL,
ADD COLUMN     "metadataId" INTEGER;

-- CreateTable
CREATE TABLE "task_insight" (
    "id" TEXT NOT NULL,
    "sslIssuedBy" TEXT,
    "sslExpiresOn" TIMESTAMP(3),
    "status" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_insight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "health_check_metadataId_key" ON "health_check"("metadataId");

-- CreateIndex
CREATE UNIQUE INDEX "health_check_insightsId_key" ON "health_check"("insightsId");

-- AddForeignKey
ALTER TABLE "health_check" ADD CONSTRAINT "health_check_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "health_task_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_check" ADD CONSTRAINT "health_check_insightsId_fkey" FOREIGN KEY ("insightsId") REFERENCES "task_insight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
