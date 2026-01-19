import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../lib/winston.js';

export class CustomError extends Error {
  public statusCode: number;
  public timestamp: string;
  public type: string;
  public details?: string | undefined;
  public path?: string | undefined;

  constructor(
    message: string,
    statusCode: number,
    type: string,
    details?: string,
    path?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.type = type;
    this.path = path;
    this.timestamp = new Date().toISOString();

    // This ensures the name of the error matches the class name
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export function ErrorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const statusCode = error.statusCode ?? 500;
  logger.error('Error common handler', error);
  reply.status(statusCode).send({
    status: "error",
    message: error.message,
  });
}
