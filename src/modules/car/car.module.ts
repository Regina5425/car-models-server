import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CategoryService } from 'src/modules/category/category.service';

@Module({
  controllers: [CarController],
  providers: [CarService, CategoryService],
})
export class CarModule {}
