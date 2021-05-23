import { ValidationError } from 'yup';
import { Data } from '../interfaces';

export default function getValidationErrors(errors: ValidationError): Data {
  const validationErrors: Data = {};
  errors.inner.forEach(e => {
    if (e.path) {
      validationErrors[e.path] = e.message;
    }
  });
  return validationErrors;
}