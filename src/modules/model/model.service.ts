import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ModelDto } from './dto/model.dto';
import { generateSlug } from 'src/shared/utils/generate-slug';
import { modelObject } from './model.object';
import { CategoryService } from 'src/modules/category/category.service';

@Injectable()
export class ModelService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) {
      return this.search(searchTerm);
    }
    return this.prisma.model.findMany({
      select: modelObject,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async search(searchTerm: string) {
    const term = searchTerm.toLowerCase();

    return this.prisma.model.findMany({
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
      select: modelObject,
    });
  }

  async getBySlug(slug: string) {
    const model = await this.prisma.model.findUnique({
      where: {
        slug,
      },
      select: modelObject,
    });

    if (!model) {
      throw new NotFoundException('Модель не найдена');
    }

    return model;
  }

  async getByCategory(categorySlug: string) {
    const models = await this.prisma.model.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: modelObject,
    });

    if (!models) {
      throw new NotFoundException('Модель не найдена');
    }

    return models;
  }

  async create(dto: ModelDto) {
    const { categoryId, description, image, name, price } = dto;

    await this.categoryService.getById(categoryId);

    return await this.prisma.model.create({
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

  async update(id: string, dto: ModelDto) {
    const { categoryId, description, image, name, price } = dto;

    const model = await this.prisma.model.findUnique({
      where: {
        id,
      },
    });

    if (!model) {
      throw new NotFoundException('Модель не найдена');
    }

    await this.categoryService.getById(categoryId);

    return await this.prisma.model.update({
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
    const model = await this.prisma.model.findUnique({
      where: {
        id,
      },
    });

    if (!model) {
      throw new NotFoundException('Модель не найдена');
    }

    return await this.prisma.model.delete({
      where: {
        id,
      },
    });
  }
}
