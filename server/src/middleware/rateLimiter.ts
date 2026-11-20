import rateLimit from 'express-rate-limit';
import { config } from '../config/index.js';

export const globalRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});

export const reservationRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 15, // limit reservations to prevent spam
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many reservation attempts. Please wait a few minutes before trying again.',
  },
});
