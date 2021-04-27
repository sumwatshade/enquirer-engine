interface SurveyPromptOutput {
    id: string;
    choice: 1 | 2 | 3 | 4 | 5
}

export interface IEngineOutput {
    id: string;
    userId: string;
    respondedAt: Date;
    results: SurveyPromptOutput[]
}