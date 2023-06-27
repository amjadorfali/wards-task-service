/*
  Warnings:

  - A unique constraint covering the columns `[teamId,name]` on the table `HealthCheck` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamId` to the `HealthCheck` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `HealthCheck` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HealthCheckType" AS ENUM ('SWITCH', 'HTTP', 'BROWSER', 'TCP', 'UDP');

-- DropIndex
DROP INDEX "HealthCheck_userId_name_key";

-- AlterTable
ALTER TABLE "HealthCheck" ADD COLUMN     "teamId" INTEGER NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "HealthCheckType" NOT NULL;

-- DropEnum
DROP TYPE "HealtCheckType";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "subId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "healthCheckId" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToUser_AB_unique" ON "_TeamToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToUser_B_index" ON "_TeamToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "HealthCheck_teamId_name_key" ON "HealthCheck"("teamId", "name");

-- AddForeignKey
ALTER TABLE "HealthCheck" ADD CONSTRAINT "HealthCheck_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
