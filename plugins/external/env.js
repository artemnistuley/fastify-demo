import env from '@fastify/env';

const schema = {
  type: 'object',
  required: [
    'NODE_ENV',
  ],
  properties: {
    RATE_LIMIT_MAX: {
      type: 'number',
      default: 100 // Put it to 4 in your .env file for tests
    },
  }
};

export const autoConfig = {
  confKey: 'config',
  schema,
  dotenv: true,
  // or
  // dotenv: {
  //   path: `${import.meta.dirname}/.env`,
  //   debug: true
  // }
  data: process.env,
};

export default env;
