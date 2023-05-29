-- CreateTable
CREATE TABLE "HealthChecks" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "cron" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "HealthChecks_pkey" PRIMARY KEY ("id")
);
