import {logger} from "../libs";

export type ErrorCode =
  | "InternalError"
  | "UnknownError"
  | "InvalidName"
  | "InvalidEmail"
  | "FirebaseAuthError"
  | "FirebaseTokenExpiredError"
  | "FirebaseEmailError"
  | "FormError"
  | "ResourceIsNotExistedForUser"
  | "UserIsNotExisted"
  | "SkinAnalyzeResultUploadError"
  | "SkinAnalyzeError"
  | "MissingConfig"
  | "MissingQuestionSet"
  | "InvalidValue"
  | "PatternIsNotExisted"
  | "UniqueConstraintFailed"
  | "InvalidLanguage";

export class GenericError extends Error {
  errorCode: ErrorCode;
  errorData: object | undefined;

  constructor(errorCode: ErrorCode, debugData?: object, errorData?: object) {
    super("");
    this.errorCode = errorCode;
    this.errorData = errorData;
    if (errorCode !== "InternalError") {
      logger.error(`Error: ${errorCode}`, {data: debugData});
    }
  }
}
