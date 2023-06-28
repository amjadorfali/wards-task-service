import { IHealthTaskService } from "./interfaces/IHealthTaskService";
import { prisma } from "../db";
import { HealthCheck, HealthTaskMetadata, Prisma } from "@prisma/client";
import _ from "lodash";

export class HealthTaskService implements IHealthTaskService {
  getAllWithTeamId(teamId: number): Promise<HealthCheck[]> {
    return prisma.healthCheck.findMany({ where: { teamId: teamId } });
  }

  async get(id: string) {
    return prisma.healthCheck.findFirst({ include: { metadata: true }, where: { id: id } });
  }

  async create(healthCheck: HealthCheck, metaData: HealthTaskMetadata, teamId: number) {

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
      locations: healthCheck.locations,
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
    return prisma.healthCheck.create({ data: healthCheckCreateInput });
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
