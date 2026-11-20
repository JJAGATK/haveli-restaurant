import { Router } from 'express';
import { contactController } from '../controllers/contact.controller.js';
import { reservationRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', reservationRateLimiter, (req, res, next) => {
  contactController.submit(req, res, next);
});

export default router;
