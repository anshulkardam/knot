import type { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import Token from '../../models/token.js';
import { generateAccessToken, generateRefreshToken } from '../../lib/jwt.js';
import { CustomError } from '../../utils/CustomError.js';
import config from '../../config/index.js';
import { logger } from '../../lib/winston.js';

type LoginBody = {
  email: string;
  password: string;
};

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as LoginBody;

  const user = await User.findOne({ email })
    .select('+password name email role totalVisitCount')
    .lean();

  if (!user) {
    throw new CustomError('Invalid credentials', 401, 'AuthenticationError');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new CustomError('Invalid credentials', 401, 'AuthenticationError');
  }

  const accessToken = generateAccessToken({ userId: user._id });
  const refreshToken = generateRefreshToken({ userId: user._id });

  const hash = await bcrypt.hash(refreshToken, 10);

  const refreshTokenExpiresAt = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  );

  await Token.findOneAndUpdate(
    { userId: user._id },
    { tokenHash: hash, expiresAt: refreshTokenExpiresAt },
    { upsert: true },
  );

  reply.setCookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  logger.info('User logged in', { userId: user._id });

  reply.code(200).send({
    status: 'success',
    data: {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        totalVisitCount: user.totalVisitCount,
      },
    },
    accessToken,
  });
}
