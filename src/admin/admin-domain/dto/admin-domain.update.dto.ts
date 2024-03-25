import { decorate, Mixin } from 'ts-mixer';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';
import { IsNotEmpty, IsUrl, Matches } from 'class-validator';
import { DBValueExists } from '../../../middleware/validator/db-value.exists';
import { AdminDomainCreateDto } from './admin-domain.create.dto';
import { DBUnique } from '../../../middleware/validator/db-unique';

export class AdminDomainUpdateDto extends Mixin(
  DisabledDto,
  AdminDomainCreateDto,
) {
  @decorate(IsNotEmpty({ message: 'Tên miền không được để trống' }))
  @decorate(
    DBValueExists('domain', 'id', { message: 'Tên miền không tồn tại' }, false),
  )
  readonly id: string;
  @decorate(IsNotEmpty({ message: 'Tên miền không được để trống' }))
  @decorate(
    // IsUrl(
    //   {
    //     require_protocol: false,
    //     require_host: true,
    //     require_port: false,
    //     allow_fragments: false,
    //     allow_query_components: false,
    //     allow_protocol_relative_urls: false,
    //     allow_trailing_dot: false,
    //   },
    //   { message: 'Tên miền không hợp lệ' },
    // ),
    Matches(/^[^\/]+\.[^\/]+$/, {
      message: 'Tên miền không hợp lệ',
    }),
  )
  @decorate(
    DBUnique('domain', 'domain', 'id', false, {
      message: 'Tên miền đã tồn tại',
    }),
  )
  readonly domain: string;
}
