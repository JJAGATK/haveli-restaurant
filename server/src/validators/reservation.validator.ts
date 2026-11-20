import { z } from 'zod';
import { isTimeWithinOpeningHours } from '../utils/openingHours.js';

// Indian phone regex: allows optional +91, spaces, hyphens, and 10 digits starting with 6-9
const phoneRegex = /^(?:\+91[\s\-]?)?[6789]\d{9}$/;

export const reservationCreateSchema = z.object({
  customerName: z
    .string({ required_error: 'Customer name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(80, 'Name must be under 80 characters'),
  customerPhone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .transform((val) => val.replace(/[\s\-]/g, ''))
    .refine(
      (val) => /^(?:\+91)?[6789]\d{9}$/.test(val),
      'Please enter a valid 10-digit phone number (+91 optional)'
    ),
  customerEmail: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  reservationDate: z
    .string({ required_error: 'Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be formatted as YYYY-MM-DD')
    .refine((dateStr) => {
      // Must not be in the past
      const selected = new Date(dateStr);
      selected.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, 'Reservation date cannot be in the past')
    .refine((dateStr) => {
      // Max 60 days advance
      const selected = new Date(dateStr);
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 60);
      return selected <= maxDate;
    }, 'Reservations can only be made up to 60 days in advance'),
  reservationTime: z
    .string({ required_error: 'Time is required' })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:mm 24-hour format')
    .refine(
      (timeStr) => isTimeWithinOpeningHours(timeStr),
      'Reservations are only accepted during opening hours: 5:00 AM to 12:30 AM'
    ),
  guestCount: z
    .number({ required_error: 'Guest count is required' })
    .int('Guest count must be an integer')
    .min(1, 'Minimum 1 guest is required')
    .max(30, 'For groups larger than 30, please call our banquet desk at +91 98887 55550'),
  occasion: z
    .string()
    .trim()
    .max(100, 'Occasion note is too long')
    .optional(),
  specialNotes: z
    .string()
    .trim()
    .max(500, 'Special notes must be under 500 characters')
    .optional(),
});

export type ReservationCreateInput = z.infer<typeof reservationCreateSchema>;

export const reservationStatusUpdateSchema = z.object({
  status: z.enum(['CONFIRMED', 'SEATED', 'CANCELLED', 'COMPLETED']),
});
