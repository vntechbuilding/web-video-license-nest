import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { AdminDomainTemplateNewsCreateDto } from './dto/admin-domain-template.news.create.dto';
import { AdminDomainTemplateNewsCategoryCreateDto } from './dto/admin-domain-template.news-category.create.dto';
import { AdminDomainTemplatePageCreateDto } from './dto/admin-domain-template.page.create.dto';
import { AdminDomainTemplateMenuCreateDto } from './dto/admin-domain-template.menu.create.dto';
import { AdminDomainTemplateTextCreateDto } from './dto/admin-domain-template.text.create.dto';
import { AdminDomainTemplateScriptCreateDto } from './dto/admin-domain-template.script.create.dto';
import { AdminDomainTemplateImageCreateDto } from './dto/admin-domain-template.image.create.dto';
import { AdminDomainTemplateContentCreateDto } from './dto/admin-domain-template.content.create.dto';
@Injectable()
export class AdminDomainTemplateService {
  constructor(private prisma: PrismaService) {}

  createDomainTemplateNews(createData: AdminDomainTemplateNewsCreateDto) {
    return this.prisma.domainTemplate.upsert({
      where: {
        domainId_templateType_code: {
          domainId: createData.domainId,
          templateType: createData.templateType,
          code: createData.code,
        },
      },
      create: createData,
      update: createData,
    });
  }

  createDomainTemplateNewsCategory(
    createData: AdminDomainTemplateNewsCategoryCreateDto,
  ) {
    return this.prisma.domainTemplate.upsert({
      where: {
        domainId_templateType_code: {
          domainId: createData.domainId,
          templateType: createData.templateType,
          code: createData.code,
        },
      },
      create: createData,
      update: createData,
    });
  }

  createDomainTemplatePage(createData: AdminDomainTemplatePageCreateDto) {
    return this.prisma.domainTemplate.upsert({
      where: {
        domainId_templateType_code: {
          domainId: createData.domainId,
          templateType: createData.templateType,
          code: createData.code,
        },
      },
      create: createData,
      update: createData,
    });
  }

  createDomainTemplateMenu(createData: AdminDomainTemplateMenuCreateDto) {
    return this.prisma.domainTemplate.upsert({
      where: {
        domainId_templateType_code: {
          domainId: createData.domainId,
          templateType: createData.templateType,
          code: createData.code,
        },
      },
      create: createData,
      update: createData,
    });
  }

  createDomainTemplateText(createData: AdminDomainTemplateTextCreateDto) {
    return this.prisma.domainTemplate.upsert({
      where: {
        domainId_templateType_code: {
          domainId: createData.domainId,
          templateType: createData.templateType,
          code: createData.code,
        },
      },
      create: createData,
      update: createData,
    });
  }

  createDomainTemplateScript(createData: AdminDomainTemplateScriptCreateDto) {
    return this.prisma.domainTemplate.upsert({
      where: {
        domainId_templateType_code: {
          domainId: createData.domainId,
          templateType: createData.templateType,
          code: createData.code,
        },
      },
      create: createData,
      update: createData,
    });
  }

  createDomainTemplateImage(createData: AdminDomainTemplateImageCreateDto) {
    return this.prisma.domainTemplate.upsert({
      where: {
        domainId_templateType_code: {
          domainId: createData.domainId,
          templateType: createData.templateType,
          code: createData.code,
        },
      },
      create: createData,
      update: createData,
    });
  }

  createDomainTemplateContent(createData: AdminDomainTemplateContentCreateDto) {
    return this.prisma.domainTemplate.upsert({
      where: {
        domainId_templateType_code: {
          domainId: createData.domainId,
          templateType: createData.templateType,
          code: createData.code,
        },
      },
      create: createData,
      update: createData,
    });
  }
}
