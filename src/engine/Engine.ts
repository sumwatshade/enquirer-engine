import { prompt } from 'enquirer'
import { convertToOutput } from './OutputAdapter'
import { ISurveySchema } from 'src/types'
import { SurveyPromptOutput, IEngineOutput, IEngineOptions } from 'src/types'
import * as uuid from 'uuid';

export class EnquirerEngine {
  constructor(private readonly options: IEngineOptions) {}

  async run(surveySettings: ISurveySchema): Promise<string | IEngineOutput> {
    const { id, prompts } = surveySettings;
    const surveyResults: Array<SurveyPromptOutput> = [];
    
    prompts.forEach(async promptSettings => {
      const result: Record<string, number> = await prompt(promptSettings)
      const parsedResults: SurveyPromptOutput[] = Object.keys(result).map(r => ({ id: r, choice: result[r]}))
      surveyResults.push(...parsedResults)
    })

    const engineOutput: IEngineOutput = {
      id,
      userId: this.options.userId || uuid.v4(),
      respondedAt: new Date().toISOString(),
      results: surveyResults
    }

    return convertToOutput({
      engineOutput,
      format: this.options.outputFormat
    })
  }
}

export default EnquirerEngine
