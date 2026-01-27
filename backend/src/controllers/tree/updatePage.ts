import type { FastifyRequest, FastifyReply } from 'fastify';
import LinkTree from '../../models/tree.js';
import { CustomError } from '../../utils/CustomError.js';

type UpdateLinkTreeBody = {
  title?: string;
  bio?: string;
  isActive?: boolean;
  items?: {
    id: string;
    title?: string;
    url?: string;
    category?: 'social' | 'link';
    order?: number;
    isActive?: boolean;
    _delete?: boolean;
  }[];
};

export async function updatePage(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.userId!;
  const pageId = request.params as { pageId: string };
  const body = request.body as UpdateLinkTreeBody;

  const page = await LinkTree.findOne({
    _id: pageId.pageId,
    creator: userId,
  });

  if (!page) {
    throw new CustomError('Page not found', 404, 'Not Found');
  }

  if (body.title !== undefined) page.title = body.title;
  if (body.bio !== undefined) page.bio = body.bio;
  if (body.isActive !== undefined) page.isActive = body.isActive;

  /* ---------- Items ---------- */
  if (body.items) {
    const itemsMap = new Map(page.items.map((item) => [item.id, item]));

    for (const patch of body.items) {
      // delete
      if (patch._delete) {
        itemsMap.delete(patch.id);
        continue;
      }

      const existing = itemsMap.get(patch.id);

      // update existing
      if (existing) {
        Object.assign(existing, {
          title: patch.title ?? existing.title,
          url: patch.url ?? existing.url,
          category: patch.category ?? existing.category,
          order: patch.order ?? existing.order,
          isActive: patch.isActive ?? existing.isActive,
        });
      } else {
        // create new
        itemsMap.set(patch.id, {
          id: patch.id,
          title: patch.title!,
          url: patch.url!,
          category: patch.category!,
          order: patch.order ?? itemsMap.size,
          isActive: patch.isActive ?? true,
        });
      }
    }

    page.items = Array.from(itemsMap.values()).sort(
      (a, b) => a.order - b.order,
    );
  }

  await page.save();

  reply.send(page);
}
