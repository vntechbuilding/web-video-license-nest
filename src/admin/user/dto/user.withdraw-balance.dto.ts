import { AmountDto } from '../../../middleware/dto/amount.dto';
import { UserIdDto } from './user-id.dto';
import { Mixin } from 'ts-mixer';

export class UserWithdrawBalanceDto extends Mixin(UserIdDto, AmountDto) {}
