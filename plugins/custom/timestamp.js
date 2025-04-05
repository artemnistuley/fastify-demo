import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.decorate('timestamp', function() {
    return Date.now();
  });
}, {
  name: 'timestamp'
});
