import type { FastifyRequest, FastifyReply } from 'fastify';
import Link from '../../models/link.js';
import { CustomError } from '../../utils/CustomError.js';

export async function redirect(request: FastifyRequest, reply: FastifyReply) {
  const { code } = request.params as { code: string };

  const link = await Link.findOne({ code, isActive: true })
    .select('destination')
    .exec();

  if (!link) {
    throw new CustomError('Link not found', 404, 'NotFound');
  }

  Link.updateOne({ code }, { $inc: { totalVisitCount: 1 } }).exec();

  return reply.redirect(
    link.destination.startsWith('http')
      ? link.destination
      : `https://${link.destination}`,
  );
}
