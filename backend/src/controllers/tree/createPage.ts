import type { FastifyRequest, FastifyReply } from 'fastify';
import LinkTree from '../../models/tree.js';
import { CustomError } from '../../utils/CustomError.js';

type CreatePageBody = {
  username: string;
  title: string;
  bio?: string;
  items: {
    title: string;
    url: string;
    category: 'social' | 'link';
    order: number;
    isActive?: boolean;
  }[];
};

export async function createPage(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.userId!;
  const { username, title, bio, items = [] } = request.body as CreatePageBody;

  const exists = await LinkTree.exists({ username });
  if (exists) {
    throw new CustomError('Username already taken', 409, 'Conflict');
  }

  await LinkTree.create({
    username,
    title,
    bio,
    creator: userId,
    items: items.map((item, index) => ({
      ...item,
      order: item.order ?? index,
      isActive: item.isActive ?? true,
    })),
  });

  reply.send(201);
}
