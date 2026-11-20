import type { Request, Response, NextFunction } from 'express';
import { config } from '../config/index.js';

export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const headerKey = req.headers['x-admin-key'] as string;
  const authHeader = req.headers['authorization'];
  const bearerKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  const keyProvided = headerKey || bearerKey;

  if (!keyProvided || keyProvided !== config.adminApiKey) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing admin API key',
    });
    return;
  }

  next();
}
