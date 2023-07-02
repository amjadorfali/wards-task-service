import express, { NextFunction, Request, Response } from "express";
import { validate } from "../utils/validations";
import { body } from "express-validator";
import { userService } from "../services/factory";
import { getResponse } from "../utils";
import { GenericError } from "../errors";
import { generateAuthHandler } from "../middlewares/authHandler";



const authHandler = generateAuthHandler({ includeCognitoEmail: true, });
export const userRoute = express.Router();


userRoute.post("/",
  authHandler,
  validate([
  body("teamName", "InvalidValue").isString()
]), async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cognitoUser } = req;
  const { teamName } = req.body;
  return userService.create(cognitoUser.uuid, cognitoUser.email, teamName)
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
