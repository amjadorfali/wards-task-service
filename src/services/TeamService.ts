import { ITeamService } from "./interfaces/ITeamService";
import { PrismaPromise, Team } from "@prisma/client";
import { prisma } from "../db";
import { GenericError } from "../errors";

export class TeamService implements ITeamService {

  async getById(teamId: number): Promise<Team> {
    const team = await prisma.team.findFirst({ where: { id: teamId } });
    if (team === null) {
      throw new GenericError("TeamNotExists");
    }
    return team;
  }

  addUser(userId: number, teamId: number): Promise<Team> {

    return prisma.team.update({ where: { id: teamId }, data: { users: { connect: [{ id: userId }] } } });
  }

  create(userId: number, teamName: string): Promise<Team> {
    return prisma.team.create({ data: { name: teamName, users: { connect: { id: userId } } } });
  }

  update(teamId: number, data: Pick<Team, "healthCheckUsage">): PrismaPromise<Team> {
    return prisma.team.update({ where: { id: teamId }, data: { ...data } });
  }


}
