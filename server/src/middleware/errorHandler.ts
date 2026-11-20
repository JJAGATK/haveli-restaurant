import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger.js';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    logger.warn(
      {
        path: req.path,
        method: req.method,
        errors: formattedErrors,
      },
      'Validation error'
    );

    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: formattedErrors,
    });
    return;
  }

  // Handle generic errors
  const message = err instanceof Error ? err.message : 'Internal server error';

  logger.error(
    {
      path: req.path,
      method: req.method,
      error: message,
      stack: err instanceof Error ? err.stack : undefined,
    },
    'Server error handled'
  );

  res.status(500).json({
    success: false,
    error: message,
  });
}
