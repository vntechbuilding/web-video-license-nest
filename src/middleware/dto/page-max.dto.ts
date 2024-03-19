import { PageDto } from './page.dto';
import { decorate } from 'ts-mixer';
import { IsNumber, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PageMaxDto extends PageDto {
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  @decorate(Max(99999))
  @decorate(Min(5))
  @decorate(
    Transform(({ value }) => {
      return +value || 20;
    }),
  )
  override readonly perPage: number;
}
