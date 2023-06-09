import { CompareType, HealtCheckType, Method } from "@prisma/client";

type myEnums = HealtCheckType | Method | CompareType
export const validateEnum = async (value: string, enumToCheck: myEnums) => {
  return enumToCheck.includes(value);
};
