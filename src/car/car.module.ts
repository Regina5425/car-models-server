import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [CarController],
  providers: [CarService, CategoryService],
})
export class CarModule {}
