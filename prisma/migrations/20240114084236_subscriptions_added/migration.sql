-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('FREE', 'FIRST_TIER', 'SECOND_TIER', 'THIRD_TIER');

-- AlterTable
ALTER TABLE "team" ADD COLUMN     "subscription" "Subscription" NOT NULL DEFAULT 'FREE';
