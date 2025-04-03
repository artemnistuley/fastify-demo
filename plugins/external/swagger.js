import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

export default fp(async function (fastify) {
  await fastify.register(fastifySwagger, {
    hideUntagged: true,
    openapi: {
      info: {
        title: 'Fastify demo',
        description: 'Fastify demo API docs',
        version: '1.0.0',
      }
    }
  });

  await fastify.register(fastifySwaggerUI, {
    routePrefix: '/api/docs'
  });
});
