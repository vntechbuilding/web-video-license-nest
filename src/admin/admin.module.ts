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

@Module({
  imports: [AdminAuthModule, AdminCpModule, UserModule, AdminNewsCategoryModule, AdminDomainModule, AdminAuthorModule, AdminPublisherModule, AdminVideoModule, AdminNewsModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
