import fastifyRateLimit from '@fastify/rate-limit';

export const autoConfig = (fastify) => {
  return {
    max: fastify.config.RATE_LIMIT_MAX,
    timeWindow: '1 minute',
    allowList: ['127.0.0.1'], // no rate limit in our machine
  };
};

export default fastifyRateLimit;
