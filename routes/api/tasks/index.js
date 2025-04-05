import S from 'fluent-json-schema';

const tasks = async (fastify) => {
  fastify.route({
    method: 'GET',
    path: '/',
    handler: onGetTasks,
    schema: {
      description: 'Get all tasks',
      response: {
        200: S.object()
          .prop('status', S.string())
          .prop('tasks', S.array().items(
            S.object()
              .prop('title', S.string())
              .prop('done', S.boolean())
        )),
      },
      tags: ['Tasks']
    },
  });

  async function onGetTasks(req, reply) {
    const tasks = [
      { title: 'Task 1', done: true }, 
      { title: 'Task 2', done: false },
    ];

    return { status: 'ok', tasks };
  }

  fastify.route({
    method: 'POST',
    path: '/timestamp',
    handler: onTimestamp,
    schema: {
      description: 'Get timestamp',
      response: {
        200: S.object()
          .prop('status', S.string())
          .prop('timestamp', S.integer()),
        400: S.object()
          .prop('message', S.string()),
      },
      tags: ['Tasks']
    },
  });

  async function onTimestamp(req, reply) {
    if (req.body.error) {
      reply.status(400);
      return { message: 'Something went wrong' };
    }

    return { status: 'ok', timestamp: this.timestamp() };
  }
};

export default tasks;
