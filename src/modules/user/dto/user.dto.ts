import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserRole } from 'generated/prisma';
import { FavoritesCarResponseDto } from 'src/modules/car/dto/car.dto';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'test@gmail.com',
    type: String,
  })
  @IsEmail({}, { message: 'Некорректный формат email' })
  @MaxLength(64, { message: 'Email не должен быть больше 64 символов' })
  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  email: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Test user name',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  name: string;

  @ApiProperty({
    description: 'Номмер телефона пользователя',
    example: '89000001111',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Номер телефона обязателен для заполнения' })
  phone: string;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'ID пользователя',
    example: 'user-id',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'test@gmail.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Test user name',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Номер телефона пользователя',
    example: '89000111111',
    type: String,
  })
  phone: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'https://example.com/avatar/323213',
    type: String,
  })
  avatar: string;

  @ApiProperty({
    description: 'Права доступа пользователя',
    example: 'USER',
    type: String,
  })
  role: UserRole;
}

export class UserWithFavoritesResponseDto extends UserResponseDto {
  @ApiPropertyOptional({
    description: 'Избранные модели пользователя',
    example: [
      {
        id: 'product-id',
        name: 'Audi Q7',
        price: 15000,
        image: '/uploads/img/product1.jpg',
        slug: 'audi-q7',
        category: {
          name: 'audi',
        },
      },
    ],
    type: [FavoritesCarResponseDto],
  })
  @IsOptional()
  favorites: FavoritesCarResponseDto[];
}

export class ToggleFavoritesResponseDto {
  @ApiProperty({
    description: 'Статус операции',
    example: true,
    type: Boolean,
  })
  status: boolean;

  @ApiProperty({
    description: 'Сообщение',
    example: 'Success',
    type: String,
  })
  message: string;

  @ApiProperty({
    description: 'Выполненное действие',
    enum: ['added', 'removed'],
    example: 'added',
  })
  action: string;
}
