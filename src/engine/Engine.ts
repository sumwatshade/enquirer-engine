import { prompt } from 'enquirer'
import { convertToOutput } from './OutputAdapter'
import { ISurveySchema } from '../types'
import { SurveyPromptOutput, IEngineOutput, IEngineOptions } from '../types'
import * as uuid from 'uuid';

export class EnquirerEngine {
  constructor(private readonly options: IEngineOptions) {}

  async run(surveySettings: ISurveySchema): Promise<string | IEngineOutput | null> {
    const { id, prompts } = surveySettings;
    const surveyResults: Array<SurveyPromptOutput> = [];
    
      let result: Record<string, Record<string, number>>;
      try {
        result = await prompt(prompts)
      } catch(e) {
        return null;
      }
      const parsedResults: SurveyPromptOutput[] = Object.values(result).reduce((acc: SurveyPromptOutput[], next: Record<string, number>) => {
        return [...acc, ...Object.keys(next).map(id => ({id, choice: next[id]}))]
      }, [])
      surveyResults.push(...parsedResults)

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
