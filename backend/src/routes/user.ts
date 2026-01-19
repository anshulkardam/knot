import type { FastifyInstance } from 'fastify';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { authorizeUser } from '../middlewares/authorizeUser.js';
import getCurrentUser from '../controllers/user/getCurrentUser.js';
import deleteCurrentUser from '../controllers/user/deleteCurrentUser.js';
import updateCurrentUser from '../controllers/user/updateCurrentUser.js';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/current',
    {
      preHandler: [authenticateUser, authorizeUser(['user', 'admin'])],
    },
    getCurrentUser,
  );

  fastify.delete(
    '/current',
    {
      preHandler: [authenticateUser, authorizeUser(['user', 'admin'])],
    },

    deleteCurrentUser,
  );

  fastify.patch(
    '/current',
    {
      preHandler: [authenticateUser, authorizeUser(['user', 'admin'])],
    },
    updateCurrentUser,
  );
}
