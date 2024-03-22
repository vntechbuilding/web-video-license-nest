import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminV2Guard } from '../../middleware/guard/admin-v2/admin-v2.guard';
import { AdminNewsCategoryService } from './admin-news-category.service';
import { DomainIdDto } from '../../middleware/dto/domain-id.dto';
import { AdminNewsCategoryCreateDto } from './dto/admin-news-category.create.dto';
import { NewsCategoryIdDto } from '../../middleware/dto/news-category-id.dto';
import { AdminNewsCategoryUpdateDto } from './dto/admin-news-category.update.dto';
import { UserIdDto } from '../../middleware/dto/user-id.dto';

@Controller('api/admin/news-category')
@UseGuards(AdminV2Guard)
export class AdminNewsCategoryController {
  constructor(private adminNewsCategory: AdminNewsCategoryService) {}

  @Get()
  getAllCategory() {
    return this.adminNewsCategory.getCategory();
  }

  @Get('domain/:domainId')
  getAllCategoryDomain(@Param() domainData: DomainIdDto) {
    return this.adminNewsCategory.getCategoryDomain(domainData.domainId);
  }

  @Get('user/:userId')
  getAllCategoryUser(@Param() userData: UserIdDto) {
    return this.adminNewsCategory.getCategoryUser(userData.userId);
  }

  @Post()
  createNewsCategory(@Body() createData: AdminNewsCategoryCreateDto) {
    return this.adminNewsCategory.createNewsCategory(createData);
  }

  @Put()
  updateNewsCategory(@Body() updateData: AdminNewsCategoryUpdateDto) {
    // console.log('updateData', updateData);
    return this.adminNewsCategory.updateNewsCategory(updateData);
  }

  @Delete(':categoryId')
  deleteNewsCategory(@Param() categoryData: NewsCategoryIdDto) {
    return this.adminNewsCategory.deleteNewsCategory(categoryData.categoryId);
  }
}
