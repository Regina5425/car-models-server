import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Название категории обязательно для заполнения' })
  name: string;

  @IsOptional()
  @IsString()
  image: string;
}
