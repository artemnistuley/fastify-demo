import fp from 'fastify-plugin';

const exampleFunc = () => 1;

export default fp(async (fastify) => {
  fastify.decorate('example', 'example');
  fastify.decorate('exampleFunc', exampleFunc);
}, {
  name: 'example'
});
