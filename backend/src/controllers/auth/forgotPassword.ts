// import { generatePasswordResetToken } from '@/lib/jwt';
// import nodemailerTransporter from '@/lib/nodemailer';
// import { logger } from '@/lib/winston';
// import User from '@/models/user';
// import { CustomError } from '@/utils/CustomError';
// import { NextFunction, Request, Response } from 'express';

// const forgotPassword = async (
//   req: Request<never, never, { email: string }, never>,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { email } = req.body;
//   try {
//     if (!(await User.exists({ email }))) {
//       throw new CustomError('Account doesnt exist', 404, 'NotFound');
//     }

//     const passwordResetToken = generatePasswordResetToken({ email });

//     const user = await User.findOne({ email })
//       .select('name passwordResetToken')
//       .exec();

//     if (!user) {
//       throw new CustomError('User not found', 404, 'NotFound');
//     }

//     // await nodemailerTransporter.sendMail({
//     //   from: '"Knots" <contact@knots.com>',
//     //   to: email,
//     //   subject: 'Password Reset Request',
//     //   html: resetLinkTemplate({
//     //     name: user.name,
//     //     resetLink: `${config.CLIENT_ORIGIN}/reset-password?token=${passwordResetToken}`,
//     //   }),
//     // });

//     res.sendStatus(204);
//   } catch (err) {
//     logger.error('Error during sending reset link to email', err);

//     next(err);
//   }
// };

// export default forgotPassword;
