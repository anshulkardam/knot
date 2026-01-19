import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import compress from '@fastify/compress';
import formbody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import { connectToDatabase, disconnectDatabase } from './lib/mongoose.js';
import CorsOptions from './lib/cors.js';
import { v1Routes } from './routes/index.js';
import { ErrorHandler } from './utils/CustomError.js';
import config from './config/index.js';
import { logger, logtail } from './lib/winston.js';
import rateLimit from '@fastify/rate-limit';

const app = Fastify({ logger: false });

async function start(): Promise<void> {
  try {
    await connectToDatabase();

    await app.register(cors, CorsOptions);
    await app.register(helmet);
    await app.register(formbody);
    await app.register(cookie);
    await app.register(compress);
    await app.register(rateLimit, {
      max: 100,
      timeWindow: '1 minute',
    });

    app.setErrorHandler(ErrorHandler);

    await app.register(v1Routes, { prefix: '/api/v1' });

    await app.listen({ port: config.PORT, host: '0.0.0.0' });

    logger.info(`Server listening at http://localhost:${config.PORT}/api/v1`);
  } catch (err) {
    logger.error('Failed to start the server', err);
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

start();

const serverTermination = async (signal: NodeJS.Signals): Promise<void> => {
  try {
    logger.info('SERVER SHUTDOWN', signal);
    await app.close();
    await disconnectDatabase();
    logtail.flush();
    process.exit(0);
  } catch (err) {
    logger.error('ERROR DURING SERVER SHUTDOWN', err);
    process.exit(1);
  }
};

process.on('SIGTERM', serverTermination);
process.on('SIGINT', serverTermination);
