import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import config from '../config/index.js';

export type TokenPayload = { userId: Types.ObjectId };

export type ResetLinkPayload = { email: string };

const generateAccessToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: '30m',
  });

  return token;
};

const generateRefreshToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  return token;
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET);
};

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET);
};

const generatePasswordResetToken = (payload: ResetLinkPayload) => {
  const resetToken = jwt.sign(payload, config.JWT_PASSWORD_RESET_SECRET, {
    expiresIn: '1h',
  });

  return resetToken;
};

const VerifyPasswordResetToken = (token: string) => {
  return jwt.verify(token, config.JWT_PASSWORD_RESET_SECRET);
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generatePasswordResetToken,
  VerifyPasswordResetToken,
};
