export default async function (fastify) {
  fastify.addHook('onRequest', async (request, reply) => {
    if (request.url === '/api') {
      console.log('Intercepted.');
    }
  });
}
