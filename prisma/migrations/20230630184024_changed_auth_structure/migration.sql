/*
  Warnings:

  - You are about to drop the `HealthCheck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HealthTaskMetadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Incident` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HealthCheck" DROP CONSTRAINT "HealthCheck_assertionId_fkey";

-- DropForeignKey
ALTER TABLE "HealthCheck" DROP CONSTRAINT "HealthCheck_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_healthCheckId_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_userId_fkey";

-- DropForeignKey
ALTER TABLE "_TeamToUser" DROP CONSTRAINT "_TeamToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamToUser" DROP CONSTRAINT "_TeamToUser_B_fkey";

-- DropTable
DROP TABLE "HealthCheck";

-- DropTable
DROP TABLE "HealthTaskMetadata";

-- DropTable
DROP TABLE "Incident";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "subId" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT NOT NULL,
    "healthCheckUsage" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_identity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cognitoUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_identity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incident" (
    "id" SERIAL NOT NULL,
    "status" "IncidentStatus" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "cause" TEXT NOT NULL,
    "userId" INTEGER,
    "teamId" INTEGER NOT NULL,
    "healthCheckId" TEXT NOT NULL,

    CONSTRAINT "incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_check" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "method" "Method" NOT NULL,
    "timeout" INTEGER,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "type" "HealthCheckType" NOT NULL,
    "inProgress" BOOLEAN NOT NULL,
    "interval" INTEGER NOT NULL,
    "lastChecked" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "locations" "Location"[],
    "port" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" INTEGER NOT NULL,
    "assertionId" INTEGER,

    CONSTRAINT "health_check_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_task_metadata" (
    "id" SERIAL NOT NULL,
    "httpUserName" TEXT,
    "httpPassword" TEXT,
    "headers" JSONB,
    "assertions" JSONB,
    "requestBody" JSONB,
    "verifySSL" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "health_task_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_subId_key" ON "user"("subId");

-- CreateIndex
CREATE UNIQUE INDEX "user_identity_cognitoUid_key" ON "user_identity"("cognitoUid");

-- CreateIndex
CREATE UNIQUE INDEX "health_check_assertionId_key" ON "health_check"("assertionId");

-- CreateIndex
CREATE UNIQUE INDEX "health_check_teamId_name_key" ON "health_check"("teamId", "name");

-- AddForeignKey
ALTER TABLE "user_identity" ADD CONSTRAINT "user_identity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incident" ADD CONSTRAINT "incident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incident" ADD CONSTRAINT "incident_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incident" ADD CONSTRAINT "incident_healthCheckId_fkey" FOREIGN KEY ("healthCheckId") REFERENCES "health_check"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_check" ADD CONSTRAINT "health_check_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_check" ADD CONSTRAINT "health_check_assertionId_fkey" FOREIGN KEY ("assertionId") REFERENCES "health_task_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
