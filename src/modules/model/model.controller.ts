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
import { ModelService } from './model.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserRole } from 'generated/prisma';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiQuery,
} from '@nestjs/swagger';
import {
  CreatedModelResponseDto,
  ModelDto,
  ModelResponseDto,
} from './dto/model.dto';

@ApiTags('Model')
@ApiBearerAuth()
@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @ApiOperation({
    summary: 'Получение списка всех моделей',
    description: 'Возвращает список всех моделей в виде массива',
  })
  @ApiOkResponse({ type: [ModelResponseDto] })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Поисковая строка для фильтрации',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll(@Query('search') searchTerm?: string) {
    return this.modelService.getAll(searchTerm);
  }

  @ApiOperation({
    summary: 'Получение модели по slug',
    description: 'Возвращает найденную модель',
  })
  @ApiOkResponse({ type: ModelResponseDto })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  @HttpCode(HttpStatus.OK)
  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.modelService.getBySlug(slug);
  }

  @ApiOperation({
    summary: 'Получение моделей по категории',
    description: 'Возвращает все модели этой категории',
  })
  @ApiOkResponse({ type: [ModelResponseDto] })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  @HttpCode(HttpStatus.OK)
  @Get('by-category/:categorySlug')
  async getByCategory(@Param('categorySlug') categorySlug: string) {
    return this.modelService.getByCategory(categorySlug);
  }

  @ApiOperation({
    summary: 'Создание модели',
    description: 'Создание новой модели',
  })
  @ApiOkResponse({ type: CreatedModelResponseDto })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен (требуются права ADMIN)',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  @Auth(UserRole.ADMIN)
  async create(@Body() dto: ModelDto) {
    return this.modelService.create(dto);
  }

  @ApiOperation({
    summary: 'Обновление модели',
    description: 'Обновление сведений о модели',
  })
  @ApiOkResponse({ type: CreatedModelResponseDto })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен (требуются права ADMIN)',
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @Auth(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() dto: ModelDto) {
    return this.modelService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Удаление модели',
    description: 'Удаление данных модели',
  })
  @ApiOkResponse({ type: CreatedModelResponseDto })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен (требуются права ADMIN)',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @Auth(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.modelService.delete(id);
  }
}
