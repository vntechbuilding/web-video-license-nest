import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { decorate } from 'ts-mixer';

export class AmountDto {
  @decorate(IsNotEmpty({ message: 'Amount is required' }))
  @decorate(IsInt({ message: 'Amount must be an integer' }))
  @decorate(Min(0, { message: 'Amount must be greater than or equal to 0' }))
  readonly amount: number;
}
