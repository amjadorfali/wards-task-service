import { User } from "@prisma/client";

export interface IUserService {
  getByCognitoUid(subId: string): Promise<User | null>;

  updateMe(subId: string, email: string | undefined): Promise<User>;

  update(subId: string, email: string): Promise<User>;

  delete(id: number): Promise<User>;

}
