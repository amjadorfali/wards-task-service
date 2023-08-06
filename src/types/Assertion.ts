import { AssertionType, CompareType } from "../enums/enums";

export interface Assertion {
  key?: string,
  value: string | [] | number,

  type: AssertionType,
  compareType: typeof CompareType
}
