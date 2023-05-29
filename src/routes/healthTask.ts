import express, { NextFunction, Request, Response } from "express";
import { healthTaskService } from "../services";
import { getResponse } from "../utils/getResponse";
import { validate } from "../utils/validate";
import { body } from "express-validator";

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
    body("cron", "InvalidValue").isString()
  ]),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cron } = req.body;
    return healthTaskService.create("req.user.uid", cron)
      .then((data) => {
        res.json(getResponse.success(data));
      }).catch((e) => next(e));
  });

healthTaskRoute.put("/");
