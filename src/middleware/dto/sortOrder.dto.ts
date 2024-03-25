import { decorate } from 'ts-mixer';
import { IsNumber, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class SortOrderDto {
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  @decorate(Min(0))
  @decorate(
    Transform(({ value }) => {
      return +value || 0;
    }),
  )
  readonly sortOrder: number;
}
