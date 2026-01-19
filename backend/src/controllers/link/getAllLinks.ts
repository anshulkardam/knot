import type { FastifyRequest, FastifyReply } from 'fastify';
import Link from '../../models/link.js';
import { FilterQuery } from 'mongoose';

export async function getMyLinks(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.userId!;

  const {
    search = '',
    offset = 0,
    limit = 10,
  } = request.query as {
    search?: string;
    offset?: number;
    limit?: number;
  };

  const query: FilterQuery<typeof Link> = { creator: userId };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  const [links, total] = await Promise.all([
    Link.find(query)
      .sort({ createdAt: -1 })
      .skip(Number(offset))
      .limit(Number(limit))
      .lean(),
    Link.countDocuments(query),
  ]);

  reply.send({
    total,
    offset,
    limit,
    links,
  });
}
