import type { FastifyRequest, FastifyReply } from 'fastify';
import Link from '../models/link.js';
import { CustomError } from '../utils/CustomError.js';
import { redis } from '../lib/redis.js';

export async function getLinkStats(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { code } = request.params as { code: string };

  const link = await Link.findOne({
    code,
    isActive: true,
  })
    .select('title destination totalVisitCount')
    .lean();

  if (!link) {
    throw new CustomError('Link not found', 404, 'NotFound');
  }

  // Get live clicks from Redis (if exists)
  let liveClicks = 0;
  try {
    const cachedClicks = await redis.get(`link:clicks:${code}`);
    if (cachedClicks) {
      liveClicks = Number(cachedClicks);
    }
  } catch {
    // Redis down? Ignore.
  }

  reply.send({
    code,
    title: link.title,
    destination: link.destination,
    totalClicks: link.totalVisitCount + liveClicks,
  });
}
