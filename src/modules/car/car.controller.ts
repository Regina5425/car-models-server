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
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserRole } from 'generated/prisma';
import { CarDto, CarResponseDto, CreatedCarResponseDto } from './dto/car.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Car')
@ApiBearerAuth()
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({
    summary: 'Получение списка всех моделей',
    description: 'Возвращает список всех моделей в виде массива',
  })
  @ApiOkResponse({ type: [CarResponseDto] })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Поисковая строка для фильтрации',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll(@Query('search') searchTerm?: string) {
    return this.carService.getAll(searchTerm);
  }

  @ApiOperation({
    summary: 'Получение модели по slug',
    description: 'Возвращает найденную модель',
  })
  @ApiOkResponse({ type: CarResponseDto })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  @HttpCode(HttpStatus.OK)
  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.carService.getBySlug(slug);
  }

  @ApiOperation({
    summary: 'Получение моделей по категории',
    description: 'Возвращает все модели этой категории',
  })
  @ApiOkResponse({ type: [CarResponseDto] })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  @HttpCode(HttpStatus.OK)
  @Get('by-category/:categorySlug')
  async getByCategory(@Param('categorySlug') categorySlug: string) {
    return this.carService.getByCategory(categorySlug);
  }

  @ApiOperation({
    summary: 'Создание модели',
    description: 'Создание новой модели',
  })
  @ApiOkResponse({ type: CreatedCarResponseDto })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен (требуются права ADMIN)',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  @Auth(UserRole.ADMIN)
  async create(@Body() dto: CarDto) {
    return this.carService.create(dto);
  }

  @ApiOperation({
    summary: 'Обновление модели',
    description: 'Обновление сведений о модели',
  })
  @ApiOkResponse({ type: CreatedCarResponseDto })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен (требуются права ADMIN)',
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @Auth(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() dto: CarDto) {
    return this.carService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Удаление модели',
    description: 'Удаление данных модели',
  })
  @ApiOkResponse({ type: CreatedCarResponseDto })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен (требуются права ADMIN)',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @Auth(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.carService.delete(id);
  }
}
