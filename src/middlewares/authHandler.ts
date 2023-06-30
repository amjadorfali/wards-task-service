import { NextFunction, Request, Response } from "express";
import { cognitoVerifier, getCognitoUser } from "../libs/aws/auth";
import { GenericError } from "../errors";

export const authHandler = async (
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
    const user = await getCognitoUser(payload.sub);

    if (!user.email) {
      throw new GenericError("UserDoesntHaveEmailFromCognito");
    }

    req.cognitoUser = {
      uuid: payload.sub,
      email: user.email,
    };

    next();
  } catch (e) {
    console.log(e)
    res.status(403).json({ error: "Bad auth token" });
  }
};
