import { z } from 'zod';

export const contactCreateSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be under 80 characters'),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .transform((val) => val.replace(/[\s\-]/g, ''))
    .refine(
      (val) => /^(?:\+91)?[6789]\d{9}$/.test(val),
      'Please enter a valid 10-digit phone number'
    ),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  subject: z
    .string({ required_error: 'Subject is required' })
    .trim()
    .min(3, 'Subject must be at least 3 characters')
    .max(120, 'Subject is too long'),
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(10, 'Message must be at least 10 characters long')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

export type ContactCreateInput = z.infer<typeof contactCreateSchema>;
