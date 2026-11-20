import { Router } from 'express';
import { menuController } from '../controllers/menu.controller.js';

const router = Router();

router.get('/', (req, res, next) => {
  menuController.getMenu(req, res, next);
});

router.get('/signatures', (req, res, next) => {
  menuController.getSignatures(req, res, next);
});

export default router;
