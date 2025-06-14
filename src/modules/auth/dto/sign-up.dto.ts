import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  email: string;

  @Length(8, 20, { message: 'Пароль должен быть от 8 до 20 символов' })
  @IsString()
  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Номер телефона обязателен для заполнения' })
  phone: string;
}
