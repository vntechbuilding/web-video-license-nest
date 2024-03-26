import { decorate, Mixin } from 'ts-mixer';
import { DomainIdDto } from '../../../middleware/dto/domain-id.dto';
import { IsOptional } from 'class-validator';
import { DomainFaviconsValid } from '../../../middleware/validator/domain-favicons.valid';

export class AdminDomainFaviconDto extends Mixin(DomainIdDto) {
  @decorate(IsOptional())
  @decorate(
    DomainFaviconsValid({
      message: 'Favicon không hợp lệ',
    }),
  )
  readonly favicon: string;
}
