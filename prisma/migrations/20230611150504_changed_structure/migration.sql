-- CreateEnum
CREATE TYPE "CompareType" AS ENUM ('SMALL', 'BIG', 'SMALL_EQUAL', 'BIG_EQUAL');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('FRANKFURT', 'IRELAND', 'CALIFORNIA', 'DUBAI', 'OHIO', 'STOCKHOLM', 'SINGAPORE', 'SYDNEY', 'SAO_PAULO');

-- CreateEnum
CREATE TYPE "Method" AS ENUM ('GET', 'POST', 'PUT', 'PATCH', 'HEAD');

-- CreateEnum
CREATE TYPE "HealtCheckType" AS ENUM ('SWITCH', 'HTTP', 'BROWSER', 'TCP', 'UDP');

-- CreateTable
CREATE TABLE "HealthCheck" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "method" "Method" NOT NULL,
    "timeout" INTEGER,
    "verifySSL" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL,
    "type" "HealtCheckType" NOT NULL,
    "cron" TEXT,
    "locations" "Location"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assertion" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "compareType" "CompareType" NOT NULL,
    "healthCheckId" TEXT,

    CONSTRAINT "Assertion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Header" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "healthCheckId" TEXT,

    CONSTRAINT "Header_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthCheck_userId_name_key" ON "HealthCheck"("userId", "name");

-- AddForeignKey
ALTER TABLE "Assertion" ADD CONSTRAINT "Assertion_healthCheckId_fkey" FOREIGN KEY ("healthCheckId") REFERENCES "HealthCheck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Header" ADD CONSTRAINT "Header_healthCheckId_fkey" FOREIGN KEY ("healthCheckId") REFERENCES "HealthCheck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
