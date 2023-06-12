import express, { NextFunction, Request, Response } from "express";
import { healthTaskService } from "../services";
import { getResponse } from "../utils";
import { validate } from "../utils/validations";
import { body } from "express-validator";
import { CompareType, HealtCheckType, Location, Method } from "@prisma/client";
import { GenericError } from "../errors";

export const healthTaskRoute = express.Router();


healthTaskRoute.get("/:id", async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return healthTaskService.get(req.params.id)
    .then((data) => {
      if (data === null) {
        throw new GenericError("ObjectNotFound");
      }
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
    body("locations", "InvalidValue").optional().isIn(Object.values(Location)).isString(),
    body("assertions.*.type").isString(),
    body("assertions.*.value").isString(),
    body("assertions.*.compareType").isIn(Object.values(CompareType)),
    body("headers.*.type", "InvalidValue").isString(),
    body("headers.*.value", "InvalidValue").isString()
  ]),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { assertions, headers, ...healthCheckParams } = req.body;
    return healthTaskService.create(healthCheckParams, assertions, headers)
      .then((data) => {
        res.json(getResponse.success(data));
      }).catch((e) => {
        next(e);
      });
  });

healthTaskRoute.delete("/:id",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return healthTaskService.delete(req.params.id).then((data) => {
      res.json(getResponse.success(data));
    }).catch((e) => {
      console.log(e);
      next(e);
    });
  });
