import type { FastifyRequest, FastifyReply } from 'fastify';
import { redis } from '../../lib/redis.js';
import Link from '../../models/link.js';
import { CustomError } from '../../utils/CustomError.js';

export async function redirect(request: FastifyRequest, reply: FastifyReply) {
  const { code } = request.params as { code: string };

  // try cache first
  const cachedDestination = await redis.get(`link:${code}`);
  if (cachedDestination) {
    // async click count
    redis.incr(`link:clicks:${code}`);
    return reply.redirect(cachedDestination);
  }

  // DB fallback
  const link = await Link.findOne({
    code,
    isActive: true,
  })
    .select('destination')
    .lean();

  if (!link) {
    throw new CustomError('Link not found', 404, 'NotFound');
  }

  // set cache
  await redis.set(`link:${code}`, link.destination);

  // Increment clicks (async)
  redis.incr(`link:clicks:${code}`);

  return reply.redirect(
    link.destination.startsWith('http')
      ? link.destination
      : `https://${link.destination}`,
  );
}
