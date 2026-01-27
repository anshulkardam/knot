import type { FastifyRequest, FastifyReply } from 'fastify';
import Link from '../../models/link.js';
import { FilterQuery } from 'mongoose';

export async function getMyLinks(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.userId;

  const {
    search = '',
    offset = '0',
    limit = '10',
    qr,
  } = request.query as Record<string, unknown>;

  const skip = Number(offset);
  const take = Number(limit);

  let qrBoolean: boolean | undefined;

  if (typeof qr === 'string') {
    if (qr === 'true') qrBoolean = true;
    if (qr === 'false') qrBoolean = false;
  }

  const query: FilterQuery<typeof Link> = {
    creator: userId,
    QrCode: qrBoolean,
  };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { destination: { $regex: search, $options: 'i' } },
      { code: { $regex: search, $options: 'i' } },
    ];
  }

  const [links, total] = await Promise.all([
    Link.find(query).sort({ createdAt: -1 }).skip(skip).limit(take).lean(),
    Link.countDocuments(query),
  ]);

  return reply.send({
    status: 'success',
    data: {
      total,
      offset: skip,
      limit: take,
      links,
    },
  });
}
