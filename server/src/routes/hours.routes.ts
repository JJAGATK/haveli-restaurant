import { Router } from 'express';
import { hoursController } from '../controllers/hours.controller.js';

const router = Router();

router.get('/', (req, res) => {
  hoursController.getStatus(req, res);
});

export default router;
