import { FastifyReply, FastifyRequest } from 'fastify';
import { CustomError } from '../../utils/CustomError.js';
import {
  generateAccessToken,
  TokenPayload,
  verifyRefreshToken,
} from '../../lib/jwt.js';

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const refreshToken = request.cookies.refreshToken;
  if (!refreshToken) {
    throw new CustomError('Refresh token missing', 401, 'Unauthorized');
  }

  const { userId } = verifyRefreshToken(refreshToken) as TokenPayload;
  const accessToken = generateAccessToken({ userId });

  reply.send({ accessToken });
}
