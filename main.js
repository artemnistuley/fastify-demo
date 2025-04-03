import fastify from 'fastify';
import fp from 'fastify-plugin';
import closeWithGrace from 'close-with-grace';
import createApp from './app.js';

const getLoggerOptions = () => {
  if (process.stdout.isTTY) {
    return {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        }
      }
    }
  }

  return { level: process.env.LOG_LEVEL ?? 'silent' };
};

const app = fastify({
  logger: getLoggerOptions(),
  ajv: {
    customOptions: {
      coerceTypes: 'array',
      removeAdditional: 'all',
    }
  },
});

const init = async () => {
  app.register(fp(createApp));

  closeWithGrace(
    { delay: process.env.FASTIFY_CLOSE_GRACE_DELAY ?? 500 },
    async ({ err }) => {
      if (err != null) app.log.error(err);
      await app.close();
    }
  );

  await app.ready();
  
  try {
    await app.listen({ port: process.env.PORT ?? 8000 });
  } catch(err) {
    app.log.error(err);
    process.exit(1);
  }
};

init();
