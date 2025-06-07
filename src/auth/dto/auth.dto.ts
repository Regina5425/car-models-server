import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  @MaxLength(64, { message: 'Email не должен быть больше 64 символов' })
  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  email: string;

  @Length(8, 20, { message: 'Пароль должен быть от 8 до 20 символов' })
  @IsString()
  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  password: string;
}
