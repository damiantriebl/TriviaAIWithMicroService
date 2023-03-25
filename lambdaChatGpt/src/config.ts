export const config = {
  REGION: process.env.REGION,
  SECRETS_ARN: process.env.SECRETS_ARN,
  LOG_LEVEL: process.env.LOG_LEVEL,
  TIMEOUT: process.env.TIMEOUT,
  COMPLETION_MODELS: ['text-davinci-003', 'gpt-3.5-turbo', 'code-davinci-002'],
  CHAT_MODEL: 'gpt-3.5-turbo',
};
