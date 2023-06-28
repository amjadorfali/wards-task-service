import express, { NextFunction, Request, Response } from "express";
import { healthTaskService } from "../services";
import { getResponse } from "../utils";
import { validate } from "../utils/validations";
import { body } from "express-validator";
import { HealthCheckType, Location, Method } from "@prisma/client";
import { GenericError } from "../errors";
import { validateAssertions } from "../utils/validations/validateHealthCheck";
import { interval } from "../models/enums";

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
    body("teamId", "InvalidValue").isInt(),
    body("name", "InvalidValue").isString(),
    body("url", "InvalidValue").isString(),
    body("port", "InvalidValue").optional().isInt(),
    body("method", "InvalidValue").isIn(Object.values(Method)),
    body("timeout", "InvalidValue").isNumeric(),
    body("enabled", "InvalidValue").isBoolean(),
    body("type", "InvalidValue").notEmpty().isIn(Object.values(HealthCheckType)),
    body("interval", "InvalidValue").isIn(Object.values(interval)),
    body("locations", "InvalidValue").optional().isIn(Object.values(Location)).isString(),
    body("metadata.verifySSL", "InvalidValue").default(false).isBoolean(),
    body("metadata.headers", "InvalidValue").optional().isObject(),
    body("metadata.assertions", "InvalidValue").optional().isArray().custom(validateAssertions),
    body("metadata.requestBody", "InvalidValue").optional(),
    body("metadata.httpUserName", "InvalidValue").optional().isString(),
    body("metadata.httpPassword", "InvalidValue").optional().isString(),
  ]),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { metadata, teamId, ...healthCheckParams } = req.body;
    return healthTaskService.create(healthCheckParams, metadata, teamId)
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
