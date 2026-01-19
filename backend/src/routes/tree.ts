import type { FastifyInstance } from 'fastify';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { createPage } from '../controllers/tree/createPage.js';
import { getMyPages } from '../controllers/tree/getMyPages.js';
import { addItem } from '../controllers/tree/addItem.js';
import { updateItem } from '../controllers/tree/updateItem.js';
import { deleteItem } from '../controllers/tree/deleteItem.js';

export async function linkTreeRoutes(fastify: FastifyInstance) {
  fastify.post('/pages', { preHandler: authenticateUser }, createPage);

  fastify.get('/pages/me', { preHandler: authenticateUser }, getMyPages);

  fastify.post(
    '/pages/:pageId/items',
    { preHandler: authenticateUser },
    addItem,
  );

  fastify.patch(
    '/pages/items/:itemId',
    { preHandler: authenticateUser },
    updateItem,
  );

  fastify.delete(
    '/pages/items/:itemId',
    { preHandler: authenticateUser },
    deleteItem,
  );
}
