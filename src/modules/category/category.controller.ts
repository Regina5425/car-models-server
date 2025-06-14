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
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(id);
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.getBySlug(slug);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @Auth(UserRole.ADMIN)
  async create(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @Auth(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @Auth(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
