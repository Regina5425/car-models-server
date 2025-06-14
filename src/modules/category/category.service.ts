import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { categoryObject } from './category.object';
import { CategoryDto } from './dto/category.dto';
import { generateSlug } from 'src/shared/utils/generate-slug';

@Injectable()
export class CategoryService {
  public constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.category.findMany({
      select: categoryObject,
    });
  }

  async getById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      select: categoryObject,
    });

    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    return category;
  }

  async getBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        slug,
      },
      select: categoryObject,
    });

    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    return category;
  }

  async create(dto: CategoryDto) {
    return await this.prisma.category.create({
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        image: dto.image,
      },
    });
  }

  async update(id: string, dto: CategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    return await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        image: dto.image,
      },
    });
  }

  async delete(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
