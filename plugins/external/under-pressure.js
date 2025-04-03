import fastifyUnderPressure from '@fastify/under-pressure';
import fp from 'fastify-plugin';

export const autoConfig = () => {
  return {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 100_000_000,
    maxRssBytes: 1_000_000_000,
    maxEventLoopUtilization: 0.98,
    message: 'The server is under pressure, retry later!',
    retryAfter: 50,
  };
};

export default fp(fastifyUnderPressure);
