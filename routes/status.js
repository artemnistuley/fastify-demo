import { readFileSync } from 'node:fs';
import path from 'node:path';
import S from 'fluent-json-schema';

const { version } = JSON.parse(readFileSync(path.join(import.meta.dirname, '../package.json')));

async function status(fastify) {
  fastify.route({
    method: 'GET',
    path: '/status',
    handler: onStatus,
    schema: {
      description: 'Return status and version of the app',
      response: {
        200: S.object()
          .prop('status', S.string())
          .prop('version', S.string())
      },
    }
  });
};

async function onStatus(req, reply) {
  return { status: 'ok', version };
}

export default status;
