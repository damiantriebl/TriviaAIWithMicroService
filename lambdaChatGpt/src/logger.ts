import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  format: format.json(),
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new transports.Console(),
  ],
});
