import type { FastifyRequest, FastifyReply } from 'fastify';
import LinkTree from '../../models/tree.js';
import LinkTreeItem from '../../models/branches.js';
import { CustomError } from '../../utils/CustomError.js';

export async function updateItem(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.userId!;
  const { itemId } = request.params as { itemId: string };
  const updates = request.body as Partial<{
    title: string;
    url: string;
    order: number;
    isActive: boolean;
  }>;

  const item = await LinkTreeItem.findById(itemId);
  if (!item) {
    throw new CustomError('Item not found', 404, 'NotFound');
  }

  const page = await LinkTree.findById(item.pageId);
  if (!page || page.creator.toString() !== userId.toString()) {
    throw new CustomError('Unauthorized', 403, 'Forbidden');
  }

  await LinkTreeItem.updateOne({ _id: itemId }, updates);

  reply.send(204);
}
