import { AssertionType, CompareType } from '../../enums/enums';
import { Assertion } from '../../types';
import { GenericError } from '../../errors';

export const validateAssertions = async (assertions: Assertion[]) => {
  assertions.forEach((val) => {
    switch (val.type) {
      case AssertionType.RESPONSE_BODY:
        if (typeof val.value !== 'string') {
          throw new GenericError('FormError', { val: val.value });
        }
        break;
      case AssertionType.RESPONSE_CODE:
        if (typeof val.value !== 'number' && Object.values(CompareType).includes(val.compareType)) {
          throw new GenericError('FormError', { val: val.value });
        }
        break;
      case AssertionType.RESPONSE_HEADER:
        if (typeof val.key !== 'string' && val.value === undefined){
          throw new GenericError('FormError', { val: val.value });
        }
        break;
      case AssertionType.RESPONSE_JSON:
        if (typeof val.key !== 'string' && val.value === undefined){
          throw new GenericError('FormError', { val: val.value });
        }
        break;
      case AssertionType.RESPONSE_TIME:
        if (typeof val.value !== 'number'){
          throw new GenericError('FormError', { val: val.value });
        }
        break;
      case AssertionType.SSL_CERTIFICATE_EXPIRES_IN:
        if (typeof val.value !== 'number'){
          throw new GenericError('FormError', { val: val.value });
        }
        break;
    }
  });
};
