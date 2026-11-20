import type { Request, Response } from 'express';
import { hoursService } from '../services/hours.service.js';

export class HoursController {
  getStatus(_req: Request, res: Response) {
    const status = hoursService.getCurrentHoursStatus();
    res.json({
      success: true,
      data: status,
    });
  }
}

export const hoursController = new HoursController();
