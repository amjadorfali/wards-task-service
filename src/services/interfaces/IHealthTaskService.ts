import { HealthCheck, HealthTaskMetadata, Team } from "@prisma/client";

export interface IHealthTaskService {
  getAllWithTeamId(id: number): Promise<HealthCheck[]>;

  get(id: string): Promise<HealthCheck | null>;

  create(healthCheck: HealthCheck, metaData: HealthTaskMetadata, teamId: number): Promise<[HealthCheck, Team]>;

  delete(id: string): void;
}
