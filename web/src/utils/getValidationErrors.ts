import { ValidationError } from 'yup';
import Errors from '../interfaces';

export default function getValidationErrors(errors: ValidationError): Errors {
  const validationErrors: Errors = {};
  errors.inner.forEach(e => {
    if (e.path) {
      validationErrors[e.path] = e.message;
    }
  });
  return validationErrors;
}