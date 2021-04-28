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

const validatorPlaceholder = ajv.compile(placeholderSchema);

// TODO: add schemas for prompt, survey, and input
ajv.addSchema(placeholderSchema, "placholderSchema");

function validate(
  validator: ValidateFunction<PlaceholderData>,
  data: any
): PlaceholderReturnType {
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

export function validatePrompt(data: any): PlaceholderReturnType {
  return validate(validatorPlaceholder, data);
}

export function validateSurvey(data: any): PlaceholderReturnType {
  return validate(validatorPlaceholder, data);
}

export function validateInput(data: any): PlaceholderReturnType {
  return validate(validatorPlaceholder, data);
}
