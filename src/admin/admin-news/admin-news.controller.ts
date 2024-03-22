import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminV2Guard } from '../../middleware/guard/admin-v2/admin-v2.guard';
import { AdminNewsService } from './admin-news.service';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { UserIdDto } from '../../middleware/dto/user-id.dto';
import { DomainIdDto } from '../../middleware/dto/domain-id.dto';
import { NewsCategoryIdDto } from '../../middleware/dto/news-category-id.dto';
import { AdminNewsCreateDto } from './dto/admin-news.create.dto';
import { AdminNewsEditDto } from './dto/admin-news.edit.dto';
import { NewsIdDto } from '../../middleware/dto/news-id.dto';
import { RemoveNullObject } from '../../utils/remove-null-object';

@Controller('api/admin/news')
@UseGuards(AdminV2Guard)
export class AdminNewsController {
  constructor(private adminNewsService: AdminNewsService) {}
  @Get()
  getAllNews(@Query() pageData: PageMaxDto) {
    return this.adminNewsService.getAllNews(pageData);
  }

  @Get('user/:userId')
  getAllUserNews(@Query() pageData: PageMaxDto, @Param() userId: UserIdDto) {
    return this.adminNewsService.getAllUserNews(userId.userId, pageData);
  }

  @Get('domain/:domainId')
  getAllDomainNews(
    @Query() pageData: PageMaxDto,
    @Param() domainId: DomainIdDto,
  ) {
    return this.adminNewsService.getAllDomainNews(domainId.domainId, pageData);
  }

  @Get('category/:categoryId')
  getAllCategoryNews(
    @Query() pageData: PageMaxDto,
    @Param() categoryId: NewsCategoryIdDto,
  ) {
    return this.adminNewsService.getAllCategoryNews(
      categoryId.categoryId,
      pageData,
    );
  }

  @Post()
  createNews(@Body() createData: AdminNewsCreateDto) {
    return this.adminNewsService.createNews(createData);
  }

  @Put()
  updateNews(@Body() updateData: AdminNewsEditDto) {
    return this.adminNewsService.updateNews(
      RemoveNullObject(updateData) as any,
    );
  }

  @Delete(':newsId')
  deleteNews(@Param() newsId: NewsIdDto) {
    return this.adminNewsService.deleteNews(newsId.newsId);
  }
}
