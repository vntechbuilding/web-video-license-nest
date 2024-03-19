import { Module } from '@nestjs/common';
import { ApiV1AuthController } from './api-v1-auth.controller';
import { GlobalModule } from '../../../middleware/global/global.module';

@Module({
  providers: [],
  controllers: [ApiV1AuthController],
  imports: [GlobalModule],
})
export class ApiV1AuthModule {}
