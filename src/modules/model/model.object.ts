import { Prisma } from 'generated/prisma';
import { categoryObject } from 'src/modules/category/category.object';

export const modelObject: Prisma.ModelSelect = {
  id: true,
  name: true,
  description: true,
  price: true,
  image: true,
  createdAt: true,
  slug: true,
  category: { select: categoryObject },
};
