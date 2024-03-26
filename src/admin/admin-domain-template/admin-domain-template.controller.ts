import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminV2Guard } from '../../middleware/guard/admin-v2/admin-v2.guard';
import { AdminDomainTemplateService } from './admin-domain-template.service';
import { AdminDomainTemplateNewsCreateDto } from './dto/admin-domain-template.news.create.dto';
import { AdminDomainTemplateNewsCategoryCreateDto } from './dto/admin-domain-template.news-category.create.dto';
import { AdminDomainTemplatePageCreateDto } from './dto/admin-domain-template.page.create.dto';
import { AdminDomainTemplateMenuCreateDto } from './dto/admin-domain-template.menu.create.dto';
import { AdminDomainTemplateTextCreateDto } from './dto/admin-domain-template.text.create.dto';
import { AdminDomainTemplateScriptCreateDto } from './dto/admin-domain-template.script.create.dto';
import { AdminDomainTemplateImageCreateDto } from './dto/admin-domain-template.image.create.dto';
import { AdminDomainTemplateContentCreateDto } from './dto/admin-domain-template.content.create.dto';
import { DomainIdDto } from '../../middleware/dto/domain-id.dto';
import { DomainTemplateService } from '../../middleware/services/domain-template/domain-template.service';

@Controller('api/admin/domain-template')
@UseGuards(AdminV2Guard)
export class AdminDomainTemplateController {
  constructor(
    private adminDomainTemplateService: AdminDomainTemplateService,
    private domainTemplateService: DomainTemplateService,
  ) {}

  @Get(':domainId')
  getDomainTemplateConfig(@Param() domainId: DomainIdDto) {
    return this.domainTemplateService.getAllDomainConfig(domainId.domainId);
  }

  @Post('news')
  createDomainTemplateNews(
    @Body() createData: AdminDomainTemplateNewsCreateDto,
  ) {
    return this.adminDomainTemplateService.createDomainTemplateNews(createData);
  }

  @Post('news_category')
  createDomainTemplateNewsCategory(
    @Body() createData: AdminDomainTemplateNewsCategoryCreateDto,
  ) {
    return this.adminDomainTemplateService.createDomainTemplateNewsCategory(
      createData,
    );
  }

  @Post('page')
  createDomainTemplatePage(
    @Body() createData: AdminDomainTemplatePageCreateDto,
  ) {
    return this.adminDomainTemplateService.createDomainTemplatePage(createData);
  }

  @Post('menu')
  createDomainTemplateMenu(
    @Body() createData: AdminDomainTemplateMenuCreateDto,
  ) {
    return this.adminDomainTemplateService.createDomainTemplateMenu(createData);
  }

  @Post('text')
  createDomainTemplateText(
    @Body() createData: AdminDomainTemplateTextCreateDto,
  ) {
    return this.adminDomainTemplateService.createDomainTemplateText(createData);
  }
  @Post('script')
  createDomainTemplateScript(
    @Body() createData: AdminDomainTemplateScriptCreateDto,
  ) {
    return this.adminDomainTemplateService.createDomainTemplateScript(
      createData,
    );
  }
  @Post('image')
  createDomainTemplateImage(
    @Body() createData: AdminDomainTemplateImageCreateDto,
  ) {
    return this.adminDomainTemplateService.createDomainTemplateImage(
      createData,
    );
  }
  @Post('content')
  createDomainTemplateContent(
    @Body() createData: AdminDomainTemplateContentCreateDto,
  ) {
    return this.adminDomainTemplateService.createDomainTemplateContent(
      createData,
    );
  }
}
