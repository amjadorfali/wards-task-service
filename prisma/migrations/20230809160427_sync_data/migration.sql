/*
  Warnings:

  - The values [OHIO,STOCKHOLM,SINGAPORE,SAO_PAULO] on the enum `Location` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `port` on the `health_check` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Location_new" AS ENUM ('FRANKFURT', 'IRELAND', 'CALIFORNIA', 'DUBAI', 'SYDNEY');
ALTER TABLE "health_check" ALTER COLUMN "locations" TYPE "Location_new"[] USING ("locations"::text::"Location_new"[]);
ALTER TYPE "Location" RENAME TO "Location_old";
ALTER TYPE "Location_new" RENAME TO "Location";
DROP TYPE "Location_old";
COMMIT;

-- AlterTable
ALTER TABLE "health_check" DROP COLUMN "port";
