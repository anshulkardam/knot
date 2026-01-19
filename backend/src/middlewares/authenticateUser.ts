import type { FastifyRequest } from 'fastify';
import { verifyAccessToken, TokenPayload } from '../lib/jwt.js';
import { CustomError } from '../utils/CustomError.js';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}

export async function authenticateUser(request: FastifyRequest) {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new CustomError('Missing access token', 401, 'AuthenticationError');
  }

  const token = authHeader.split(' ')[1];

  const { userId } = verifyAccessToken(token) as TokenPayload;
  request.userId = userId.toString();
}
