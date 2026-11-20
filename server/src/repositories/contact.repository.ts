import { prisma } from './prisma.js';
import type { ContactCreateInput } from '../validators/contact.validator.js';

export class ContactRepository {
  async create(data: ContactCreateInput) {
    return prisma.contactMessage.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        subject: data.subject,
        message: data.message,
      },
    });
  }

  async listAll(limit = 100) {
    return prisma.contactMessage.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: number) {
    return prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }
}

export const contactRepository = new ContactRepository();
