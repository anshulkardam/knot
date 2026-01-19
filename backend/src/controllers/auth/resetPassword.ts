// import { logger } from '@/lib/winston';
// import bcrypt from 'bcrypt';
// import { Request, Response, NextFunction } from 'express';
// import nodemailerTransporter from '@/lib/nodemailer';
// import { ResetLinkPayload, VerifyPasswordResetToken } from '@/lib/jwt';
// import User from '@/models/user';
// import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
// import { CustomError } from '@/utils/CustomError';

// const resetPassword = async (
//   req: Request<never, never, { password: string }, { token: string }>,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { token } = req.query;

//   const { password } = req.body;
//   try {
//     const { email } = VerifyPasswordResetToken(token) as ResetLinkPayload;

//     const user = await User.findOne({ email })
//       .select('password passwordResetToken name')
//       .exec();

//     if (!user) {
//       throw new CustomError('User not found', 404, 'NotFound');
//     }

//     if (!user.passwordResetToken) {
//       throw new CustomError(
//         'User password reset token not found',
//         404,
//         'NotFound'
//       );
//     }

//     //use pre save to update the hash pass

//     res.sendStatus(204);

//     await nodemailerTransporter.sendMail({
//       from: 'Knots <contact@lnots.com>',
//       to: email,
//       subject: 'Password Reset Successfully',
//       html: passResetInfoTemplate({
//         name: user.name,
//       }),
//     });
//   } catch (err) {
//     logger.error('Error during resetting password', err);

//     if (err instanceof TokenExpiredError) {
//       throw new CustomError('Reset Token Expired', 401, 'TokenError');
//     }

//     if (err instanceof JsonWebTokenError) {
//       throw new CustomError('Invalid Reset Token', 401, 'TokenError');
//     }
//     next(err);
//   }
// };

// export default resetPassword;
