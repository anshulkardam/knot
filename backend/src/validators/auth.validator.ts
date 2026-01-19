import z from 'zod';

export const registerSchema = z.object({
  name: z.string('Name is Required'),
  email: z.email('Email is Required'),
  password: z
    .string('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.email('Email is Required'),
  password: z.string('Password is required'),
});

export const forgotPassSchema = z.object({
  email: z.email('Email is Required'),
});

export const resetPassSchema = z.object({
  password: z.string('Password is required'),
});
