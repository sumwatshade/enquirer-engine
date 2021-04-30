import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import { ISurveySchema, IValidatorOutput } from "../types";
const ajv = new Ajv({ allErrors: true });

const surveySchema: JSONSchemaType<ISurveySchema> = {
  type: "object",
  properties: {
    id: { type: "string" },
    createdAt: { type: "string" },
    prompts: { type: "array", items: { type: "object", required: ["type", "name", "message", "scale"] } },
  },
  required: ["id", "createdAt", "prompts"],
  additionalProperties: false,
};

ajv.addSchema(surveySchema, "surveySchema");

/* eslint-disable @typescript-eslint/no-explicit-any */
const surveyValidator = ajv.compile(surveySchema);
const validate = (
  validator: ValidateFunction<ISurveySchema>,
  data: any
): IValidatorOutput => {
  const isValid = validator(data);
  const errors = validator.errors ?? [];

  return isValid
    ? {
        isValid,
      }
    : {
        isValid,
        errors,
      };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validateSurvey = (data: any): IValidatorOutput => {
  return validate(surveyValidator, data);
};
/* eslint-enable @typescript-eslint/no-explicit-any */
