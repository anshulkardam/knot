import type { FastifyInstance } from 'fastify';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { authorizeUser } from '../middlewares/authorizeUser.js';
import { validateBody } from '../middlewares/validator.js';
import {
  genLinkSchema,
  updateLinkSchema,
} from '../validators/link.validator.js';
import { getMyLinks } from '../controllers/link/getAllLinks.js';
import { updateLink } from '../controllers/link/updateLinkbyId.js';
import { deleteLink } from '../controllers/link/deleteLinkbyId.js';
import { createLink } from '../controllers/link/createShortLink.js';

export async function linkRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/generate',
    {
      preHandler: [
        authenticateUser,
        authorizeUser(['user', 'admin']),
        validateBody(genLinkSchema),
      ],
    },
    createLink,
  );

  fastify.get(
    '/my-links',
    {
      preHandler: [authenticateUser, authorizeUser(['user', 'admin'])],
    },
    getMyLinks,
  );

  fastify.patch(
    '/:linkId',
    {
      preHandler: [
        authenticateUser,
        authorizeUser(['user', 'admin']),
        validateBody(updateLinkSchema),
      ],
    },
    updateLink,
  );

  fastify.delete(
    '/:linkId',
    {
      preHandler: [authenticateUser, authorizeUser(['user', 'admin'])],
    },
    deleteLink,
  );
}
