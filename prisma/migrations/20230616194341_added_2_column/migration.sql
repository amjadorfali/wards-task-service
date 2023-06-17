/*
  Warnings:

  - You are about to drop the column `cron` on the `HealthCheck` table. All the data in the column will be lost.
  - Added the required column `inProgress` to the `HealthCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastChecked` to the `HealthCheck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HealthCheck" DROP COLUMN "cron",
ADD COLUMN     "inProgress" BOOLEAN NOT NULL,
ADD COLUMN     "interval" INTEGER,
ADD COLUMN     "lastChecked" TIMESTAMP(3) NOT NULL;
