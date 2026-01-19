import type { FastifyRequest, FastifyReply } from 'fastify';
import Link from '../models/link.js';
import { CustomError } from '../utils/CustomError.js';
import config from '../config/index.js';
import QRCode from 'qrcode';

export async function getQr(request: FastifyRequest, reply: FastifyReply) {
  const { code } = request.params as { code: string };

  // Validate link exists (avoid generating garbage)
  const exists = await Link.exists({ code });
  if (!exists) {
    throw new CustomError('Link not found', 404, 'NotFound');
  }

  const shortUrl = `${config.CLIENT_ORIGIN}/${code}`;

  const qrPng = await QRCode.toBuffer(shortUrl, {
    type: 'png',
    width: 300,
    margin: 1,
  });

  reply
    .header('Content-Type', 'image/png')
    .header('Cache-Control', 'public, max-age=86400')
    .send(qrPng);
}
