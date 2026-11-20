import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';
import { requireAdminAuth } from '../middleware/auth.middleware.js';

const router = Router();

// Protect all admin endpoints with API key
router.use(requireAdminAuth);

router.get('/reservations', (req, res, next) => {
  adminController.getReservations(req, res, next);
});

router.patch('/reservations/:id', (req, res, next) => {
  adminController.updateReservationStatus(req, res, next);
});

router.patch('/menu/:id', (req, res, next) => {
  adminController.updateMenuItem(req, res, next);
});

router.get('/messages', (req, res, next) => {
  adminController.getMessages(req, res, next);
});

export default router;
