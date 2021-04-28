import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
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

export const validate = (
  validator: ValidateFunction<PlaceholderData>,
  data: any
) => {
  const isValid = validator(data);

  if (isValid) {
    return isValid;
  } else {
    return validator.errors;
  }
};

export const validatePrompt = function (data: any) {
  return validate(validatorPlaceholder, data);
};

export const validateSurvey = function (data: any) {
  return validate(validatorPlaceholder, data);
};

export const validateInput = function (data: any) {
  return validate(validatorPlaceholder, data);
};
