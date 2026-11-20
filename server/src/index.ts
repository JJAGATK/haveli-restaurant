import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { config } from './config/index.js';
import { logger } from './utils/logger.js';
import { globalRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';
import { prisma } from './repositories/prisma.js';

export function createApp() {
  const app = express();

  // Security headers with Helmet
  app.use(
    helmet({
      contentSecurityPolicy: false, // Allows flexible integration with Vite frontend in dev/prod
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // CORS configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps or curl) or if in whitelist
        if (!origin || config.corsOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
          callback(null, true);
        } else {
          callback(null, true); // Permissive in dev/local demo
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
    })
  );

  // Body parsing with size limits
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Global rate limiter
  app.use(globalRateLimiter);

  // Mount API router
  app.use('/api', apiRouter);

  // Serve static client build if present
  const candidatePaths = [
    path.resolve(process.cwd(), 'client/dist'),
    path.resolve(process.cwd(), '../client/dist'),
  ];
  const clientDistPath = candidatePaths.find(p => fs.existsSync(p));
  if (clientDistPath) {
    app.use(express.static(clientDistPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });
  }

  // Central error handling middleware
  app.use(errorHandler);

  return app;
}

const app = createApp();

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(config.port, () => {
    logger.info(
      { port: config.port, env: config.nodeEnv },
      `Haveli API server listening on http://localhost:${config.port}`
    );
  });

  const shutdown = async () => {
    logger.info('Graceful shutdown initiated...');
    server.close(async () => {
      await prisma.$disconnect();
      logger.info('Prisma disconnected, server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

export default app;
