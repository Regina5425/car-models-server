import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CarDto } from './dto/car.dto';
import { generateSlug } from 'src/shared/utils/generate-slug';
import { carObject } from './car.object';
import { CategoryService } from 'src/modules/category/category.service';

@Injectable()
export class CarService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) {
      return this.search(searchTerm);
    }
    return this.prisma.car.findMany({
      select: carObject,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async search(searchTerm: string) {
    const term = searchTerm.toLowerCase();

    return this.prisma.car.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            description: {
              contains: term,
            },
          },
        ],
      },
      select: carObject,
    });
  }

  async getBySlug(slug: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        slug,
      },
      select: carObject,
    });

    if (!car) {
      throw new NotFoundException('Модель товара не найдена');
    }

    return car;
  }

  async getByCategory(categorySlug: string) {
    const cars = await this.prisma.car.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: carObject,
    });

    if (!cars) {
      throw new NotFoundException('Модель товара не найдена');
    }

    return cars;
  }

  async create(dto: CarDto) {
    const { categoryId, description, image, name, price } = dto;

    await this.categoryService.getById(categoryId);

    return await this.prisma.car.create({
      data: {
        name,
        description,
        slug: generateSlug(name),
        image,
        price,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  async update(id: string, dto: CarDto) {
    const { categoryId, description, image, name, price } = dto;

    const car = await this.prisma.car.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException('Модель товара не найдена');
    }

    await this.categoryService.getById(categoryId);

    return await this.prisma.car.update({
      where: {
        id,
      },
      data: {
        name,
        slug: generateSlug(dto.name),
        image,
        description,
        price,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  async delete(id: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException('Модель товара не найдена');
    }

    return await this.prisma.car.delete({
      where: {
        id,
      },
    });
  }
}
