import { Module } from '@nestjs/common';
import { AdminPasswordLoginValidConstraint } from './admin/admin-password-login.valid';
import { DBUniqueConstraint } from './db-unique';
import { DBValueExistsConstraint } from './db-value.exists';
import { UserPasswordLoginValidConstraint } from './user/user-password-login.valid';
import { RecaptchaValidConstraint } from './recaptcha-valid';
import { HttpModule } from '@nestjs/axios';
import { UserCurrentPasswordValidConstraint } from './user/user-current-password.valid';
import { NewsCategoryParentIdValidConstraint } from './news-category/news-category-parent-id.valid';

@Module({
  imports: [HttpModule],
  providers: [
    AdminPasswordLoginValidConstraint,
    UserPasswordLoginValidConstraint,
    UserCurrentPasswordValidConstraint,
    NewsCategoryParentIdValidConstraint,
    DBUniqueConstraint,
    DBValueExistsConstraint,
    RecaptchaValidConstraint,
  ],
  exports: [
    AdminPasswordLoginValidConstraint,
    UserPasswordLoginValidConstraint,
    UserCurrentPasswordValidConstraint,
    NewsCategoryParentIdValidConstraint,
    DBUniqueConstraint,
    DBValueExistsConstraint,
    RecaptchaValidConstraint,
  ],
})
export class ValidatorModule {}
