import { createClient, RedisClientType } from 'redis';
import { logger } from './winston.js';

export const redis: RedisClientType = createClient({
  url: process.env.REDIS_URL ?? 'redis://127.0.0.1:6379',
});

redis.on('error', (err) => {
  logger.error('[redis] error', err);
});
