import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../../models/user.js';
import { CustomError } from '../../utils/CustomError.js';

const getCurrentUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.userId;

  const user = await User.findById(userId).select('-__v').lean().exec();

  if (!user) {
    throw new CustomError('User not found', 404, 'NotFound');
  }
  
  reply.status(200).send({
    status: 'success',
    data: user,
  });
};

export default getCurrentUser;
