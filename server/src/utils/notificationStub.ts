import { logger } from './logger.js';

export interface NotificationPayload {
  bookingReference: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
}

export interface NotificationResult {
  whatsappSent: boolean;
  emailSent: boolean;
  whatsappMessageId: string;
  emailMessageId: string;
  timestamp: string;
}

/**
 * Dispatcher stub for WhatsApp and Email booking confirmation.
 * Ready for integration with Twilio WhatsApp API / Gupshup / SendGrid / Resend.
 */
export async function dispatchReservationConfirmation(
  payload: NotificationPayload
): Promise<NotificationResult> {
  const timestamp = new Date().toISOString();
  const whatsappMessageId = `wa_msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const emailMessageId = `em_msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  // Simulating WhatsApp dispatch
  logger.info({
    event: 'NOTIFICATION_DISPATCH_WHATSAPP',
    target: payload.customerPhone,
    bookingReference: payload.bookingReference,
    message: `Sat Sri Akaal ${payload.customerName}! Your table at Haveli (GT Road, Khajurla) is confirmed for ${payload.guestCount} guests on ${payload.reservationDate} at ${payload.reservationTime}. Reference: ${payload.bookingReference}. Highway GPS: 31.2781641, 75.676673.`,
    whatsappMessageId,
  });

  // Simulating Email dispatch if email is provided
  if (payload.customerEmail) {
    logger.info({
      event: 'NOTIFICATION_DISPATCH_EMAIL',
      target: payload.customerEmail,
      bookingReference: payload.bookingReference,
      subject: `Haveli Jalandhar - Reservation Confirmed (${payload.bookingReference})`,
      emailMessageId,
    });
  }

  return {
    whatsappSent: true,
    emailSent: Boolean(payload.customerEmail),
    whatsappMessageId,
    emailMessageId,
    timestamp,
  };
}
