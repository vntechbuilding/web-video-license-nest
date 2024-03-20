import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';

export class DescriptionDto {
  @decorate(IsNotEmpty({ message: 'Thông tin không hợp lệ' }))
  readonly description: string;
}
