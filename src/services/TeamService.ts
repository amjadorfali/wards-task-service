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
  async getByUUID(teamId: string): Promise<Team> {
    const team = await prisma.team.findFirst({ where: { uuid: teamId } });
    if (team === null) {
      throw new GenericError("TeamNotExists");
    }
    return team;
  }
  addUser(userId: number, teamId: number): Promise<Team> {

    return prisma.team.update({ where: { id: teamId }, data: { users: { connect: [{ id: userId }] } } });
  }

  async create(cognitoSubId: string, teamName: string): Promise<Team> {
    const cognitoUser = await prisma.user.findFirst({
      where: { userIdentities: { every: { cognitoUid: cognitoSubId } } }
    });
    if (!cognitoUser) {
      throw new GenericError("ObjectNotFound");
    }
    return prisma.team.create({ data: { name: teamName, users: { connect: { id: cognitoUser.id } } } });
  }

  update(teamId: string, data: Pick<Team, "healthCheckUsage">): PrismaPromise<Team> {
    return prisma.team.update({ where: { uuid: teamId }, data: { ...data } });
  }

  updateName(teamId: string, name : string): PrismaPromise<Team> {
    return prisma.team.update({ where: { uuid: teamId }, data: { name } });
  }

}
