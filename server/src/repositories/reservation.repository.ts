import { prisma } from './prisma.js';
import type { ReservationCreateInput } from '../validators/reservation.validator.js';

export class ReservationRepository {
  async create(data: ReservationCreateInput & { bookingReference: string }) {
    return prisma.reservation.create({
      data: {
        bookingReference: data.bookingReference,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail || null,
        reservationDate: data.reservationDate,
        reservationTime: data.reservationTime,
        guestCount: data.guestCount,
        occasion: data.occasion || null,
        specialNotes: data.specialNotes || null,
        status: 'CONFIRMED',
        confirmationSent: true,
      },
    });
  }

  async findByReference(bookingReference: string) {
    return prisma.reservation.findUnique({
      where: { bookingReference },
    });
  }

  async findByDate(date: string) {
    return prisma.reservation.findMany({
      where: { reservationDate: date },
      orderBy: { reservationTime: 'asc' },
    });
  }

  async listAll(limit = 100) {
    return prisma.reservation.findMany({
      take: limit,
      orderBy: [{ reservationDate: 'desc' }, { reservationTime: 'desc' }],
    });
  }

  async updateStatus(id: number, status: string) {
    return prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }
}

export const reservationRepository = new ReservationRepository();
