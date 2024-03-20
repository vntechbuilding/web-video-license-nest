import { Module } from '@nestjs/common';
import { AdminNewsCategoryController } from './admin-news-category.controller';
import { AdminNewsCategoryService } from './admin-news-category.service';

@Module({
  controllers: [AdminNewsCategoryController],
  providers: [AdminNewsCategoryService]
})
export class AdminNewsCategoryModule {}
