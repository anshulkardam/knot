import dotenv from 'dotenv';
dotenv.config();

const CORS_WHITELIST = ['https://something'];

type NodeEnv = 'development' | 'production';

const config = {
  PORT: Number(process.env.PORT!),
  NODE_ENV: process.env.NODE_ENV as NodeEnv,
  CORS_WHITELIST,
  LOGTAIL_TOKEN: process.env.LOGTAIL_TOKEN!,
  LOGTAIL_HOST: process.env.LOGTAIL_HOST!,
  MONGO_URI: process.env.MONGO_URI!,
  WHITELISTED_EMAILS: process.env.WHITELISTED_EMAILS?.split(','),
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_PASSWORD_RESET_SECRET: process.env.JWT_PASSWORD_RESET_SECRET!,
  SMTP_AUTH_USERNAME: process.env.SMTP_AUTH_USERNAME!,
  SMTP_AUTH_PASSWORD: process.env.SMTP_AUTH_PASSWORD!,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN!,
};

export default config;
