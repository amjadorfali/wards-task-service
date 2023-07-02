import { IHealthTaskService } from "./interfaces/IHealthTaskService";
import { prisma } from "../db";
import { HealthCheck, HealthTaskMetadata, Prisma } from "@prisma/client";
import _ from "lodash";
import { TeamService } from "./TeamService";

export class HealthTaskService implements IHealthTaskService {
  private teamService: TeamService;

  constructor(teamService: TeamService) {
    this.teamService = teamService;
  }

  getAllWithTeamId(teamId: number): Promise<HealthCheck[]> {
    return prisma.healthCheck.findMany({ where: { teamId: teamId } });
  }

  async get(id: string) {
    return prisma.healthCheck.findFirst({ include: { metadata: true }, where: { id: id } });
  }

  async create(healthCheck: HealthCheck, metaData: HealthTaskMetadata, teamId: number) {
    const team = await this.teamService.getById(teamId);
    //TODO: check subscription on this level about pricing if it is higher than subscription throw an error
    if (healthCheck.timeout != null) {
      healthCheck.timeout *= 1000;
    }
    let healthCheckCreateInput: Prisma.HealthCheckCreateInput = {
      team: { connect: { id: teamId } },
      url: healthCheck.url,
      inProgress: false,
      lastChecked: new Date(),
      interval: healthCheck.interval,
      enabled: true,
      name: healthCheck.name,
      timeout: healthCheck.timeout,
      method: healthCheck.method,
      type: healthCheck.type,
      locations: healthCheck.locations
    };

    if (!_.isEmpty(metaData)) {
      const metaDataCreateInput: Prisma.HealthTaskMetadataCreateInput = {
        httpUserName: metaData.httpUserName,
        httpPassword: metaData.httpPassword,
        assertions: metaData.assertions !== null ? metaData.assertions : undefined,
        headers: metaData.headers !== null ? metaData.headers : undefined,
        verifySSL: metaData.verifySSL,
        requestBody: metaData.requestBody !== null ? metaData.requestBody : undefined
      };
      healthCheckCreateInput = {
        ...healthCheckCreateInput,
        metadata: {
          create: metaDataCreateInput
        }
      };
    }

    return prisma.$transaction([prisma.healthCheck.create({ data: healthCheckCreateInput }), this.teamService.update(teamId, { healthCheckUsage: team.healthCheckUsage + 1 })]);
  }

  update(healthCheck: HealthCheck) {
    return prisma.healthCheck.update({
      where: { id: healthCheck.id },
      data: {
        interval: healthCheck.interval,
        enabled: healthCheck.enabled,
        name: healthCheck.name,
        timeout: healthCheck.timeout,
        method: healthCheck.method,
        type: healthCheck.type
      }
    });
  }

  async delete(id: string) {
    return prisma.healthCheck.delete({ where: { id: id } });
  }


}
