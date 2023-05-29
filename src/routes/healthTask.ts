import express, { NextFunction, Request, Response } from "express";
import { healthTaskService } from "../services";

export const healthTaskRoute = express.Router();


healthTaskRoute.get("/",async (
  req: Request,
  res: Response,
  next: NextFunction
)=>{
  healthTaskService.getAll(req.user.uid);
})

healthTaskRoute.post("/")

healthTaskRoute.put("/")
