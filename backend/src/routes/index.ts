import { FastifyInstance } from 'fastify';
import { authRoutes } from './auth.js';
import { userRoutes } from './user.js';
import { linkRoutes } from './link.js';
import { redirectRoutes } from './redirect.js';


export const v1Routes = async (fastify: FastifyInstance) => {
  fastify.get('/', (_req, res) => {
    return res.status(200).send({
      message: 'KnotAPI is live',
      status: 'ok',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  fastify.register(authRoutes, { prefix: '/auth' });

  fastify.register(userRoutes, { prefix: '/user' });

  fastify.register(linkRoutes, { prefix: '/link' });

  fastify.register(redirectRoutes);
};
