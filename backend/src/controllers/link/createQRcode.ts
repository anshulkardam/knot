import type { FastifyRequest, FastifyReply } from 'fastify';
import Link from '../../models/link.js';
import { CustomError } from '../../utils/CustomError.js';
import config from '../../config/index.js';
import QRCode from 'qrcode';
import { generateBackHalf } from '../../utils/index.js';

type CreateLinkBody = {
  title: string;
  destination: string;
  backHalf?: string;
};

export async function createQRcode(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.userId!;
  const { title, destination } = request.body as CreateLinkBody;

  const code = (request.body as CreateLinkBody).backHalf ?? generateBackHalf();

  const exists = await Link.exists({ code });
  if (exists) {
    throw new CustomError('Back half already in use', 409, 'Conflict');
  }

  const link = await Link.create({
    title,
    destination,
    code,
    creator: userId,
    QrCode: true
  });

  const shortUrl = `${config.BACKEND_API}/${link.code}`;

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
