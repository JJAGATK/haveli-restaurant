import { describe, it, expect } from 'vitest';
import { isTimeWithinOpeningHours, getOpeningStatus } from '../src/utils/openingHours.js';

describe('Opening Hours Logic - Haveli (5:00 AM to 12:30 AM daily)', () => {
  describe('isTimeWithinOpeningHours', () => {
    it('accepts morning opening at 05:00', () => {
      expect(isTimeWithinOpeningHours('05:00')).toBe(true);
    });

    it('accepts lunch rush at 13:30', () => {
      expect(isTimeWithinOpeningHours('13:30')).toBe(true);
    });

    it('accepts evening dinner at 20:00', () => {
      expect(isTimeWithinOpeningHours('20:00')).toBe(true);
    });

    it('accepts late night at 23:45', () => {
      expect(isTimeWithinOpeningHours('23:45')).toBe(true);
    });

    it('accepts midnight at 00:00', () => {
      expect(isTimeWithinOpeningHours('00:00')).toBe(true);
    });

    it('accepts closing boundary at 00:30 (12:30 AM)', () => {
      expect(isTimeWithinOpeningHours('00:30')).toBe(true);
    });

    it('rejects post-closing time at 00:31', () => {
      expect(isTimeWithinOpeningHours('00:31')).toBe(false);
    });

    it('rejects dead-of-night closed hours at 02:00', () => {
      expect(isTimeWithinOpeningHours('02:00')).toBe(false);
    });

    it('rejects pre-opening time at 04:59', () => {
      expect(isTimeWithinOpeningHours('04:59')).toBe(false);
    });

    it('rejects invalid time strings', () => {
      expect(isTimeWithinOpeningHours('invalid')).toBe(false);
      expect(isTimeWithinOpeningHours('25:00')).toBe(false);
      expect(isTimeWithinOpeningHours('12:60')).toBe(false);
    });
  });

  describe('getOpeningStatus', () => {
    it('returns Open Now during daytime at 14:00', () => {
      const afternoon = new Date('2026-11-20T14:00:00');
      const status = getOpeningStatus(afternoon);
      expect(status.isOpen).toBe(true);
      expect(status.statusBadge).toBe('Open Now');
      expect(status.nextEvent).toContain('12:30 AM');
    });

    it('returns Open Now during midnight shift at 00:15', () => {
      const midnight = new Date('2026-11-20T00:15:00');
      const status = getOpeningStatus(midnight);
      expect(status.isOpen).toBe(true);
      expect(status.statusBadge).toBe('Open Now');
    });

    it('returns Closed Now during maintenance hours at 03:00 AM', () => {
      const earlyMorning = new Date('2026-11-20T03:00:00');
      const status = getOpeningStatus(earlyMorning);
      expect(status.isOpen).toBe(false);
      expect(status.statusBadge).toBe('Closed Now');
      expect(status.nextEvent).toContain('5:00 AM');
    });
  });
});
