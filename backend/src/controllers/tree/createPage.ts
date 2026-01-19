import type { FastifyRequest, FastifyReply } from 'fastify';
import LinkTree from '../../models/tree.js'
import { CustomError } from '../../utils/CustomError.js';

export async function createPage(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.userId;
  const { username, title, bio } = request.body as {
    username: string;
    title: string;
    bio?: string;
  };

  const exists = await LinkTree.exists({ username });
  if (exists) {
    throw new CustomError('Username already taken', 409, 'Conflict');
  }

  const page = await LinkTree.create({
    username,
    title,
    bio,
    creator: userId,
  });

  reply.code(201).send(page);
}
