import { Assertion, CompareType, HealtCheckType, Method } from "@prisma/client";
import { body } from "express-validator";
import { validate } from "./validate";

type myEnums = HealtCheckType | Method | CompareType
export const validateAssertions = async (assertions: Assertion[]) => {

  return validate([
    body("assertions.*.type").isString(),
    body("assertions.*.value").notEmpty().isIn(Object.values(CompareType)),
    body("assertions.*.compareType").isString()
  ]);


};
