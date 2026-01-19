import z from 'zod';

export const genLinkSchema = z.object({
  title: z.string('Title is Required'),
  destination: z
    .url('Please provide a valid URL')
    .min(1, 'Destination is required'),
  backHalf: z.string().optional(),
});

export const updateLinkSchema = z.object({
  title: z.string('Title is Required').optional(),
  destination: z
    .url('Please provide a valid URL')
    .min(1, 'Destination is required')
    .optional(),
  backHalf: z.string().optional(),
});
