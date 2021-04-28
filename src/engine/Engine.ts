import { prompt } from 'enquirer'
import convertToOutput from './OutputAdapter'

interface settingsJsonTypes {
  id: string,
  type: string,
  properties: object
}

class Engine {
  constructor(options: object) {
    this.options = options
  }

  run(settingsJson: settingsJsonTypes) {
    const { surveyId: string, surveyType: string, surveySettings: object } = settingsJson.properties

    const engineOutput = await prompt(surveySettings)
    const format = this.options?.outputFormat
    return convertToOutput({
      engineOutput,
      format
    })
  }
}

export default Engine
