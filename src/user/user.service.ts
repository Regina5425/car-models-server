import { Prisma, User } from 'generated/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { hash } from 'argon2';
import { userObject } from './user.object';

@Injectable()
export class UserService {
  public constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: {
        ...userObject,
      },
    });

    return users;
  }

  async findById(id: string, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        ...userObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            slug: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        ...selectObject,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async findByEmail(email: string, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        ...userObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            slug: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        ...selectObject,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async create(dto: SignUpDto) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: await hash(dto.password),
        phone: dto.phone,
      },
    });

    return user;
  }

  async toggleFavorites(userId: string, carId: string) {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isExist = user.favorites.some((car) => car.id === carId);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorites: {
          [isExist ? 'disconnect' : 'connect']: {
            id: carId,
          },
        },
      },
    });

    return { status: true, message: 'Успешно' };
  }
}
