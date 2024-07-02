import Fastify from 'fastify';
import { router } from './router.js';

const makeServer = () => {
  const server = Fastify();

  server.register(router);

  return server;
};

export { makeServer };
