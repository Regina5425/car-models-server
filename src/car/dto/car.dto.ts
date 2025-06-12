import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CarDto {
  @IsString()
  @IsNotEmpty({ message: 'Название модели обязательно для заполнения' })
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsNumber({}, { message: 'Цена должна быть строкой' })
  @IsNotEmpty({ message: 'Поле обязательно для заполнения' })
  price: number;

  @IsString()
  categoryId: string;
}
