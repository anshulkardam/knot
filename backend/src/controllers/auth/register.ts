import type { FastifyRequest, FastifyReply } from 'fastify';
import config from '../../config/index.js';
import User from '../../models/user.js';
import Token from '../../models/token.js';
import { logger } from '../../lib/winston.js';
import { generateAccessToken, generateRefreshToken } from '../../lib/jwt.js';
import { CustomError } from '../../utils/CustomError.js';
import bcrypt from 'bcrypt';

type RegisterBody = {
  name: string;
  email: string;
  password: string;
};

export async function register(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { email, name, password } = request.body as RegisterBody;

  const userExists = await User.exists({ email });

  if (userExists) {
    throw new CustomError('Account already in use', 400, 'BadRequest');
  }

  const newUser = await User.create({
    email,
    name,
    password,
    role: config.WHITELISTED_EMAILS?.includes(email) ? 'admin' : 'user',
  });

  const accessToken = generateAccessToken({ userId: newUser._id });
  const refreshToken = generateRefreshToken({ userId: newUser._id });

  const hash = await bcrypt.hash(refreshToken, 10);

  const refreshTokenExpiresAt = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  );

  await Token.create({
    tokenHash: hash,
    userId: newUser._id,
    expiresAt: refreshTokenExpiresAt,
  });

  logger.info(`New ${newUser.role} Created`, {
    userId: newUser._id,
    email: newUser.email,
    role: newUser.role,
  });

  reply.setCookie('refreshToken', refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });

  reply.code(201).send({
    status: 'success',
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        totalVisitCount: newUser.totalVisitCount,
      },
      accessToken,
    },
  });
}
