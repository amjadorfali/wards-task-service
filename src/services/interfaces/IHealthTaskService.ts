import { HealthCheck } from "@prisma/client";

export interface IHealthTaskService {
  getAll(userId: string): Promise<HealthCheck[]>;

  create(healthCheck:HealthCheck): Promise<HealthCheck>;
}
