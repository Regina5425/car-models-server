import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  @MaxLength(64, { message: 'Email не должен быть больше 64 символов' })
  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Номер телефона обязателен для заполнения' })
  phone: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
