import type { FastifyRequest, FastifyReply } from 'fastify';
import LinkTree from '../../models/tree.js';

export async function getPage(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.userId!;

  const page = await LinkTree.findOne({ creator: userId });

  if (!page) {
    reply.code(200).send(null);
    return;
  }

  reply.code(200).send(page);
}
