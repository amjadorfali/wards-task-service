/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "team" ADD COLUMN     "uuid" UUID NOT NULL DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "team_uuid_key" ON "team"("uuid");
