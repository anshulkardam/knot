import z from 'zod';

export const updateUserSchema = z.object({
  name: z.string('Name is Required'),
  email: z.email('Email is Required'),
  role: z.enum(['user', 'admin'], 'Please select a valid role'),
  password: z
    .string('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});
