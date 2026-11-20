import { prisma } from './prisma.js';
import type { MenuItemUpdateInput } from '../validators/menu.validator.js';

export class MenuRepository {
  async listAll(category?: string, onlyAvailable = false) {
    const where: { category?: string; available?: boolean } = {};
    if (category && category !== 'All') {
      where.category = category;
    }
    if (onlyAvailable) {
      where.available = true;
    }

    return prisma.menuItem.findMany({
      where,
      orderBy: [{ isSignature: 'desc' }, { id: 'asc' }],
    });
  }

  async findById(id: number) {
    return prisma.menuItem.findUnique({
      where: { id },
    });
  }

  async getSignatures() {
    return prisma.menuItem.findMany({
      where: { isSignature: true, available: true },
      orderBy: { id: 'asc' },
    });
  }

  async update(id: number, data: MenuItemUpdateInput) {
    return prisma.menuItem.update({
      where: { id },
      data,
    });
  }
}

export const menuRepository = new MenuRepository();
