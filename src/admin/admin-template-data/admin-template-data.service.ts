import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminTemplateDataCreateDto } from './dto/admin-template-data.create.dto';
import { AdminTemplateDataUpdateDto } from './dto/admin-template-data.update.dto';
import { omit } from 'lodash';

@Injectable()
export class AdminTemplateDataService {
  constructor(private prisma: PrismaService) {}

  getAllTemplateData(templateId: string) {
    return from(
      this.prisma.templateData.findMany({
        where: {
          templateId: templateId,
        },
        include: {
          template: true,
        },
        orderBy: {
          sortOrder: 'asc',
        },
      }),
    ).pipe(
      map((templateDataArray) => {
        return templateDataArray.reduce((groupedTemplateData, templateData) => {
          const key = templateData.templateType;
          if (!groupedTemplateData[key]) {
            groupedTemplateData[key] = [];
          }
          groupedTemplateData[key].push(templateData);
          return groupedTemplateData;
        }, {});
      }),
    );
  }

  createTemplateData(createData: AdminTemplateDataCreateDto) {
    return this.prisma.templateData.create({
      data: createData,
    });
  }

  updateTemplateData(updateData: AdminTemplateDataUpdateDto) {
    return this.prisma.templateData.update({
      where: {
        id: updateData.templateDataId,
      },
      data: omit(updateData, 'templateDataId'),
    });
  }

  deleteTemplateData(deleteId: string) {
    return this.prisma.templateData.delete({
      where: {
        id: deleteId,
      },
    });
  }
}
