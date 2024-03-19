import { Module } from '@nestjs/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminCpModule } from './admin/admin-cp.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AdminAuthModule, AdminCpModule, UserModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
