import { ITeamService } from "./interfaces/ITeamService";
import { Team } from "@prisma/client";
import { prisma } from "../db";

export class TeamService implements ITeamService {


  addUser(userId: number, teamId: number): Promise<Team> {

    return prisma.team.update({ where: { id: teamId }, data: { users: { connect: [{ id: userId }] } } });
  }

  create(userId: number, teamName: string) : Promise<Team>{
    return prisma.team.create({ data: { name: teamName, users: { connect: { id: userId } } } });
  }
}
