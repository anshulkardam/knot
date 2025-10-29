import dotenv from 'dotenv';
dotenv.config();

const CORS_WHITELIST = ['https://something'];

const config = {
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV!,
  CORS_WHITELIST,
  LOGTAIL_TOKEN: process.env.LOGTAIL_TOKEN!,
  LOGTAIL_HOST: process.env.LOGTAIL_HOST!,
};

export default config;
