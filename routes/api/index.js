export default async function (fastify) {
  fastify.get('/', ({ protocol, hostname, port }) => {
    return {
      message: `See documentation at ${protocol}://${hostname}:${port}/api/docs`
    };
  });
}
