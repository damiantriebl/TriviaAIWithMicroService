// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports
import * as dotenv from 'dotenv';

dotenv.config({ path: './env.test' });

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
};
