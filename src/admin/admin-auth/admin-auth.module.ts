import { Module } from '@nestjs/common';
import { GlobalModule } from '../../middleware/global/global.module';
import { AdminAuthController } from './admin-auth.controller';

@Module({
  providers: [],
  controllers: [AdminAuthController],
  imports: [GlobalModule],
})
export class AdminAuthModule {}
