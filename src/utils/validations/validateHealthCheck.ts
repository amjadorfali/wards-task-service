import { AssertionType } from "../../enums/enums";
import { Assertion } from "../../types";
import { GenericError } from "../../errors";


export const validateAssertions = async (assertions: Assertion[]) => {
  assertions.forEach((val) => {
    switch (val.type) {
      case AssertionType.RESPONSE_BODY:
      case AssertionType.RESPONSE_CODE:
        if ((val.value instanceof Array) && val.value.every((element:any) => {return typeof element === 'number'})) {
          break;
        }
        throw new GenericError("FormError", { val: val.value });
      case AssertionType.RESPONSE_HEADER:
      case AssertionType.RESPONSE_JSON:
      case AssertionType.RESPONSE_TIME:
      case AssertionType.SSL_CERTIFICATE_EXPIRES_IN:
    }
  });

};
