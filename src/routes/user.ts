import express, { NextFunction, Request, Response } from "express";
import { validate } from "../utils/validations";
import { body } from "express-validator";
import { userService } from "../services/factory";
import { getResponse } from "../utils";
import { GenericError } from "../errors";

export const userRoute = express.Router();


userRoute.post("/", validate([
  body("subId", "InvalidValue").isString(),
  body("email", "InvalidValue").isEmail(),
  body("teamName", "InvalidValue").isString()
]), async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { subId, email, teamName } = req.body;
  return userService.create(subId, email, teamName)
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
    return userService.get(req.params.subId)
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
