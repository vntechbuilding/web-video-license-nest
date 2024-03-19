import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { decorate } from 'ts-mixer';

export class DisabledDto {
  @decorate(IsNotEmpty())
  @decorate(IsBoolean())
  @decorate(
    Transform(({ value }) => {
      return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    }),
  )
  readonly disabled: boolean = false;
}
