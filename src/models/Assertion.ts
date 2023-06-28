import { AssertionType, CompareType } from "./enums";

export interface Assertion {
  key?: string,
  value: string | [] | number,

  type: AssertionType,
  compareType: CompareType
}
