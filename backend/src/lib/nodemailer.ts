import nodemailer from 'nodemailer';
import config from '../config/index.js';

const nodemailerTransporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  pool: true,
  auth: {
    user: config.SMTP_AUTH_USERNAME,
    pass: config.SMTP_AUTH_PASSWORD,
  },
});

export default nodemailerTransporter;
