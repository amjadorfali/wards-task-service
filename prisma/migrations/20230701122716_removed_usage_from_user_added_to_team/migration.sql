/*
  Warnings:

  - You are about to drop the column `healthCheckUsage` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "team" ADD COLUMN     "healthCheckUsage" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "healthCheckUsage";
