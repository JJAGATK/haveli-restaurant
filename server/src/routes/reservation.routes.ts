import { Router } from 'express';
import { reservationController } from '../controllers/reservation.controller.js';
import { reservationRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', reservationRateLimiter, (req, res, next) => {
  reservationController.create(req, res, next);
});

router.get('/:reference', (req, res, next) => {
  reservationController.getByReference(req, res, next);
});

export default router;
