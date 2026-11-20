import { reservationRepository } from '../repositories/reservation.repository.js';
import { isTimeWithinOpeningHours } from '../utils/openingHours.js';
import { dispatchReservationConfirmation } from '../utils/notificationStub.js';
import type { ReservationCreateInput } from '../validators/reservation.validator.js';
import { logger } from '../utils/logger.js';

export class ReservationService {
  /**
   * Generates a readable booking reference: e.g., HAV-202611-4821
   */
  private generateReference(): string {
    const now = new Date();
    const yearMonth = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `HAV-${yearMonth}-${randomDigits}`;
  }

  async createReservation(input: ReservationCreateInput) {
    // Opening hours safety check
    if (!isTimeWithinOpeningHours(input.reservationTime)) {
      throw new Error(
        'Reservations are only accepted during opening hours: 5:00 AM to 12:30 AM.'
      );
    }

    // Date safety check
    const reservationDate = new Date(input.reservationDate);
    reservationDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (reservationDate < today) {
      throw new Error('Reservations cannot be made for past dates.');
    }

    const bookingReference = this.generateReference();

    const reservation = await reservationRepository.create({
      ...input,
      bookingReference,
    });

    // Dispatch stubbed WhatsApp and Email notifications
    try {
      await dispatchReservationConfirmation({
        bookingReference: reservation.bookingReference,
        customerName: reservation.customerName,
        customerPhone: reservation.customerPhone,
        customerEmail: reservation.customerEmail,
        reservationDate: reservation.reservationDate,
        reservationTime: reservation.reservationTime,
        guestCount: reservation.guestCount,
      });
    } catch (notifErr) {
      logger.warn({ err: notifErr }, 'Failed to dispatch confirmation notification stub');
    }

    return reservation;
  }

  async getReservation(reference: string) {
    const reservation = await reservationRepository.findByReference(reference);
    if (!reservation) {
      throw new Error(`Reservation not found with reference ${reference}`);
    }
    return reservation;
  }

  async listReservations(limit = 100) {
    return reservationRepository.listAll(limit);
  }

  async updateReservationStatus(id: number, status: string) {
    return reservationRepository.updateStatus(id, status);
  }
}

export const reservationService = new ReservationService();
