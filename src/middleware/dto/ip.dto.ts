import { decorate } from 'ts-mixer';
import { IsIP, IsNotEmpty } from 'class-validator';

export class IpDto {
  @decorate(IsNotEmpty({ message: 'IP không hợp lệ' }))
  @decorate(IsIP(4, { message: 'IP không hợp lệ' }))
  readonly ip: string;
}
