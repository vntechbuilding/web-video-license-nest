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
import { IsIso8601Constraint } from './is-iso-8601.validator';
import { IsRfc2822Constraint } from './is-rfc-2822.validator';
import { IsIso8601DurationConstraint } from './is-iso-8601-duration.validator';
import { NewsCategoryDomainIdValidConstraint } from './news-category/news-category-domain-id.valid.dto';
import { ImageAutoValidConstraint } from './image-auto.valid';
import { NewsDomainIdValidConstraint } from './news/news-domain-id.valid.dto';
import { PageDomainIdValidConstraint } from './page/page-domain-id.valid.dto';
import { MenuDomainIdValidConstraint } from './menu/menu-domain-id.valid.dto';
import { DomainTemplateCodeTypeValidConstraint } from './domain-template/domain-template-code-type.valid.dto';
import { IsValidJSONConstraint } from './is-valid-json';
import { DomainTemplateImageValidConstraint } from './domain-template/domain-template-image.valid';

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
    IsIso8601Constraint,
    IsRfc2822Constraint,
    IsIso8601DurationConstraint,
    NewsCategoryDomainIdValidConstraint,
    ImageAutoValidConstraint,
    NewsDomainIdValidConstraint,
    PageDomainIdValidConstraint,
    MenuDomainIdValidConstraint,
    DomainTemplateCodeTypeValidConstraint,
    IsValidJSONConstraint,
    DomainTemplateImageValidConstraint,
  ],
  exports: [
    AdminPasswordLoginValidConstraint,
    UserPasswordLoginValidConstraint,
    UserCurrentPasswordValidConstraint,
    NewsCategoryParentIdValidConstraint,
    AuthorIdValidConstraint,
    PublisherIdValidConstraint,
    HeadMetaImageValidConstraint,
    ImageAutoValidConstraint,
    ContentImageValidConstraint,
    DBUniqueConstraint,
    DBValueExistsConstraint,
    RecaptchaValidConstraint,
    IsIso8601Constraint,
    IsRfc2822Constraint,
    IsIso8601DurationConstraint,
    NewsCategoryDomainIdValidConstraint,
    NewsDomainIdValidConstraint,
    PageDomainIdValidConstraint,
    MenuDomainIdValidConstraint,
    DomainTemplateCodeTypeValidConstraint,
    IsValidJSONConstraint,
    DomainTemplateImageValidConstraint,
  ],
})
export class ValidatorModule {}
