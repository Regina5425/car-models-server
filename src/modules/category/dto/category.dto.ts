import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({
    description: 'Название категории',
    example: 'audi',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Название категории обязательно для заполнения' })
  name: string;

  @ApiPropertyOptional({
    description: 'Иконка категории',
    example: 'https://example.com/img/audi',
    type: String,
  })
  @IsOptional()
  @IsString()
  image: string;
}

export class CategoryResponseDto {
  @ApiProperty({
    description: 'ID категории',
    example: 'category-id',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Название категории',
    example: 'audi',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Иконка категории',
    example: 'https://example.com/img/audi',
    type: String,
  })
  image: string;

  @ApiProperty({
    description: 'Slug категории',
    example: 'audi',
    type: String,
  })
  slug: string;
}

export class CreatedCategoryResponseDto extends CategoryResponseDto {
  @ApiProperty({
    description: 'Дата создания категории',
    example: '2025-06-29T12:24:37.460Z',
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    description: 'Дата обновления категории',
    example: '2025-06-29T12:24:37.460Z',
    type: String,
  })
  updatedAt: string;
}
