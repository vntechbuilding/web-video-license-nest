import { IsNotEmpty } from 'class-validator';
import { AdminPasswordLoginValid } from '../../../middleware/validator/admin/admin-password-login.valid';

export class AdminAuthLoginDto {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  @AdminPasswordLoginValid()
  readonly password: string;
}
