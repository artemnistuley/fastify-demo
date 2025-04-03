import fastifyStatic from '@fastify/static';
import path from 'node:path';

const staticPath = path.join(import.meta.dirname, '../..', 'static');

export const autoConfig = {
  root: staticPath,
  wildcard: true,
};

export default fastifyStatic;
