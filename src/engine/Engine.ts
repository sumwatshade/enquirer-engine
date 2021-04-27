const { prompt } = require('enquirer')

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

    const response = await prompt(surveySettings)
    return response
  }
}
