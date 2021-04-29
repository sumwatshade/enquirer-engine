import { validateSurvey } from "../../src/validator/validator";
import testSurvey from "../schema/scale-survey.json";

const missingPromptsExample = {
  id: "survey-lunch-1",
  createdAt: "2021-04-28",
};

const additionalPropertiesExample = { ...testSurvey, test: "example" };

describe("Validator", () => {
  beforeEach(() => {});
  it("should return isValid as true if survey is valid ", async () => {
    const result = validateSurvey(testSurvey);

    expect(result.isValid).toBe(true);
  });

  it("should return isValid as false if missing a required property ", async () => {
    const result = validateSurvey(missingPromptsExample);

    expect(result).toStrictEqual({
      isValid: false,
      errors: [
        {
          instancePath: "",
          schemaPath: "#/required",
          keyword: "required",
          params: { missingProperty: "prompts" },
          message: "must have required property 'prompts'",
        },
      ],
    });
  });

  it("should return isValid as false if it has additional properties ", async () => {
    const result = validateSurvey(additionalPropertiesExample);

    expect(result).toStrictEqual({
      isValid: false,
      errors: [
        {
          instancePath: "",
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: "test" },
          message: "must NOT have additional properties",
        },
      ],
    });
  });
});
