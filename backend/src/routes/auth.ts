import { FastifyInstance } from 'fastify';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';
import { register } from '../controllers/auth/register.js';
import { validateBody } from '../middlewares/validator.js';
import { login } from '../controllers/auth/login.js';
import { logout } from '../controllers/auth/logout.js';
import { refreshToken } from '../controllers/auth/refreshToken.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/register',
    {
      preHandler: [validateBody(registerSchema)],
    },
    register,
  );

  fastify.post(
    '/login',
    {
      preHandler: [validateBody(loginSchema)],
    },
    login,
  );

  fastify.delete(
    '/logout',
    {
      preHandler: [authenticateUser],
    },
    logout,
  );

  fastify.get(
    '/refresh-token',
    {
      preHandler: [authenticateUser],
    },
    refreshToken,
  );

  // fastify.post(
  //   '/forgot-password',
  //   {
  //     preHandler: [validateBody(forgotPassSchema)],
  //   },
  //   forgotPassword,
  // );

  // fastify.post(
  //   '/reset-password',
  //   {
  //     preHandler: [validateBody(forgotPassSchema)],
  //   },
  //   resetPassword,
  // );
};
