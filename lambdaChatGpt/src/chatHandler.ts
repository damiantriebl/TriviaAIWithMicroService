/* eslint-disable camelcase */
/* eslint-disable max-len */
import { Handler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Configuration, OpenAIApi } from 'openai';
import { logger } from './logger';

const MODEL_HEADER_NAME = 'model';

interface message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
interface dialog {
  prompt: string,
  context: message[],
  role: 'user' | 'assistant' | 'system',
  temperature?: number,
  max_tokens?: number,
  top_p?:number,
  frequency_penalty?: number,
  presence_penalty?: number

}
export const handler: Handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  logger.debug('Starting OpenAI API');
  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);
  console.log(`EVENT (el evento): \n${JSON.stringify(event, null, 2)}`);

  try {
    logger.debug(`Calling createCompletion - model: ${event.headers[MODEL_HEADER_NAME]}`);
    const {
      prompt, context, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, role,
    } = JSON.parse(event.body) as dialog;

    const messages: message[] = context ? [...context, { role, content: JSON.stringify(prompt) }] : [{ role, content: prompt }];
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: temperature || 0,
      max_tokens: max_tokens || 100,
      top_p: top_p || 1,
      frequency_penalty: frequency_penalty || 0,
      presence_penalty: presence_penalty || 0,
    });
    if (response.data.choices[0].message) {
      messages.push(response.data.choices[0].message);
      return {
        statusCode: 200,
        body: JSON.stringify(response.data.choices[0].message),
      };
    }
  } catch (error) {
    let errorMessage;
    if (error.response) {
      logger.error(error.response.status);
      logger.error(error.response.data);
      errorMessage = error.response.data;
    } else {
      logger.error(error.message);
      errorMessage = error.message;
    }
    return {
      statusCode: 500,
      body: errorMessage,
    };
  }
  return {
    statusCode: 300,
    body: JSON.stringify({ message: 'Error' }),
  };
};
