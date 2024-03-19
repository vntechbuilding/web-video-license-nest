import { Module } from '@nestjs/common';
import { GlobalModule } from '../../middleware/global/global.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [GlobalModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminCpModule {}
