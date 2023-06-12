import { IHealthTaskService } from "./interfaces/IHealthTaskService";
import { prisma } from "../db";
import { Assertion, Header, HealthCheck, Prisma } from "@prisma/client";
import _ from "lodash";

export class HealthTaskService implements IHealthTaskService {
  async get(id: string) {
    return prisma.healthCheck.findFirst({ include: { assertions: true }, where: { id: id } });
  }

  async create(healthCheck: HealthCheck, assertions: Assertion[], headers: Header[]) {
    let healthCheckCreateInput: Prisma.HealthCheckCreateInput = {
      userId: healthCheck.userId,
      cron: healthCheck.cron,
      enabled: true,
      verifySSL: healthCheck.verifySSL,
      name: healthCheck.name,
      timeout: healthCheck.timeout,
      method: healthCheck.method,
      type: healthCheck.type,
      locations: healthCheck.locations
    };
    // Check if posts should be included in the query
    if (!_.isEmpty(assertions)) {
      healthCheckCreateInput.assertions = {
        create: assertions.map(assertion => {
          return {
            type: assertion.type,
            compareType: assertion.compareType,
            value: assertion.value
          };
        })
      };
    }
    if (!_.isEmpty(headers)) {
      healthCheckCreateInput.headers = {
        create: headers.map(header => {
          return {
            type: header.type,
            value: header.value
          };
        })
      };
    }

    return prisma.healthCheck.create({ data: healthCheckCreateInput });
  }

  update(healthCheck: HealthCheck) {
    return prisma.healthCheck.update({
      where: { id: healthCheck.id },
      data: {
        userId: healthCheck.userId,
        cron: healthCheck.cron,
        enabled: healthCheck.enabled,
        verifySSL: healthCheck.verifySSL,
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
