import { GenericError } from "../errors";
import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const requestLogger = async (
  error: GenericError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
)=>{
  console.log(req.path)
  next();

}
