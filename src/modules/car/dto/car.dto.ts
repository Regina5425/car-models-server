import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  CategoryDto,
  CategoryResponseDto,
} from 'src/modules/category/dto/category.dto';

export class CarDto {
  @ApiProperty({
    description: 'Название модели',
    example: 'Audi Q7',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Название модели обязательно для заполнения' })
  name: string;

  @ApiProperty({
    description: 'Описание модели',
    example: 'Audi Q7 - это новая модель',
    type: String,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Путь к файлу картинки',
    example: '/uploads/cars/example.png',
    type: String,
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    description: 'Цена',
    example: 15000,
    type: Number,
  })
  @IsNumber({}, { message: 'Цена должна быть строкой' })
  @IsNotEmpty({ message: 'Поле обязательно для заполнения' })
  price: number;

  @ApiProperty({
    description: 'ID категории',
    example: 'category-id',
    type: String,
  })
  @IsString()
  categoryId: string;
}

export class CarResponseDto {
  @ApiProperty({
    description: 'ID модели',
    example: 'car-id',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Название модели',
    example: 'Audi Q7',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Описание модели',
    example: 'Audi Q7 - это новая модель',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'Цена',
    example: 15000,
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: 'Путь к файлу картинки',
    example: '/uploads/cars/example.png',
    type: String,
  })
  image: string;

  @ApiProperty({
    description: 'Дата создания',
    example: '2025-06-29T11:08:54.601Z',
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    description: 'Slug',
    example: 'audi-q7',
    type: String,
  })
  slug: string;

  @ApiProperty({
    description: 'Категория',
    example: 'audi',
    type: CategoryResponseDto,
  })
  category: CategoryResponseDto;
}

export class CreatedCarResponseDto {
  @ApiProperty({
    description: 'ID модели',
    example: 'car-id',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Название модели',
    example: 'Audi Q7',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Описание модели',
    example: 'Audi Q7 - это новая модель',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'Цена',
    example: 15000,
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: 'Путь к файлу картинки',
    example: '/uploads/cars/example.png',
    type: String,
  })
  image: string;

  @ApiProperty({
    description: 'Дата создания',
    example: '2025-06-29T11:08:54.601Z',
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    description: 'Дата обновления',
    example: '2025-06-29T11:08:54.601Z',
    type: String,
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Slug',
    example: 'audi-q7',
    type: String,
  })
  slug: string;

  @ApiProperty({
    description: 'ID категории',
    example: 'category-id',
    type: String,
  })
  categoryId: string;

  @ApiProperty({
    description: 'ID пользователя',
    example: 'user-id',
    type: String,
  })
  userId: string;
}

export class FavoritesCarResponseDto {
  @ApiProperty({
    description: 'ID модели',
    example: 'car-id',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Название модели',
    example: 'Audi Q7',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Цена',
    example: 15000,
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: 'Путь к файлу картинки',
    example: '/uploads/cars/example.png',
    type: String,
  })
  image: string;

  @ApiProperty({
    description: 'Slug',
    example: 'audi-q7',
    type: String,
  })
  slug: string;

  @ApiProperty({
    description: 'Категория',
    example: {
      name: 'audi',
    },
    type: CategoryDto,
  })
  category: CategoryDto;
}
