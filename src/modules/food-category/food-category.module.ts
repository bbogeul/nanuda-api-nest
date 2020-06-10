import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodCategory } from './food-category.entity';
import { AdminFoodCategoryController } from './admin-food-category.controller';
import { FoodCategoryService } from './food-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodCategory])],
  controllers: [AdminFoodCategoryController],
  providers: [FoodCategoryService],
})
export class FoodCategoryModule {}
