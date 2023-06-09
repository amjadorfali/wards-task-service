import { NextFunction, Request, Response } from "express";
import { GenericError } from "../errors";
import { getResponse } from "../utils";
import { Prisma } from "@prisma/client";
import { logger } from "../libs";

export const errorHandler = async (
  error: GenericError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    let statusCode = 500;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error("Error: DB", {
        data: { code: error.code, meta: error.meta }
      });
      if (error.code === "P2002") {
        res
          .status(statusCode)
          .json(getResponse.error("UniqueConstraintFailed"));
      } else {
        res.status(statusCode).json(getResponse.error("UnknownServiceError"));
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      logger.error("Error: Validation", {
        data: { code: error.errorCode, meta: error.cause }
      });

      res.status(statusCode).json(getResponse.error("PrismaClientValidationError", error.message));
    } else {
      res
        .status(statusCode)
        .json(
          getResponse.error(error.errorCode ?? "UnknownError", error.errorData)
        );
    }
  } else {
    next();
  }
};
