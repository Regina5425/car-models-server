import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { CategoryService } from 'src/modules/category/category.service';

@Module({
  controllers: [ModelController],
  providers: [ModelService, CategoryService],
})
export class ModelModule {}
