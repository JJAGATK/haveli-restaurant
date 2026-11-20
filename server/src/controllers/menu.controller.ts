import type { Request, Response, NextFunction } from 'express';
import { menuService } from '../services/menu.service.js';

export class MenuController {
  async getMenu(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string | undefined;
      const onlyAvailable = req.query.available === 'true';
      const menu = await menuService.getMenu(category, onlyAvailable);

      res.json({
        success: true,
        data: menu,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSignatures(req: Request, res: Response, next: NextFunction) {
    try {
      const signatures = await menuService.getSignatures();
      res.json({
        success: true,
        data: signatures,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const menuController = new MenuController();
