import { IHealthTaskService } from "./interfaces/IHealthTaskService";
import { prisma } from "../db";

export class HealthTaskService implements IHealthTaskService {
  getAll(userId: string) {
    return prisma.healthChecks.findMany({ where: { userId: userId } });
  }

  create(userId: string, cron: string) {
    return prisma.healthChecks.create({ data: { userId: userId, status: 0, cron, enabled: true } });
  }

}
