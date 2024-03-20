import { Module } from '@nestjs/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminCpModule } from './admin/admin-cp.module';
import { UserModule } from './user/user.module';
import { AdminNewsCategoryModule } from './admin-news-category/admin-news-category.module';
import { AdminDomainModule } from './admin-domain/admin-domain.module';

@Module({
  imports: [AdminAuthModule, AdminCpModule, UserModule, AdminNewsCategoryModule, AdminDomainModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
