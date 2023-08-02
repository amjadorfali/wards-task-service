import { PrismaPromise, Team } from "@prisma/client";

export interface ITeamService {
  getById(teamId: number): Promise<Team>;

  addUser(userId: number, teamId: number): Promise<Team>;

  create(cognitoSubId: string, teamName: string): Promise<Team>;

  update(teamId: string, data: Pick<Team, "healthCheckUsage">): PrismaPromise<Team>;

}
