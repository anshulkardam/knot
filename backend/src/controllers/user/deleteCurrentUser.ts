import { FastifyReply, FastifyRequest } from 'fastify';
import Link from '../../models/link.js';
import User from '../../models/user.js';

const deleteCurrentUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.userId;

  await Link.deleteMany({ creator: userId });

  await User.deleteOne({ _id: userId });

  reply.send(204);
};

export default deleteCurrentUser;
