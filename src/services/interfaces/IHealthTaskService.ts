import { Assertion, Header, HealthCheck } from "@prisma/client";

export interface IHealthTaskService {
  get(userId: string): Promise<HealthCheck | null>;

  create(healthCheck: HealthCheck, assertions: Assertion[], headers: Header[]): Promise<HealthCheck>;

  delete(id: string): void;
}
