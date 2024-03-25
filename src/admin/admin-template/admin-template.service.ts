import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { AdminTemplateCreateDto } from './dto/admin-template.create.dto';
import { AdminTemplateUpdateDto } from './dto/admin-template.update.dto';
import { omit } from 'lodash';
import { from, of, switchMap } from 'rxjs';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { join } from 'path';
import { templateAssetsDir, templateFolder } from '../../constants';
import { rmSync, unlinkSync } from 'fs';

@Injectable()
export class AdminTemplateService {
  constructor(private prisma: PrismaService) {}

  getAllTemplate(pageData: PageMaxDto) {
    // return this.prisma.template.findMany({
    //   take: pageData.perPage,
    //   skip: pageData.page * pageData.perPage,
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // });
    return this.prisma.findManyAndCount('template', {
      take: pageData.perPage,
      skip: pageData.page * pageData.perPage,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  createTemplate(createData: AdminTemplateCreateDto & { code: string }) {
    return this.prisma.template.create({
      data: createData,
    });
  }

  updateTemplate(updateData: AdminTemplateUpdateDto) {
    return this.prisma.template.update({
      where: {
        id: updateData.templateId,
      },
      data: omit(updateData, ['templateId']),
    });
  }

  updateZipTemplate(templateId: string, code: string) {
    return from(
      this.prisma.template.findUnique({
        where: {
          id: templateId,
        },
      }),
    ).pipe(
      switchMap((oldTemplate) => {
        if (oldTemplate && oldTemplate.code) {
          const templateDir = join(templateFolder, oldTemplate.code);
          const codeDir = join(templateAssetsDir, oldTemplate.code);
          try {
            rmSync(templateDir, { recursive: true });
            rmSync(codeDir, { recursive: true });
          } catch (e) {}
        }
        return this.prisma.template.update({
          where: {
            id: templateId,
          },
          data: {
            code: code,
          },
        });
      }),
    );
  }

  deleteTemplate(templateId: string) {
    return from(
      this.prisma.template.findUnique({
        where: {
          id: templateId,
        },
      }),
    ).pipe(
      switchMap((oldTemplate) => {
        if (oldTemplate) {
          return this.prisma.template.delete({
            where: {
              id: templateId,
            },
          });
        } else {
          return of(false);
        }
      }),
    );
  }
}
