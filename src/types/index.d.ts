export * from "./Assertion";
export * from "./user";

declare global {
  namespace Express {
    interface Request {
      // user: UserWithIdentities | null;
      cognitoUser: {
        uuid: string;
        email: string;
      };
    }
  }
}
