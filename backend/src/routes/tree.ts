import type { FastifyInstance } from 'fastify';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { createPage } from '../controllers/tree/createPage.js';
import { updatePage } from '../controllers/tree/updatePage.js';
import { getPage } from '../controllers/tree/getPage.js';
import { getPublicPage } from '../controllers/tree/getPublicTree.js';

export async function linkTreeRoutes(fastify: FastifyInstance) {
  fastify.post('/', { preHandler: authenticateUser }, createPage);

  fastify.get('/me', { preHandler: authenticateUser }, getPage);

  fastify.get('/public/:username', getPublicPage);

  fastify.patch('/:pageId', { preHandler: authenticateUser }, updatePage);
}
