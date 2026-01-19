import { FastifyRequest } from 'fastify';
import User from '../models/user.js';
import { CustomError } from '../utils/CustomError.js';

type Role = 'user' | 'admin';

export function authorizeUser(roles: Role[]) {
  return async (request: FastifyRequest) => {
    const user = await User.findById(request.userId).select('role').lean();

    if (!user || !roles.includes(user.role)) {
      throw new CustomError('Unauthorized', 403, 'AuthorizationError');
    }
  };
}
