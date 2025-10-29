import express from 'express';
import config from '@/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import router from '@/routes';
import CorsOptions from '@/lib/cors';
import cors from 'cors';
import { logger, logtail } from '@/lib/winston';

const app = express();

app.use(cors(CorsOptions));

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.use(cookieParser());

app.use(compression());

(async function (): Promise<void> {
  try {
    app.use('/', router);

    app.listen(config.PORT, () => {
      logger.info(`Server Listening at http://localhost:${config.PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start the server', err);
    if (config.NODE_ENV === 'PROD') {
      process.exit(1);
    }
  }
})();

const serverTermination = async (signal: NodeJS.Signals): Promise<void> => {
  try {
    logger.info('SERVER SHUTDOWN', signal);

    logtail.flush();

    process.exit(0);
  } catch (err) {
    logger.error('ERROR DURING SERVER SHUTDOWN', err);
  }
};

process.on('SIGTERM', serverTermination);
process.on('SIGINT', serverTermination);
