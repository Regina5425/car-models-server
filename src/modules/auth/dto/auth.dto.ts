import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { UserResponseDto } from 'src/modules/user/dto/user.dto';

export class SignUpDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Test user name',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'test@gmail.com',
    type: String,
  })
  @IsString()
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '12345678',
    type: String,
  })
  @Length(8, 20, { message: 'Пароль должен быть от 8 до 20 символов' })
  @IsString()
  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  password: string;

  @ApiProperty({
    description: 'Номер телефона пользователя',
    example: '89000001111',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Номер телефона обязателен для заполнения' })
  phone: string;
}

export class SignInDto {
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
    description: 'Пароль пользователя',
    example: '12345678',
    type: String,
  })
  @Length(8, 20, { message: 'Пароль должен быть от 8 до 20 символов' })
  @IsString()
  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'Данные зарегистрированного пользователя',
    example: {
      id: 'user-id',
      email: 'example@gmail.com',
      name: 'Test user name',
      phone: '89001111114',
      avatar: 'https://avatars.githubusercontent.com/u/59575225',
      role: 'USER',
    },
    type: () => UserResponseDto,
  })
  user: UserResponseDto;

  @ApiProperty({
    description: 'Access token',
    example: 'access-token-example-string',
    type: String,
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'refresh-token-example-string',
    type: String,
  })
  refreshToken: string;
}
