import { redis } from '../lib/redis.js';
import Link from '../models/link.js';
import mongoose from 'mongoose';
import config from '../config/index.js';
import { logger } from '../lib/winston.js';

const INTERVAL_MS = 60 * 1000; // 1 minute

async function syncClicks() {
  logger.info('[worker] syncing link clicks');

  let cursor = '0';

  do {
    const result = await redis.scan(cursor, {
      MATCH: 'link:clicks:*',
      COUNT: 100,
    });

    cursor = result.cursor;

    for (const key of result.keys) {
      const code = key.replace('link:clicks:', '');

      // atomic read + delete
      const count = await redis.getDel(key);
      if (!count) continue;

      const clicks = Number(count);
      if (clicks <= 0) continue;

      await Link.updateOne({ code }, { $inc: { totalVisitCount: clicks } });
    }
  } while (cursor !== '0');

  logger.info('[worker] sync complete');
}

async function startWorker() {
  try {
    await mongoose.connect(config.MONGO_URI);
    if (!redis.isOpen) {
      await redis.connect();
    }

    await syncClicks();

    setInterval(async () => {
      try {
        await syncClicks();
      } catch (err) {
        logger.error('[worker] error', err);
      }
    }, INTERVAL_MS);
  } catch (err) {
    logger.error('[worker] failed', err);
    process.exit(1);
  }
}

startWorker();
