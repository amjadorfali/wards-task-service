import express, { NextFunction, Request, Response } from "express";
import { validate } from "../utils/validations";
import { body } from "express-validator";
import { teamService } from "../services/factory";
import { getResponse } from "../utils";

export const teamRoute = express.Router();
//TODO: GET SUBID AND CONNECT OR CREATE
teamRoute.post("/", validate([
  body("userId", "InvalidValue").isString(),
  body("teamName", "InvalidValue").isString()
]), async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, teamName } = req.body;
  return teamService.create(userId, teamName)
    .then((data) => {
      res.json(getResponse.success(data));
    }).catch((e) => {
      next(e);
    });
});

teamRoute.put("/", validate([
  body("userId", "InvalidValue").isNumeric(),
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
