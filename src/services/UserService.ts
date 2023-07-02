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


  async updateMe(subId: string, email: string | undefined): Promise<User> {
    const systemUser = await this.getByEmail(email);
    if (systemUser) {
      const cognitoUser = systemUser.userIdentities.find(identity => identity.cognitoUid === subId);
      if (!cognitoUser) {
        await prisma.userIdentitiy.create({
          data: { userId: systemUser.id, cognitoUid: subId }
        });
      }
      return systemUser;
    } else {
      if (email) {
        return prisma.user.create({
          include: { teams: true },
          data: {
            email: email,
            teams: { create: [{ name: email.split("@")[0] }] },
            userIdentities: { create: [{ cognitoUid: subId }] }
          }
        });
      } else {
        throw new GenericError("ObjectNotFound");
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
