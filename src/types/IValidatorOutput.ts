import { ErrorObject } from "ajv";

export interface IValidatorOutput {
  isValid: boolean;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
}
