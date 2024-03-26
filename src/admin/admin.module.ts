import { Module } from '@nestjs/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminCpModule } from './admin/admin-cp.module';
import { UserModule } from './user/user.module';
import { AdminNewsCategoryModule } from './admin-news-category/admin-news-category.module';
import { AdminDomainModule } from './admin-domain/admin-domain.module';
import { AdminAuthorModule } from './admin-author/admin-author.module';
import { AdminPublisherModule } from './admin-publisher/admin-publisher.module';
import { AdminVideoModule } from './admin-video/admin-video.module';
import { AdminNewsModule } from './admin-news/admin-news.module';
import { AdminPageModule } from './admin-page/admin-page.module';
import { AdminMenuModule } from './admin-menu/admin-menu.module';
import { AdminTemplateModule } from './admin-template/admin-template.module';
import { AdminTemplateDataModule } from './admin-template-data/admin-template-data.module';
import { AdminDomainTemplateModule } from './admin-domain-template/admin-domain-template.module';

@Module({
  imports: [AdminAuthModule, AdminCpModule, UserModule, AdminNewsCategoryModule, AdminDomainModule, AdminAuthorModule, AdminPublisherModule, AdminVideoModule, AdminNewsModule, AdminPageModule, AdminMenuModule, AdminTemplateModule, AdminTemplateDataModule, AdminDomainTemplateModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
