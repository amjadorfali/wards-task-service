/*
  Warnings:

  - A unique constraint covering the columns `[subId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `interval` on the `HealthCheck` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "HealthCheck" DROP COLUMN "interval",
ADD COLUMN     "interval" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_subId_key" ON "User"("subId");
