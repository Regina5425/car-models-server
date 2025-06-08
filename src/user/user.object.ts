import { Prisma } from 'generated/prisma';

export const userObject: Prisma.UserSelect = {
  id: true,
  email: true,
  name: true,
  phone: true,
  avatar: true,
  password: false,
  role: true,
};
