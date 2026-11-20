import { contactRepository } from '../repositories/contact.repository.js';
import type { ContactCreateInput } from '../validators/contact.validator.js';
import { logger } from '../utils/logger.js';

export class ContactService {
  async submitMessage(input: ContactCreateInput) {
    const message = await contactRepository.create(input);
    logger.info({
      event: 'CONTACT_MESSAGE_RECEIVED',
      id: message.id,
      name: message.name,
      subject: message.subject,
    });
    return message;
  }

  async listMessages(limit = 100) {
    return contactRepository.listAll(limit);
  }

  async markRead(id: number) {
    return contactRepository.markAsRead(id);
  }
}

export const contactService = new ContactService();
