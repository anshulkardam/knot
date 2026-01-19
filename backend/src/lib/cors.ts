import type { FastifyCorsOptions } from '@fastify/cors';
import config from '../config/index.js';

const corsOptions: FastifyCorsOptions = {
  origin: (origin, callback) => {
    // allow non-browser requests (curl, mobile apps, server-to-server)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (config.CORS_WHITELIST.includes(origin)) {
      callback(null, true);
      return;
    }

    if (config.NODE_ENV === 'development') {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
};

export default corsOptions;
