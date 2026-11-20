import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  adminApiKey: process.env.ADMIN_API_KEY || 'haveli-highway-admin-key-2026',
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173')
    .split(',')
    .map(origin => origin.trim()),
  logLevel: process.env.LOG_LEVEL || 'info',
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  business: {
    name: 'Haveli',
    tagline: 'Authentic Punjabi Village Restaurant & Highway Halt',
    address: 'Jalandhar-Phagwara Highway, Grand Trunk Rd, Khajurla, Punjab 144411, India',
    coordinates: {
      latitude: 31.2781641,
      longitude: 75.676673,
    },
    googleMapsUrl: 'https://www.google.com/maps/place/Haveli/@31.2781641,75.676673,17z/data=!4m15!1m8!3m7!1s0x391a58d254051053:0x79a3b83ecfe44040!2sHaveli!8m2!3d31.2781641!4d75.676673!10e1!16s%2Fg%2F1td40wqh!3m5!1s0x391a58d254051053:0x79a3b83ecfe44040!8m2!3d31.2781641!4d75.676673!16s%2Fg%2F1td40wqh',
    phone: '+91 98887 55550',
    whatsappPhone: '919888755550',
    priceLevel: 'moderate',
    rating: 4.4,
    reviewCount: 70000,
    sisterAttraction: {
      name: 'Rangla Punjab',
      description: 'Traditional Punjabi cultural village with folk shows, puppet dances, and live village artisans next door.',
    },
    banquetHall: 'The Heritage',
    operatingHours: {
      openHour: 5,     // 5:00 AM
      openMinute: 0,
      closeHour: 0,    // 12:30 AM (00:30 next day)
      closeMinute: 30,
      displaySchedule: 'Every day, 5:00 AM to 12:30 AM',
    },
    reservationRules: {
      maxPartySize: 30,
      minPartySize: 1,
      maxAdvanceDays: 60,
    },
  },
};
