import type { Request, Response, NextFunction } from 'express';
import { reservationCreateSchema } from '../validators/reservation.validator.js';
import { reservationService } from '../services/reservation.service.js';

export class ReservationController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = reservationCreateSchema.parse(req.body);
      const reservation = await reservationService.createReservation(validatedData);

      res.status(201).json({
        success: true,
        message: 'Reservation confirmed successfully!',
        data: reservation,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByReference(req: Request, res: Response, next: NextFunction) {
    try {
      const { reference } = req.params;
      const reservation = await reservationService.getReservation(reference);

      res.json({
        success: true,
        data: reservation,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const reservationController = new ReservationController();
