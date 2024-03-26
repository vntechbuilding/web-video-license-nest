import { decorate, Mixin } from 'ts-mixer';
import { AdminDomainTemplateCreateDto } from './admin-domain-template.create.dto';
import { IsNotEmpty } from 'class-validator';
import { MenuDomainIdValid } from '../../../middleware/validator/menu/menu-domain-id.valid.dto';
import { DomainTemplateCodeTypeValid } from '../../../middleware/validator/domain-template/domain-template-code-type.valid.dto';

export class AdminDomainTemplateMenuCreateDto extends Mixin(
  AdminDomainTemplateCreateDto,
) {
  @decorate(
    IsNotEmpty({
      message: 'Code không được để trống',
    }),
  )
  @decorate(DomainTemplateCodeTypeValid('MENU'))
  readonly code: string;

  @decorate(
    IsNotEmpty({
      message: 'Menu không được để trống',
    }),
  )
  @decorate(MenuDomainIdValid())
  readonly refId: string;
}
