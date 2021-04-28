export interface IPromptSchema {
    type: "scale";
    name: string;
    message: string;
    [key: string]: any;
}

export interface ISurveySchema {
    id: string;
    createdAt: Date | string;
    prompts: IPromptSchema[]
}