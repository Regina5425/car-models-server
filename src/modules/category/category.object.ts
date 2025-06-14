import { Prisma } from 'generated/prisma';

export const categoryObject: Prisma.CategorySelect = {
  id: true,
  name: true,
  image: true,
  slug: true,
};
