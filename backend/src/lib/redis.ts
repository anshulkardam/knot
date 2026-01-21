import { createClient, RedisClientType } from 'redis';
import { logger } from './winston.js';
import config from '../config/index.js';

export const redis: RedisClientType = createClient({
  url: config.REDIS_URL,
});

redis.on('error', (err) => {
  logger.error('[redis] error', err);
});
