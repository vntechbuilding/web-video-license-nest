import { decorate, Mixin } from 'ts-mixer';
import { UserIdDto } from '../../../middleware/dto/user-id.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AdminPublisherCreateDto extends Mixin(UserIdDto) {
  @decorate(IsNotEmpty({ message: 'Tên nhà xuất bản không được để trống' }))
  readonly name: string;
  @decorate(IsOptional())
  readonly description: string;
  @decorate(IsOptional())
  readonly url: string;
}
