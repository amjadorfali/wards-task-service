-- AlterTable
ALTER TABLE "health_task_metadata" ALTER COLUMN "issuedUserEmail" DROP NOT NULL,
ALTER COLUMN "issuedUserEmail" DROP DEFAULT;
