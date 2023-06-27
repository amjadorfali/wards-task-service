-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('OWNER', 'MODERATOR', 'COMMENTER', 'READER');

-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('ONGOING', 'RESOLVED', 'ACKNOWLEDGED');

-- CreateTable
CREATE TABLE "Incident" (
    "id" SERIAL NOT NULL,
    "status" "IncidentStatus" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "cause" TEXT NOT NULL,
    "userId" INTEGER,
    "teamId" INTEGER NOT NULL,
    "healthCheckId" TEXT NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_healthCheckId_fkey" FOREIGN KEY ("healthCheckId") REFERENCES "HealthCheck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
