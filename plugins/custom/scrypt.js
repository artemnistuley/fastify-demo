import fp from 'fastify-plugin';
import crypto from 'node:crypto';

const hash = (password) => {
  const salt = crypto.randomBytes(16).toString('base64');
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, result) => {
      if (err) reject(err);
      resolve(salt + ':' + result.toString('base64'));
    });
  });
};

export default fp(async (fastify) => {
  fastify.decorate('hash', hash);
}, {
  name: 'scrypt'
});
