import Ajv, { JSONSchemaType } from "ajv";
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

export const validate = (jsonBlob: any) => {
  // TODO: add schema
  ajv.addSchema(placeholderSchema, "placholderSchema");
  const validateJson = ajv.compile(placeholderSchema);
  const isValid = validateJson(jsonBlob);

  if (isValid) {
    return isValid;
  } else {
    return validateJson.errors;
  }
};
