import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { CarService } from './car.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRole } from 'generated/prisma';
import { CarDto } from './dto/car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getAll(@Query('search') searchTerm?: string) {
    return this.carService.getAll(searchTerm);
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.carService.getBySlug(slug);
  }

  @Get('by-category/:categorySlug')
  async getByCategory(@Param('categorySlug') categorySlug: string) {
    return this.carService.getByCategory(categorySlug);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @Auth(UserRole.ADMIN)
  async create(@Body() dto: CarDto) {
    return this.carService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @Auth(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() dto: CarDto) {
    return this.carService.update(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @Auth(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.carService.delete(id);
  }
}
