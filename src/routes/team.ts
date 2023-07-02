import express, { NextFunction, Request, Response } from "express";
import { validate } from "../utils/validations";
import { body } from "express-validator";
import { teamService } from "../services/factory";
import { getResponse } from "../utils";
import { generateAuthHandler } from "../middlewares/authHandler";

export const teamRoute = express.Router();
const authHandler = generateAuthHandler({ includeCognitoEmail: true });

teamRoute.post("/",
  authHandler,
  validate([
    body("teamName", "InvalidValue").isString()
  ]), async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { teamName } = req.body;
    const { cognitoUser } = req;
    return teamService.create(cognitoUser.uuid, teamName)
      .then((data) => {
        res.json(getResponse.success(data));
      }).catch((e) => {
        next(e);
      });
  });

teamRoute.put("/",
  authHandler,
  validate([
    body("teamId", "InvalidValue").isNumeric()
  ]), async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, teamId } = req.body;
    return teamService.addUser(userId, teamId)
      .then((data) => {
        res.json(getResponse.success(data));
      }).catch((e) => {
        next(e);
      });
  });
