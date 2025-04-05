import S from 'fluent-json-schema';

const movies = async (fastify) => {
  fastify.get('/', 
    {
      schema: {
        description: 'Get all movies',
        response: {
          200: S.object()
            .prop('status', S.string())
            .prop('movies', S.array().items(
              S.object()
                .prop('title', S.string())
                .prop('year', S.integer())
          )),
        },
        tags: ['Movies'],
      },
    },
    async function(req, reply) {
      const movies = [
        { title: 'The Godfather', year: 1972 }, 
        { title: 'Goodfellas', year: 1990 },
      ];

      return {
        status: 'ok',
        movies,
      };
    },
  );
};

export default movies;
