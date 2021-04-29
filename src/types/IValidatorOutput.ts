import { ErrorObject } from "ajv";

export interface IValidatorOutput {
  valid: boolean;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
}
