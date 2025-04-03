import path from 'node:path';
import fastifyAutoload from '@fastify/autoload';

export const options = {
  ajv: {
    customOptions: {
      coerceTypes: 'array',
      removeAdditional: 'all',
    }
  }
};

export default async function createApp(fastify, opts) {
  delete opts.skipOverride;

  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'plugins/external'),
    options: { ...opts },
  });

  fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'plugins/custom'),
    options: { ...opts },
  });

  fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'routes'),
    autoHooks: true,
    cascadeHooks: true,
    dirNameRoutePrefix: true,
    options: { ...opts },
  });
  
  fastify.setErrorHandler((err, request, reply) => {
    fastify.log.error({
      err,
      request: {
        method: request.method,
        url: request.url,
        query: request.query,
        params: request.params,
      }
    }, 'Unhandled error');

    reply.code(err.statusCode ?? 500);

    let message = 'Internal Server Error';
    if (err.statusCode && err.statusCode < 500) {
      message = err.message;
    }

    return { message };
  });

  fastify.setNotFoundHandler(
    {
      preHandler: fastify.rateLimit({
        max: 3,
        timeWindow: 500
      }),
    },
    (request, reply) => {
      request.log.warn(
        {
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params,
          }
        },
        'Resource not found'
      );

      reply.code(404);

      return { message: 'Not Found' };
    }
  );
}
