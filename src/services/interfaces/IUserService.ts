import { User } from "@prisma/client";

export interface IUserService {
  get(subId: string): Promise<User | null>;

  create(subId: string, email: string, phoneNumber: string, teamName: string): Promise<User>;

  update(subId: string, email: string, phoneNumber: string): Promise<User>;

  delete(id: number): Promise<User>;

}
