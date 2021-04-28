import Ajv, { ErrorObject, JSONSchemaType, ValidateFunction } from "ajv";
const ajv = new Ajv({ allErrors: true });

interface PlaceholderData {
  foo: number;
  bar?: string;
}

const placeholderSchema: JSONSchemaType<PlaceholderData> = {
  type: "object",
  required: ["foo"],
  additionalProperties: false,
};

const validatorPlaceholder = ajv.compile(placeholderSchema);

// TODO: add schemas for prompt, survey, and input
ajv.addSchema(placeholderSchema, "placholderSchema");

function validate(
  validator: ValidateFunction<PlaceholderData>,
  data: any
): {
  valid: boolean;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
} {
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
}

export const validatePrompt = function (data: any) {
  return validate(validatorPlaceholder, data);
};

export const validateSurvey = function (data: any) {
  return validate(validatorPlaceholder, data);
};

export const validateInput = function (data: any) {
  return validate(validatorPlaceholder, data);
};
