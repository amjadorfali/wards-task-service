/*
  Warnings:

  - You are about to drop the column `subId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_subId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "subId",
ADD COLUMN     "uuid" UUID NOT NULL DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "user_uuid_key" ON "user"("uuid");
