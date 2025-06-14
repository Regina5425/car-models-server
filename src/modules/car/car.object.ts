import { Prisma } from 'generated/prisma';
import { categoryObject } from 'src/modules/category/category.object';

export const carObject: Prisma.CarSelect = {
  id: true,
  name: true,
  description: true,
  price: true,
  image: true,
  createdAt: true,
  slug: true,
  category: { select: categoryObject },
};
