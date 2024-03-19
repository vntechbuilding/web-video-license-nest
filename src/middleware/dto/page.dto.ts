import { Allow, IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';

export class PageDto {
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  @decorate(Min(0))
  @decorate(
    Transform(({ value }) => {
      return +value || 0;
    }),
  )
  readonly page: number;

  @decorate(IsNumber())
  @decorate(Type(() => Number))
  @decorate(Max(100))
  @decorate(Min(5))
  @decorate(
    Transform(({ value }) => {
      return +value || 20;
    }),
  )
  readonly perPage: number;

  @decorate(Allow())
  @decorate(IsOptional())
  @decorate(Type(() => String))
  @decorate(
    Transform(({ value }) => {
      return value || 'createdAt';
    }),
  )
  readonly orderBy: string;

  @decorate(Allow())
  @decorate(IsOptional())
  @decorate(Type(() => String))
  @decorate(IsIn(['asc', 'desc']))
  @decorate(
    Transform(({ value }) => {
      return value || 'asc';
    }),
  )
  readonly sorting: 'asc' | 'desc';
}
