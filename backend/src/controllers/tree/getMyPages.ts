import type { FastifyRequest, FastifyReply } from 'fastify';
import LinkTree from '../../models/tree.js';

export async function getMyPages(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.userId;

  const pages = await LinkTree.find({
    creator: userId,
  })
    .sort({ createdAt: -1 })
    .lean();

  reply.send({ pages });
}
