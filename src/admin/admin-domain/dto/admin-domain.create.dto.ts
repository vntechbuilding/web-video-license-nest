import { decorate, Mixin } from 'ts-mixer';
import { IsBoolean, IsNotEmpty, Matches } from 'class-validator';
import { DBUnique } from '../../../middleware/validator/db-unique';
import { DBValueExists } from '../../../middleware/validator/db-value.exists';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';
import { Transform } from 'class-transformer';
import { TemplateIdDto } from '../../../middleware/dto/template-id.dto';

export class AdminDomainCreateDto extends Mixin(DisabledDto, TemplateIdDto) {
  @decorate(IsNotEmpty({ message: 'Tên miền không được để trống' }))
  @decorate(
    Matches(/^[^\/]+\.[^\/]+$/, {
      message: 'Tên miền không hợp lệ',
    }),
    // IsUrl({
    //   require_protocol: false,
    //   require_host: true,
    //   require_port: false,
    //   allow_fragments: false,
    //   allow_query_components: false,
    //   allow_protocol_relative_urls: false,
    //   allow_trailing_dot: false,
    // }),
  )
  @decorate(
    DBUnique('domain', 'domain', '', true, {
      message: 'Tên miền đã tồn tại',
    }),
  )
  readonly domain: string;

  @decorate(IsNotEmpty())
  @decorate(IsBoolean())
  @decorate(
    Transform(({ value }) => {
      return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    }),
  )
  readonly https: boolean = false;

  @decorate(IsNotEmpty({ message: 'Tài khoản không hợp lệ' }))
  @decorate(
    DBValueExists('user', 'id', { message: 'Tài khoản không tồn tại' }, false),
  )
  readonly userId: string;
}
