import type { Request, Response, NextFunction } from 'express';
import { contactCreateSchema } from '../validators/contact.validator.js';
import { contactService } from '../services/contact.service.js';

export class ContactController {
  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = contactCreateSchema.parse(req.body);
      const message = await contactService.submitMessage(validatedData);

      res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received. Our team will get back to you shortly.',
        data: {
          id: message.id,
          createdAt: message.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const contactController = new ContactController();
