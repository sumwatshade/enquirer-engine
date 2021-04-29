import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import { ISurveySchema, IValidatorOutput } from "src/types";
const ajv = new Ajv({ allErrors: true });

const surveySchema: JSONSchemaType<ISurveySchema> = {
  type: "object",
  properties: {
    id: { type: "string" },
    createdAt: { type: "string" },
    prompts: { type: "array", items: { type: "object" } },
  },
  required: ["id", "createdAt", "prompts"],
  additionalProperties: false,
};

ajv.addSchema(surveySchema, "surveySchema");

const surveyValidator = ajv.compile(surveySchema);
const validate = (
  validator: ValidateFunction<ISurveySchema>,
  data: any
): IValidatorOutput => {
  const isValid = validator(data);
  const errors = validator?.errors ?? [];

  return isValid
    ? {
        isValid,
      }
    : {
        isValid,
        errors,
      };
};

export const validateSurvey = (data: any): IValidatorOutput => {
  return validate(surveyValidator, data);
};
