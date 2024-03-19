import { Mixin } from 'ts-mixer';
import { UserIdDto } from './user-id.dto';
import { AmountDto } from '../../../middleware/dto/amount.dto';

export class UserDepositBalanceDto extends Mixin(UserIdDto, AmountDto) {}
