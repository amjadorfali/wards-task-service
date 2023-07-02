import express, { NextFunction, Request, Response } from "express";
import { userService } from "../services/factory";
import { getResponse } from "../utils";
import { GenericError } from "../errors";
import { generateAuthHandler } from "../middlewares/authHandler";



const authHandler = generateAuthHandler({ includeCognitoEmail: true, });
export const userRoute = express.Router();


userRoute.get("/check",
  authHandler,
   async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cognitoUser } = req;
  return userService.updateMe(cognitoUser.uuid, cognitoUser.email)
    .then((data) => {
      res.json(getResponse.success(data));
    }).catch((e) => {
      next(e);
    });
});


userRoute.get("/:subId",
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    return userService.getByCognitoUid(req.params.subId)
      .then((data) => {
        if (data === null) {
          throw new GenericError("ObjectNotFound");
        }
        res.json(getResponse.success(data));
      }).catch((e) => next(e));
  });


userRoute.delete("/:id",
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    return userService.delete(parseInt(req.params.id, 10))
      .then((data) => {
        if (data === null) {
          throw new GenericError("ObjectNotFound");
        }
        res.json(getResponse.success(data));
      }).catch((e) => next(e));
  });
