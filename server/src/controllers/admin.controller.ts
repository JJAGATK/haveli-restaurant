import type { Request, Response, NextFunction } from 'express';
import { reservationService } from '../services/reservation.service.js';
import { menuService } from '../services/menu.service.js';
import { contactService } from '../services/contact.service.js';
import { reservationStatusUpdateSchema } from '../validators/reservation.validator.js';
import { menuItemUpdateSchema } from '../validators/menu.validator.js';

export class AdminController {
  async getReservations(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string || '100', 10);
      const reservations = await reservationService.listReservations(limit);
      
      const stats = {
        total: reservations.length,
        confirmed: reservations.filter((r) => r.status === 'CONFIRMED').length,
        seated: reservations.filter((r) => r.status === 'SEATED').length,
        cancelled: reservations.filter((r) => r.status === 'CANCELLED').length,
      };

      res.json({
        success: true,
        stats,
        data: reservations,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateReservationStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const { status } = reservationStatusUpdateSchema.parse(req.body);
      const updated = await reservationService.updateReservationStatus(id, status);

      res.json({
        success: true,
        message: `Reservation status updated to ${status}`,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const validatedData = menuItemUpdateSchema.parse(req.body);
      const updated = await menuService.updateMenuItem(id, validatedData);

      res.json({
        success: true,
        message: 'Menu item updated successfully',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const messages = await contactService.listMessages();
      res.json({
        success: true,
        data: messages,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
