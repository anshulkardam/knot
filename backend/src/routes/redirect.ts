import type { FastifyInstance } from 'fastify';
import { redirect } from '../controllers/redirect/redirect.js';

export async function redirectRoutes(fastify: FastifyInstance) {
  fastify.get('/:code', redirect);
}
