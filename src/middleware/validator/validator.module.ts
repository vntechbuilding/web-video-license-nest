import { Module } from '@nestjs/common';
import { AdminPasswordLoginValidConstraint } from './admin/admin-password-login.valid';
import { DBUniqueConstraint } from './db-unique';
import { DBValueExistsConstraint } from './db-value.exists';
import { UserPasswordLoginValidConstraint } from './user/user-password-login.valid';
import { RecaptchaValidConstraint } from './recaptcha-valid';
import { HttpModule } from '@nestjs/axios';
import { UserCurrentPasswordValidConstraint } from './user/user-current-password.valid';
import { NewsCategoryParentIdValidConstraint } from './news-category/news-category-parent-id.valid';
import { AuthorIdValidConstraint } from './author/author-id.valid';
import { PublisherIdValidConstraint } from './publisher/publisher-id.valid';
import { HeadMetaImageValidConstraint } from './head-meta/head-meta-image.valid';
import { ContentImageValidConstraint } from './content-image.valid';

@Module({
  imports: [HttpModule],
  providers: [
    AdminPasswordLoginValidConstraint,
    UserPasswordLoginValidConstraint,
    UserCurrentPasswordValidConstraint,
    NewsCategoryParentIdValidConstraint,
    AuthorIdValidConstraint,
    HeadMetaImageValidConstraint,
    ContentImageValidConstraint,
    PublisherIdValidConstraint,
    DBUniqueConstraint,
    DBValueExistsConstraint,
    RecaptchaValidConstraint,
  ],
  exports: [
    AdminPasswordLoginValidConstraint,
    UserPasswordLoginValidConstraint,
    UserCurrentPasswordValidConstraint,
    NewsCategoryParentIdValidConstraint,
    AuthorIdValidConstraint,
    PublisherIdValidConstraint,
    HeadMetaImageValidConstraint,
    ContentImageValidConstraint,
    DBUniqueConstraint,
    DBValueExistsConstraint,
    RecaptchaValidConstraint,
  ],
})
export class ValidatorModule {}
