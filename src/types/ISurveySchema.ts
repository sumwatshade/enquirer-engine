export interface IPromptSchema {
    type: "scale";
    margin: [number, number, number, number];
    name: string;
    message: string;
    scale: IScaleSchema[];
    choices: IChoicesSchema[];
}

export interface IScaleSchema {
    name: string;
    message: string;
}

export interface IChoicesSchema {
    name: string;
    message: string;
    initial?: number;
}

export interface ISurveySchema {
    id: string;
    createdAt: Date | string;
    prompts: IPromptSchema[]
}
