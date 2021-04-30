import { IEngineOutput } from '../types'

interface IOutputAdapterProps {
    format?: 'json' | 'csv' | 'json-raw';
    engineOutput: IEngineOutput;
}

export const convertToOutput = async ({engineOutput, format}: IOutputAdapterProps): Promise<string | IEngineOutput> => {
    if(format === "json-raw" || !format) {
        return engineOutput;
    } else if(format === "json") {
        return JSON.stringify(engineOutput);
    } else if(format === "csv") {
        // Add comments for survey metadata
        return [
            `# Survey ID: ${engineOutput.id}`,
            `# Responded at: ${engineOutput.respondedAt}`,
            `# User: ${engineOutput.userId}`,
            `promptId, result`
        ].concat(engineOutput.results.map(result => `${result.id}, ${result.choice}`)).join('\n');
    } else {
        throw new Error(`Invalid format provided: '${format}'. Please specify 'json' or 'csv'`)
    }
}

