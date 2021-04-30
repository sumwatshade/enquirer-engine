import { convertToOutput } from '../../src/engine';
import { IEngineOutput } from '../../src/types';
import outdent from 'outdent';

describe("Output Adapter", () => {
    let sampleOutput: IEngineOutput;
    beforeEach(() => {
        sampleOutput = {
            id: 'test-survey',
            userId: 'test-user',
            respondedAt: new Date('2021-02-04').toISOString(),
            results: [
                {
                    id: 'q1',
                    choice: 3
                },
                {
                    id: 'q2',
                    choice: 2
                }
            ]
        }
    })
    it("should throw an error if inappropriate adapter format is provided", async () => {
        let error;

        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            await convertToOutput({ engineOutput: sampleOutput, format: 'bad'})
        } catch(e) {
            error = e;
        }

        expect(error.message).toBe("Invalid format provided: 'bad'. Please specify 'json' or 'csv'")
        
    })
    it("can return raw JSON", async () => {
        const output = await convertToOutput({ engineOutput: sampleOutput, format: 'json-raw'})

        expect(output).toStrictEqual(sampleOutput)
    })
    it("returns raw JSON if no output type is specified", async () => {
        const output = await convertToOutput({ engineOutput: sampleOutput})

        expect(output).toStrictEqual(sampleOutput)
    })
    it("can return JSON string", async () => {
        const output = await convertToOutput({ engineOutput: sampleOutput, format: 'json'})
        expect(output).toStrictEqual(JSON.stringify(sampleOutput))
    })
    it("can return CSV format", async () => {
        const output = await convertToOutput({ engineOutput: sampleOutput, format: 'csv'})
        expect(output).toStrictEqual(outdent`
        # Survey ID: test-survey
        # Responded at: 2021-02-04T00:00:00.000Z
        # User: test-user
        promptId, result
        q1, 3
        q2, 2
        `)
    })
})