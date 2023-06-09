import { IHealthTaskService } from "./interfaces/IHealthTaskService";
import { prisma } from "../db";
import { HealthCheck } from "@prisma/client";

export class HealthTaskService implements IHealthTaskService {
  getAll(userId: string) {
    return prisma.healthCheck.findMany({ where: { userId: userId } });
  }

  create(healthCheck: HealthCheck) {
    return prisma.healthCheck.create({
      data: {
        userId: healthCheck.userId,
        cron: healthCheck.cron,
        enabled: true,
        verifySSL: healthCheck.verifySSL,
        uuid: healthCheck.uuid,
        name: healthCheck.name,
        timeout: healthCheck.timeout,
        method: healthCheck.method,
        type: healthCheck.type
      }
    });
  }
  update(healthCheck: HealthCheck) {
    return prisma.healthCheck.update({
      where: { id: healthCheck.id },
      data: {
        userId: healthCheck.userId,
        cron: healthCheck.cron,
        enabled: healthCheck.enabled,
        verifySSL: healthCheck.verifySSL,
        uuid: healthCheck.uuid,
        name: healthCheck.name,
        timeout: healthCheck.timeout,
        method: healthCheck.method,
        type: healthCheck.type
      },
    });
  }
}
