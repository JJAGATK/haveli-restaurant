import { menuRepository } from '../repositories/menu.repository.js';
import type { MenuItemUpdateInput } from '../validators/menu.validator.js';

export class MenuService {
  async getMenu(category?: string, onlyAvailable = false) {
    const items = await menuRepository.listAll(category, onlyAvailable);
    
    // Group items by category for convenience
    const categories = [
      'Breakfast',
      'Parathas and Kulcha',
      'Main Course',
      'South Indian',
      'Snacks and Chaat',
      'Beverages and Lassi',
      'Desserts',
    ];

    const grouped: Record<string, typeof items> = {};
    for (const cat of categories) {
      grouped[cat] = items.filter((item) => item.category === cat);
    }

    return {
      total: items.length,
      categories,
      grouped,
      items,
      disclaimer: '*All prices shown are illustrative placeholders. Please verify against physical restaurant menu on arrival.',
    };
  }

  async getSignatures() {
    return menuRepository.getSignatures();
  }

  async updateMenuItem(id: number, data: MenuItemUpdateInput) {
    const existing = await menuRepository.findById(id);
    if (!existing) {
      throw new Error(`Menu item with ID ${id} not found`);
    }
    return menuRepository.update(id, data);
  }
}

export const menuService = new MenuService();
