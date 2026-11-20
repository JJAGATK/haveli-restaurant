import { describe, it, expect } from 'vitest';
import { reservationCreateSchema } from '../src/validators/reservation.validator.js';
import { contactCreateSchema } from '../src/validators/contact.validator.js';

describe('Validation Schemas', () => {
  describe('Reservation Validation', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const validPayload = {
      customerName: 'Harpreet Singh',
      customerPhone: '+91 98888 12345',
      customerEmail: 'harpreet@example.com',
      reservationDate: tomorrowStr,
      reservationTime: '19:30',
      guestCount: 6,
      occasion: 'Family Dinner',
      specialNotes: 'Table near traditional brass fountain',
    };

    it('accepts valid reservation data', () => {
      const parsed = reservationCreateSchema.safeParse(validPayload);
      expect(parsed.success).toBe(true);
    });

    it('rejects party size exceeding maximum limit of 30', () => {
      const parsed = reservationCreateSchema.safeParse({
        ...validPayload,
        guestCount: 35,
      });
      expect(parsed.success).toBe(false);
      if (!parsed.success) {
        expect(parsed.error.errors[0].message).toContain('banquet desk');
      }
    });

    it('rejects zero or negative guest count', () => {
      const parsed = reservationCreateSchema.safeParse({
        ...validPayload,
        guestCount: 0,
      });
      expect(parsed.success).toBe(false);
    });

    it('rejects reservation time outside operating hours (e.g. 02:30 AM)', () => {
      const parsed = reservationCreateSchema.safeParse({
        ...validPayload,
        reservationTime: '02:30',
      });
      expect(parsed.success).toBe(false);
      if (!parsed.success) {
        expect(parsed.error.errors[0].message).toContain('5:00 AM to 12:30 AM');
      }
    });

    it('rejects past reservation dates', () => {
      const parsed = reservationCreateSchema.safeParse({
        ...validPayload,
        reservationDate: '2020-01-01',
      });
      expect(parsed.success).toBe(false);
      if (!parsed.success) {
        expect(parsed.error.errors[0].message).toContain('past');
      }
    });

    it('rejects malformed phone numbers', () => {
      const parsed = reservationCreateSchema.safeParse({
        ...validPayload,
        customerPhone: '12345',
      });
      expect(parsed.success).toBe(false);
    });
  });

  describe('Contact Form Validation', () => {
    it('accepts valid contact submission', () => {
      const validContact = {
        name: 'Jasbir Kaur',
        phone: '9876543210',
        email: 'jasbir@example.com',
        subject: 'Highway tour bus halt booking',
        message: 'We have a group of 25 arriving on Saturday for lunch.',
      };
      const parsed = contactCreateSchema.safeParse(validContact);
      expect(parsed.success).toBe(true);
    });

    it('rejects overly short messages', () => {
      const parsed = contactCreateSchema.safeParse({
        name: 'Jasbir',
        phone: '9876543210',
        subject: 'Hi',
        message: 'Too short',
      });
      expect(parsed.success).toBe(false);
    });
  });
});
