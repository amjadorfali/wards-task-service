/*
  Warnings:

  - Added the required column `key` to the `Assertion` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Assertion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `url` to the `HealthCheck` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssertionType" AS ENUM ('RESPONSE_TIME', 'RESPONSE_CODE', 'RESPONSE_BODY', 'RESPONSE_JSON', 'RESPONSE_HEADER', 'SSL_SERTIFICATE_EXPIRES_IN');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CompareType" ADD VALUE 'DOES_NOT_CONTAIN';
ALTER TYPE "CompareType" ADD VALUE 'EQUAL';
ALTER TYPE "CompareType" ADD VALUE 'NOT_EQUAL';

-- AlterTable
ALTER TABLE "Assertion" ADD COLUMN     "key" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "AssertionType" NOT NULL;

-- AlterTable
ALTER TABLE "HealthCheck" ADD COLUMN     "url" TEXT NOT NULL;
