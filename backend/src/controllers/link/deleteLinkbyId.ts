import type { FastifyRequest, FastifyReply } from 'fastify';
import Link from '../../models/link.js';
import { CustomError } from '../../utils/CustomError.js';

export async function deleteLink(request: FastifyRequest, reply: FastifyReply) {
  const { linkId } = request.params as { linkId: string };
  const userId = request.userId!;

  const link = await Link.findOne({ _id: linkId, creator: userId });
  if (!link) {
    throw new CustomError('Link not found or unauthorized', 404, 'NotFound');
  }

  link.isActive = false; //soft disabling for now
  await link.save();

  reply.send(204);
}
