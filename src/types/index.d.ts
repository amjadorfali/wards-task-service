import { Team } from "@prisma/client";

export * from "./Assertion";
export * from "./user";

declare global {
  namespace Express {
    interface Request {
      cognitoUser: {
        uuid: string;
        email?: string;
      };
      user: {
        id: number;
        uuid: string;
        team?: Team[];
      };
    }
  }
}
