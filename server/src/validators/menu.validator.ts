import { z } from 'zod';

export const menuItemUpdateSchema = z.object({
  available: z.boolean().optional(),
  placeholderPrice: z.string().trim().optional(),
  description: z.string().trim().max(300).optional(),
});

export type MenuItemUpdateInput = z.infer<typeof menuItemUpdateSchema>;
