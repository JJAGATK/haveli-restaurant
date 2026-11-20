import pino from 'pino';
import { config } from '../config/index.js';

export const logger = pino({
  level: config.logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    service: 'haveli-api',
    env: config.nodeEnv,
  },
});
