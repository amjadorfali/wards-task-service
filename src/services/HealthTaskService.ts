import { IHealthTaskService } from './interfaces/IHealthTaskService';
import { prisma } from '../db';
import { HealthCheck, HealthTaskMetadata, Prisma } from '@prisma/client';
import _ from 'lodash';
import { TeamService } from './TeamService';
import { GenericError } from '../errors';

export class HealthTaskService implements IHealthTaskService {
  private teamService: TeamService;

  constructor(teamService: TeamService) {
    this.teamService = teamService;
  }

  getAllWithTeamId(teamId: string) {
    return prisma.healthCheck.findMany({
      where: { team: { uuid: teamId } },
      include: { metadata: true, insights: true },
    });
  }

  async getById(id: string) {
    const task = await prisma.healthCheck.findFirst({ where: { id } });
    if (!task) {
      throw new GenericError('TaskDoesNotExists');
    }
    return task;
  }

  async get(id: string) {
    return prisma.healthCheck.findFirst({ include: { metadata: true, insights:true }, where: { id: id } });
  }

  async create(healthCheck: HealthCheck, metaData: HealthTaskMetadata, teamId: string) {
    const team = await this.teamService.getByUUID(teamId);
    //TODO: check subscription on this level about pricing if it is higher than subscription throw an error

    let healthCheckCreateInput: Prisma.HealthCheckCreateInput = {
      team: { connect: { uuid: teamId } },
      url: healthCheck.url,
      interval: healthCheck.interval,
      enabled: true,
      name: healthCheck.name,
      timeout: healthCheck.timeout,
      method: healthCheck.method,
      type: healthCheck.type,
      locations: healthCheck.locations,
    };

    if (!_.isEmpty(metaData)) {
      const metaDataCreateInput: Prisma.HealthTaskMetadataCreateInput = {
        httpUserName: metaData.httpUserName,
        httpPassword: metaData.httpPassword,
        assertions: metaData.assertions !== null ? metaData.assertions : undefined,
        headers: metaData.headers !== null ? metaData.headers : undefined,
        verifySSL: metaData.verifySSL,
        requestBody: metaData.requestBody !== null ? metaData.requestBody : undefined,
      };
      healthCheckCreateInput = {
        ...healthCheckCreateInput,
        metadata: {
          create: metaDataCreateInput,
        },
        insights: {
          create: {},
        },
      };
    }

    return prisma.healthCheck.create({ data: healthCheckCreateInput });
  }

  update(healthCheck: HealthCheck, metaData: HealthTaskMetadata, id: string) {
    const metadataUpdateInput: Prisma.HealthTaskMetadataUpdateInput = {};
    if (!_.isEmpty(metaData)) {
      if (Array.isArray(metaData.assertions)) {
        metadataUpdateInput.assertions = metaData.assertions;
      }
      if (typeof(metaData.verifySSL)==='boolean') {
        metadataUpdateInput.verifySSL = metaData.verifySSL;
      }
      if (Array.isArray(metaData.headers)) {
        metadataUpdateInput.headers = metaData.headers;
      }
      if (typeof metaData.httpUserName==='string') {
        metadataUpdateInput.httpUserName = metaData.httpUserName;
      }
      if (typeof metaData.httpPassword ==='string') {
        metadataUpdateInput.httpPassword = metaData.httpPassword;
      }
      if (typeof metaData.requestBody==='string') {
        metadataUpdateInput.requestBody = metaData.requestBody;
      }
    }

    return prisma.healthCheck.update({
      where: { id },
      data: {
        interval: healthCheck.interval,
        enabled: healthCheck.enabled,
        name: healthCheck.name,
        timeout: healthCheck.timeout,
        method: healthCheck.method,
        type: healthCheck.type,
        locations  : healthCheck.locations,
        url: healthCheck.url,
        updatedAt: new Date(),
        metadata: {
          update: metadataUpdateInput,
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.healthCheck.delete({ where: { id } });
  }

  async toggle(id: string) {
    const task = await this.getById(id);
    prisma.healthCheck.update({ where: { id }, data: { enabled: !task.enabled } });
  }
}
