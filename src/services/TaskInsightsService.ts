import { prisma } from '../db';

class TaskInsightsService {
  updateTaskInsights(id: string, sslIssuedBy: string, sslExpiresOn: string, status: number) {
    return prisma.taskInsight.upsert({
      where: { id },
      update: { sslIssuedBy, sslExpiresOn, status },
      create: { sslIssuedBy, sslExpiresOn, status },
    });
  }
}

export const taskInsightService = new TaskInsightsService();
