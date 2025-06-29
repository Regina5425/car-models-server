import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { UserRole } from 'generated/prisma';
import { Auth } from 'src/common/decorators/auth.decorator';
import {
  CategoryDto,
  CategoryResponseDto,
  CreatedCategoryResponseDto,
} from './dto/category.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'Получение списка всех категорий',
    description: 'Возвращает список всех категорий в виде массива',
  })
  @ApiOkResponse({
    type: CategoryResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @ApiOperation({
    summary: 'Получение категории по ID',
    description: 'Возвращает найденную категорию',
  })
  @ApiOkResponse({
    type: CategoryResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(id);
  }

  @ApiOperation({
    summary: 'Получение категории по slug',
    description: 'Возвращает найденную категорию',
  })
  @ApiOkResponse({
    type: CategoryResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.getBySlug(slug);
  }

  @ApiOperation({
    summary: 'Создание категории',
    description: 'Добавление новой категории',
  })
  @ApiOkResponse({
    type: CreatedCategoryResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  @Auth(UserRole.ADMIN)
  async create(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }

  @ApiOperation({
    summary: 'Обновление категории',
    description: 'Обновление существующей категории',
  })
  @ApiOkResponse({
    type: CreatedCategoryResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Категория не найдена' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @Auth(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Удаление категории',
    description: 'Удаление существующей категории',
  })
  @ApiOkResponse({
    type: CreatedCategoryResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Категория не найдена' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @Auth(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
