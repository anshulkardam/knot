import type { FastifyRequest, FastifyReply } from 'fastify';
import LinkTree from '../../models/tree.js';
import LinkTreeItem from '../../models/branches.js';
import { CustomError } from '../../utils/CustomError.js';

export async function addItem(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.userId!;
  const { pageId } = request.params as { pageId: string };
  const { title, url, order } = request.body as {
    title: string;
    url: string;
    order?: number;
  };

  const page = await LinkTree.findById(pageId);
  if (!page) {
    throw new CustomError('Page not found', 404, 'NotFound');
  }

  if (page.creator.toString() !== userId.toString()) {
    throw new CustomError('Unauthorized', 403, 'Forbidden');
  }

  const item = await LinkTreeItem.create({
    pageId,
    title,
    url,
    order: order ?? 0,
  });

  reply.code(201).send(item);
}
