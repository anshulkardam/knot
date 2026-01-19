import { redis } from '../lib/redis.js';
import Link from '../models/link.js';
import mongoose from 'mongoose';
import config from '../config/index.js';

async function syncClicks() {
  console.log('[worker] syncing link clicks');

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

  console.log('[worker] sync complete');
}

// bootstrap (standalone worker)
(async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    await redis.connect();

    await syncClicks();

    await redis.quit();
    process.exit(0);
  } catch (err) {
    console.error('[worker] failed', err);
    process.exit(1);
  }
})();
