export interface IPromptSchema {
    type: "scale";
    margin: [0, 0, 2, 1];
    name: string;
    message: string;
    scale: IScaleSchema[];
    choices: IChoicesSchema[];
    [key: string]: any;
}

export interface IScaleSchema {
    name: string;
    message: string;
}

export interface IChoicesSchema {
    name: string;
    message: string;
}

export interface ISurveySchema {
    id: string;
    createdAt: Date | string;
    prompts: IPromptSchema[]
}
