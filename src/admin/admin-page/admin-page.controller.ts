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
import { AdminPageService } from './admin-page.service';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { UserIdDto } from '../../middleware/dto/user-id.dto';
import { DomainIdDto } from '../../middleware/dto/domain-id.dto';
import { AdminPageCreateDto } from './dto/admin-page.create.dto';
import { AdminPageEditDto } from './dto/admin-page.edit.dto';
import { PageIdDto } from '../../middleware/dto/page-id.dto';
import { RemoveNullObject } from '../../utils/remove-null-object';

@Controller('api/admin/page')
@UseGuards(AdminV2Guard)
export class AdminPageController {
  constructor(private adminPage: AdminPageService) {}
  @Get()
  getAllPage(@Query() pageData: PageMaxDto) {
    return this.adminPage.getAllPage(pageData);
  }

  @Get('user/:userId')
  getAllUserPage(@Query() pageData: PageMaxDto, @Param() userId: UserIdDto) {
    return this.adminPage.getAllUserPage(userId.userId, pageData);
  }

  @Get('domain/:domainId')
  getAllDomainPage(
    @Query() pageData: PageMaxDto,
    @Param() domainId: DomainIdDto,
  ) {
    return this.adminPage.getAllDomainPage(domainId.domainId, pageData);
  }

  @Post()
  createPage(@Body() createData: AdminPageCreateDto) {
    return this.adminPage.createPage(createData);
  }

  @Put()
  updatePage(@Body() updateData: AdminPageEditDto) {
    return this.adminPage.updatePage(RemoveNullObject(updateData) as any);
  }

  @Delete(':pageId')
  deletePage(@Param() pageData: PageIdDto) {
    return this.adminPage.deletePage(pageData.pageId);
  }
}
