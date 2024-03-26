import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { dataType } from '@prisma/client';

@ValidatorConstraint({ name: 'DomainTemplateCodeTypeValid', async: true })
@Injectable()
export class DomainTemplateCodeTypeValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}
  async validate(code: string, validatorArguments?: ValidationArguments) {
    // console.log(validatorArguments.object);
    const { domainId, templateType } = validatorArguments.object as any;
    const [dataType] = validatorArguments.constraints;
    const domain = await this.prisma.domain.findUnique({
      where: {
        id: domainId,
      },
      include: {
        template: true,
      },
    });
    if (!domain || !domain.template) return false;
    const templateData = await this.prisma.templateData.findUnique({
      where: {
        templateId_templateType_code: {
          templateId: domain.templateId,
          templateType: templateType,
          code: code,
        },
        dataType: dataType,
      },
    });
    return !!templateData;
  }
  defaultMessage(validationArguments?: ValidationArguments) {
    return (
      (validationArguments.object as any).message || 'Dữ liệu không hợp lệ'
    );
  }
}
export function DomainTemplateCodeTypeValid(
  dataType: dataType,
  validationOptions?: ValidationOptions,
) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'DomainTemplateCodeTypeValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [dataType],
      validator: DomainTemplateCodeTypeValidConstraint,
    });
  };
}
