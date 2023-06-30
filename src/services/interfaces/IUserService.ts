import { User } from "@prisma/client";

export interface IUserService {
  getByCognitoUid(subId: string): Promise<User | null>;

  create(subId: string, email: string, teamName: string): Promise<User>;

  update(subId: string, email: string): Promise<User>;

  delete(id: number): Promise<User>;

}
