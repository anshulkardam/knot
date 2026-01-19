import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../../models/user.js';
import { CustomError } from '../../utils/CustomError.js';

type UpdateUserBody = {
  email?: string;
  name?: string;
};

const updateCurrentUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.userId;
  const { email, name } = request.body as UpdateUserBody;

  if (!email && !name) {
    throw new CustomError('Nothing to update', 400, 'BadRequest');
  }

  if (email) {
    const emailTaken = await User.exists({
      email,
      _id: { $ne: userId },
    });

    if (emailTaken) {
      throw new CustomError('Email already in use', 409, 'Conflict');
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      ...(email && { email }),
      ...(name && { name }),
    },
    {
      new: true,
      runValidators: true,
    },
  ).select('-password');

  if (!updatedUser) {
    throw new CustomError('User not found', 404, 'NotFound');
  }

  reply.status(200).send({
    status: 'success',
    data: updatedUser,
  });
};

export default updateCurrentUser;
