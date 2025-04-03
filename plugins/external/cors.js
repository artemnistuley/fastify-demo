import cors from '@fastify/cors';

export const autoConfig = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: true,
};

export default cors;
