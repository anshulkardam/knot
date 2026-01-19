import { FastifyReply, FastifyRequest } from 'fastify';
import Token from '../../models/token.js';

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  await Token.deleteOne({ userId: request.userId });

  reply.clearCookie('refreshToken', {
    path: '/',
  });

  reply.code(204).send();
}
