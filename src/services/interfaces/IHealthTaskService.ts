import { HealthCheck, HealthTaskMetadata, Team } from '@prisma/client';

export interface IHealthTaskService {
  getAllWithTeamId(id: string): Promise<HealthCheck[]>;

  get(id: string): Promise<HealthCheck | null>;

  create(
    healthCheck: HealthCheck,
    metaData: HealthTaskMetadata,
    teamId: string,
    cognitoUser: {
      uuid: string;
      email?: string;
    },
  ): Promise<HealthCheck>;

  delete(id: string): void;

  toggle(id: string): void;

  update(healthCheck: HealthCheck, metaData: HealthTaskMetadata, id: string): void;
}
