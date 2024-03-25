import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { AdminTemplateCreateDto } from './dto/admin-template.create.dto';
import { AdminTemplateUpdateDto } from './dto/admin-template.update.dto';
import { omit } from 'lodash';
import { from, of, switchMap } from 'rxjs';

@Injectable()
export class AdminTemplateService {
  constructor(private prisma: PrismaService) {}

  getAllTemplate() {
    return this.prisma.template.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  createTemplate(createData: AdminTemplateCreateDto) {
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
