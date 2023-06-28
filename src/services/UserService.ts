import { IUserService } from "./interfaces/IUserService";
import { prisma } from "../db";
import { User } from "@prisma/client";
import { TeamService } from "./TeamService";

export class UserService implements IUserService {
  private teamService: TeamService;

  constructor(teamService: TeamService) {
    this.teamService = teamService;
  }

  get(subId: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { subId: subId } });
  }

  async create(subId: string, email: string, teamName: string): Promise<User> {

    return prisma.user.create({
      include: { teams: true },
      data: {
        subId: subId,
        email: email,
        teams: { create: [{ name: teamName }] }
      }
    });
  }

  delete(id: number): Promise<User> {
    return prisma.user.delete({ where: { id: id } });
  }


  update(id: string, email: string): Promise<User> {
    return prisma.user.update({
      where: { id: 1 }, data: { email: email }
    });
  }

}
