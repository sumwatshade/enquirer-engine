import { ISurveySchema, IEngineOptions, EnquirerEngine, IEngineOutput } from '../../src'

import enquirer from 'enquirer';
import { mocked } from 'ts-jest/utils';
import * as uuid from 'uuid'
import mockdate from 'mockdate'

jest.mock('enquirer', () => ({
    prompt: jest.fn()
}));

jest.mock('uuid')

const mockEnquirer = mocked(enquirer, true);
const mockUuid = mocked(uuid, true);

describe("Engine", () => {
    let surveySchema: ISurveySchema, engineOptions: IEngineOptions

    beforeEach(() => {

        mockdate.set(1434320025275)

        engineOptions = {
            outputFormat: 'json-raw',
            userId: 'test-user'
        }

        surveySchema = {
            id: 'my-test-schema',
            createdAt: new Date('2020-04-04').toDateString(),
            prompts: [{
                type: 'scale',
                name: "my-prompt",
                margin: [0, 1, 1, 2],
                message: "This is my prompt",
                scale: [
                    { "name": "1", "message": "Super gross!" },
                    { "name": "2", "message": "Kinda gross." },
                    { "name": "3", "message": "This would be alright." },
                    { "name": "4", "message": "Oh I want this." },
                    { "name": "5", "message": "I NEEEED IT!" }
                ],
                choices: [
                    {
                        "name": "inout",
                        "message": "In N Out"
                    },
                    {
                        "name": "tacobell",
                        "message": "Taco Bell"
                    },
                    {
                        "name": "pizza",
                        "message": "Howie's Artisan Pizza"
                    }
                ]
            }, {
                type: 'scale',
                name: "my-prompt-2",
                margin: [0, 1, 1, 2],
                message: "This is my prompt",
                scale: [
                    { "name": "1", "message": "Super gross!" },
                    { "name": "2", "message": "Kinda gross." },
                    { "name": "3", "message": "This would be alright." },
                    { "name": "4", "message": "Oh I want this." },
                    { "name": "5", "message": "I NEEEED IT!" }
                ],
                choices: [
                    {
                        "name": "inout2",
                        "message": "In N Out"
                    },
                    {
                        "name": "tacobell2",
                        "message": "Taco Bell"
                    },
                    {
                        "name": "pizza2",
                        "message": "Howie's Artisan Pizza"
                    }
                ]
            }]
        }

        mockEnquirer.prompt.mockResolvedValue({
            'my-prompt': {
                tacobell: 2,
                pizza: 1,
                inout: 3
            },
            'my-prompt-2': {
                tacobell2: 2,
                pizza2: 1,
                inout2: 3
            }
        })

    });

    afterEach(() => {
        mockdate.reset()
    })

    it("Will run a scale-based survey", async () => {
        const engine = new EnquirerEngine(engineOptions);

        const result: IEngineOutput = (await engine.run(surveySchema)) as IEngineOutput

        

        expect(result.id).toBe(surveySchema.id)
        expect(result.userId).toBe(engineOptions.userId)
        expect(result).toMatchSnapshot()
        expect(result.results.map(r => r.id)).toMatchObject(["tacobell", "pizza", "inout", "tacobell2", "pizza2", "inout2"])

    });
    it("Will default a user ID if none are provided", async () => {
        delete engineOptions.userId;
        
        mockUuid.v4.mockReturnValue('hashValue')
        
        const engine = new EnquirerEngine(engineOptions);
        
        const result: IEngineOutput = await engine.run(surveySchema) as IEngineOutput
        
        expect(result.id).toBe(surveySchema.id)
        expect(result.userId).toBe("hashValue") 
        expect(result).toMatchSnapshot()
    });
    
    it("Will output JSON", async () => {
        engineOptions.outputFormat = "json";
        
        const engine = new EnquirerEngine(engineOptions);
        
        const result: string = await engine.run(surveySchema) as string
        
        const parsedResult = JSON.parse(result);
        expect(parsedResult.id).toBe(surveySchema.id)
        expect(parsedResult.userId).toBe(engineOptions.userId)
        
        expect(result).toMatchSnapshot()
    });
    
    it("will default to raw json if no output is provided", async () => {
        engineOptions.outputFormat = undefined;
        const engine = new EnquirerEngine(engineOptions);

        const result: IEngineOutput = await engine.run(surveySchema) as IEngineOutput

        expect(result.id).toBe(surveySchema.id)
        expect(result.userId).toBe(engineOptions.userId)
        expect(result).toMatchSnapshot()

    });

    it("will return a null value if prompt exits poorly", async () => {
        mockEnquirer.prompt.mockRejectedValue(new Error('test'))
        const engine = new EnquirerEngine(engineOptions);

        const result = await engine.run(surveySchema)

        expect(result).toBe(null)

    })

    it("Will output CSV", async () => {
        engineOptions.outputFormat = "csv";
        
        const engine = new EnquirerEngine(engineOptions);
        
        const result: string = await engine.run(surveySchema) as string

        expect(result).toMatchSnapshot()
    });
})