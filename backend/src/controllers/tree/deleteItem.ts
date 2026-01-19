import type { FastifyRequest, FastifyReply } from 'fastify';
import LinkTree from '../../models/tree.js';
import LinkTreeItem from '../../models/branches.js';
import { CustomError } from '../../utils/CustomError.js';

export async function deleteItem(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.userId!;
  const { itemId } = request.params as { itemId: string };

  const item = await LinkTreeItem.findById(itemId);
  if (!item) {
    throw new CustomError('Item not found', 404, 'NotFound');
  }

  const page = await LinkTree.findById(item.pageId);
  if (!page || page.creator.toString() !== userId.toString()) {
    throw new CustomError('Unauthorized', 403, 'Forbidden');
  }

  await LinkTreeItem.deleteOne({ _id: itemId });

  reply.send(204);
}
