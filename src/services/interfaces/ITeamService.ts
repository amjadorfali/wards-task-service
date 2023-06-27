import { Team } from "@prisma/client";

export interface ITeamService {

  addUser(userId: number, teamId: number): Promise<Team>;

  create(userId: number, teamName: string): Promise<Team>;
}
