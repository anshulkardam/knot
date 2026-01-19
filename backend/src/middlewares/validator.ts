import type { FastifyRequest, FastifyReply } from 'fastify';
import type { ZodType } from 'zod';

export function validateBody(schema: ZodType) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));

      reply.code(400).send({
        status: 'ValidationError',
        error: errorMessages,
      });

      return;
    }

    // overwrite body with parsed data
    request.body = result.data;
  };
}
