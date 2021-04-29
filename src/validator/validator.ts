import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import { ISurveySchema, IValidatorOutput } from "src/types";
const ajv = new Ajv({ allErrors: true });

const surveySchema: JSONSchemaType<ISurveySchema> = {
  type: "object",
  required: ["id", "createdAt", "prompts"],
  additionalProperties: false,
};

ajv.addSchema(surveySchema, "surveySchema");

const validatorPlaceholder = ajv.compile(surveySchema);

const validate = (
  validator: ValidateFunction<ISurveySchema>,
  data: any
): IValidatorOutput => {
  const isValid = validator(data);
  const errors = validator?.errors ?? [];

  if (isValid) {
    return {
      isValid,
    };
  } else {
    return {
      isValid,
      errors,
    };
  }
};

export const validateSurvey = (data: any): IValidatorOutput => {
  return validate(validatorPlaceholder, data);
};
