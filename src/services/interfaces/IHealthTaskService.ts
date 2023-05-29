import { HealthChecks } from "@prisma/client";

export interface IHealthTaskService {
  getAll(userId: string): Promise<HealthChecks[]>;

  create(userId: string, cron: string): Promise<HealthChecks>;
}
