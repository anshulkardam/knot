import { FastifyReply, FastifyRequest } from 'fastify';
import LinkTree from '../../models/tree.js';
import { CustomError } from '../../utils/CustomError.js';

export async function getPublicPage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { username } = request.params as { username: string };

  const page = await LinkTree.findOne({
    username: username.toLowerCase(),
    isActive: true,
  }).lean();

  if (!page) {
    throw new CustomError('Page not found', 404, 'NotFound');
  }

  reply.send(page);
}
