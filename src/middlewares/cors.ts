import { NextFunction, Request, Response } from "express";

export const corsPolicy = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();

};
