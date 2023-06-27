import { Assertion, Header, HealthCheck } from "@prisma/client";

export interface IHealthTaskService {
  getAllWithTeamId(id: number): Promise<HealthCheck[]>;

  get(id: string): Promise<HealthCheck | null>;

  create(healthCheck: HealthCheck, assertions: Assertion[], headers: Header[], teamId: number): Promise<HealthCheck>;

  delete(id: string): void;
}
