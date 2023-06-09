import express, { NextFunction, Request, Response } from "express";
import { healthTaskService } from "../services";
import { getResponse } from "../utils";
import { validate, validateEnum } from "../utils/validations";
import { body } from "express-validator";
import { HealtCheckType, Method } from "@prisma/client";

export const healthTaskRoute = express.Router();


healthTaskRoute.get("/", async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return healthTaskService.getAll("req.user.uid")
    .then((data) => {
      res.json(getResponse.success(data));
    }).catch((e) => next(e));
});

healthTaskRoute.post("/",
  validate([
    body("userId", "InvalidValue").isString(),
    body("name", "InvalidValue").isString(),
    body("method", "InvalidValue").isIn(Object.values(Method)),
    body("timeout", "InvalidValue").isNumeric(),
    body("verifySSL", "InvalidValue").isBoolean(),
    body("enabled", "InvalidValue").isBoolean(),
    body("type", "InvalidValue").notEmpty().isIn(Object.values(HealtCheckType)),
    body("cron", "InvalidValue").isString(),
    body("uuid", "InvalidValue").isString()
  ]),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return healthTaskService.create(req.body)
      .then((data) => {
        res.json(getResponse.success(data));
      }).catch((e) => {
        next(e);
      });
  });
