import { PrismaPromise, Team } from "@prisma/client";

export interface ITeamService {
  getById(teamId: number): Promise<Team>;

  addUser(userId: number, teamId: number): Promise<Team>;

  create(userId: number, teamName: string): Promise<Team>;

  update(teamId: number, data: Pick<Team, "healthCheckUsage">): PrismaPromise<Team>;

}
