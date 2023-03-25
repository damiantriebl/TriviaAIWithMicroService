import { secretManagerClient } from '../__mocks__/secretManagerClient';
import { OpenAIApi } from '../__mocks__/OpenAIApi';
import { handler } from '../src/chatHandler';
import { config } from '../src/config';

jest.mock('@aws-sdk/client-secrets-manager', () => ({
  ...jest.requireActual('@aws-sdk/client-secrets-manager') as any,
  ...{
    SecretsManagerClient: jest.fn().mockImplementation(() => { return secretManagerClient })
  }
}));
jest.mock('openai', () => ({
  ...{
    Configuration: jest.fn(),
    OpenAIApi: jest.fn().mockImplementation(() => { return OpenAIApi })
  }
}));

describe('Chat GPT handler Lambda function', () => {
  beforeAll(() => {
    secretManagerClient.send.mockReturnValue({
      SecretString: JSON.stringify({
        OPENAI_API_KEY: 'OPENAI_API_KEY_VALUE',
      }),
    })
  });

  it('Send a message to chat GPT successfully', async () => {
    // Given
    const requestEvent = {
      headers: { model: config.COMPLETION_MODELS[0] },
      body: 'cuantos carbos hay en 3 bananas y un pote de helado de dulce de leche?'
    };

    //When
    const result = await handler(requestEvent);

    //Then
    expect(result.statusCode).toBe(200);
  });

  it('Empty request body error', async () => {
    // Given
    const requestEvent = {};

    //When
    const result = await handler(requestEvent);

    //Then
    expect(result.statusCode).toBe(400);
  });
});
