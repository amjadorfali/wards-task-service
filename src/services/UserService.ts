import { IUserService } from "./interfaces/IUserService";
import { prisma } from "../db";
import { User } from "@prisma/client";
import { TeamService } from "./TeamService";
import { UserWithIdentities } from "../types";
import { GenericError } from "../errors";

export class UserService implements IUserService {
  private teamService: TeamService;

  constructor(teamService: TeamService) {
    this.teamService = teamService;
  }


  async create(subId: string, email: string | undefined, teamName: string): Promise<User> {
    const user = await this.getByEmail(email);
    if (user) {
      if (user.userIdentities.find(identity => identity.cognitoUid === subId)) {
        throw new GenericError("UserAlreadyExists");
      } else {
        return prisma.user.update({
          include: { teams: true},
          where: { email: email },
          data: { userIdentities: { create: { cognitoUid: subId } } }
        });
      }
    } else {
      if (email){
        return prisma.user.create({
          include: { teams: true},
          data: {
            email: email,
            teams: { create: [{ name: teamName }] },
            userIdentities: { create: [{ cognitoUid: subId }] }
          }
        });
      }else {
        throw new GenericError('ObjectNotFound')
      }

    }
  }

  getByCognitoUid(cognitoUid: string): Promise<UserWithIdentities | null> {
    return prisma.user.findFirst({
      where: { userIdentities: { every: { cognitoUid } } },
      include: { userIdentities: true }
    });
  }

  getByEmail(email: string | undefined): Promise<UserWithIdentities | null> {
    return prisma.user.findFirst({
      where: { email: email },
      include: { userIdentities: true }
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
