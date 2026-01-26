import { FastifyReply, FastifyRequest } from 'fastify';
import { CustomError } from '../../utils/CustomError.js';
import {
  generateAccessToken,
  TokenPayload,
  verifyRefreshToken,
} from '../../lib/jwt.js';
import Token from '../../models/token.js';
import bcrypt from 'bcrypt';

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const refreshToken = request.cookies.refreshToken;
  if (!refreshToken) {
    throw new CustomError('Refresh token missing', 401, 'Unauthorized');
  }

  const payload = verifyRefreshToken(refreshToken) as TokenPayload;

  const tokenDoc = await Token.findOne({ userId: payload.userId }).select(
    'tokenHash',
  );

  if (!tokenDoc) {
    throw new CustomError('Invalid refresh token', 401, 'Unauthorized');
  }

  const isValid = await bcrypt.compare(refreshToken, tokenDoc.tokenHash);

  if (!isValid) {
    throw new CustomError('Invalid refresh token', 401, 'Unauthorized');
  }

  const accessToken = generateAccessToken({ userId: payload.userId });

  reply.send({ accessToken });
}
