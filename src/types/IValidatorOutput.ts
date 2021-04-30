import { ErrorObject } from "ajv";

export interface IValidatorOutput {
  isValid: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
}
