import { NextFunction, Request, Response } from "express";
import { cognitoVerifier, getCognitoUser } from "../libs/aws/auth";
import { userService } from "../services/factory";

export const generateAuthHandler = ({
                                      includeAppUser = false,
                                      includeCognitoEmail = false
                                    }: {
  includeCognitoEmail?: boolean;
  includeAppUser?: boolean;
}) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(" ")[1];

    try {
      if (!token) {
        res.status(403).json({ error: "Bad auth token" });
        return;
      }

      const payload = await cognitoVerifier.verify(token);
      req.cognitoUser = {
        uuid: payload.username,
        email: undefined,
      };

      if (includeCognitoEmail) {
        const user = await getCognitoUser(payload.username);
        req.cognitoUser.email = user.email;
      }

      if (includeAppUser) {
        const user = await userService.getByCognitoUid(payload.sub);
        if (!user) {
          res.status(403).json({ error: "User is not found!" });
          return;
        }

        req.user = {
          id: user.id,
          uuid: user.uuid
        };
      }

      next();
    } catch (e) {
      res.status(403).json({ error: "Bad auth token" });
    }
  };
};
