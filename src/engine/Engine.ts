import { prompt } from 'enquirer'
import { convertToOutput } from './OutputAdapter'
import { ISurveySchema } from 'src/types'
import { SurveyPromptOutput, IEngineOutput } from 'src/types/IEngineOutput'

interface IEngineOptions {
  outputFormat: 'json' | 'csv' | 'json-raw' | undefined,
}

export class EnquirerEngine {
  constructor(private readonly options: IEngineOptions) {}

  async run(settingsJson: ISurveySchema):Promise<string | IEngineOutput> {
    const { id, prompts } = settingsJson
    const surveyResults:Array<SurveyPromptOutput> = prompts.forEach(async promptSettings => {
      return await prompt(promptSettings)
    })

    console.log('HERES THE GOODS: ', surveyResults)

    // const engineOutput = await prompt(surveySettings: )
    // engineOutput.id = surveyId
    const engineOutput:IEngineOutput = {
      id,
      userId: 'sailor moon',
      respondedAt: new Date(),
      results: surveyResults
    }

    const format = this.options?.outputFormat
    return convertToOutput({
      engineOutput,
      format
    })
  }
}

export default EnquirerEngine
