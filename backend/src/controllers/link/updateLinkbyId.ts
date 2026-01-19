import type { FastifyRequest, FastifyReply } from 'fastify';
import Link from '../../models/link.js';
import { CustomError } from '../../utils/CustomError.js';

export async function updateLink(request: FastifyRequest, reply: FastifyReply) {
  const { linkId } = request.params as { linkId: string };
  const userId = request.userId!;
  const { title, destination } = request.body as {
    title?: string;
    destination?: string;
  };

  const link = await Link.findOne({ _id: linkId, creator: userId });
  if (!link) {
    throw new CustomError('Link not found or unauthorized', 404, 'NotFound');
  }

  if (title) link.title = title;
  if (destination) link.destination = destination;

  await link.save();

  reply.send(204);
}
