export interface SurveyPromptOutput {
    id: string;
    choice: number;
}

export interface IEngineOutput {
    id: string;
    userId: string;
    respondedAt: string;
    results: SurveyPromptOutput[]
}

export interface IEngineOptions {
  /** Format requested by the consumer of this service */
  outputFormat: 'json' | 'csv' | 'json-raw' | undefined,
  /** A unique user ID **NOTE**: will default to a UUID if no user id is found */
  userId ?: string
}
