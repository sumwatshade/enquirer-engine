import Ajv, { ErrorObject, JSONSchemaType, ValidateFunction } from "ajv";
const ajv = new Ajv({ allErrors: true });

type PlaceholderReturnType = {
  valid: boolean;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
};

interface PlaceholderData {
  foo: number;
  bar?: string;
}

const placeholderSchema: JSONSchemaType<PlaceholderData> = {
  type: "object",
  required: ["foo"],
  additionalProperties: false,
};

// TODO: add schemas for prompt, survey, and input
ajv.addSchema(placeholderSchema, "placholderSchema");

const validatorPlaceholder = ajv.compile(placeholderSchema);

const validate = (
  validator: ValidateFunction<PlaceholderData>,
  data: any
): PlaceholderReturnType => {
  const valid = validator(data);
  const errors = validator?.errors ?? [];

  if (valid) {
    return {
      valid,
    };
  } else {
    return {
      valid,
      errors,
    };
  }
};

export const validatePrompt = (data: any): PlaceholderReturnType => {
  return validate(validatorPlaceholder, data);
};

export const validateSurvey = (data: any): PlaceholderReturnType => {
  return validate(validatorPlaceholder, data);
};

export const validateInput = (data: any): PlaceholderReturnType => {
  return validate(validatorPlaceholder, data);
};
