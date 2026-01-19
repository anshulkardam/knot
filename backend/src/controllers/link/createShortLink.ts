import type { FastifyRequest, FastifyReply } from 'fastify';
import Link from '../../models/link.js';
import { generateBackHalf } from '../../utils/index.js';
import { CustomError } from '../../utils/CustomError.js';
import config from '../../config/index.js';

type CreateLinkBody = {
  title: string;
  destination: string;
  backHalf?: string;
};

export async function createLink(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.userId!;
  const { title, destination } = request.body as CreateLinkBody;

  const code = (request.body as CreateLinkBody).backHalf ?? generateBackHalf();

  const exists = await Link.exists({ code });
  if (exists) {
    throw new CustomError('Back half already in use', 409, 'Conflict');
  }

  const link = await Link.create({
    title,
    destination,
    code,
    creator: userId,
  });

  reply.code(201).send({
    link: {
      id: link._id,
      title: link.title,
      destination: link.destination,
      shortUrl: `${config.CLIENT_ORIGIN}/${link.code}`,
    },
  });
}
