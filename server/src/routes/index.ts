import { Router } from 'express';
import reservationRoutes from './reservation.routes.js';
import menuRoutes from './menu.routes.js';
import contactRoutes from './contact.routes.js';
import hoursRoutes from './hours.routes.js';
import adminRoutes from './admin.routes.js';

const apiRouter = Router();

apiRouter.use('/reservations', reservationRoutes);
apiRouter.use('/menu', menuRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/hours', hoursRoutes);
apiRouter.use('/admin', adminRoutes);

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default apiRouter;
