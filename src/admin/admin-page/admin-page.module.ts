import { Module } from '@nestjs/common';
import { AdminPageController } from './admin-page.controller';
import { AdminPageService } from './admin-page.service';

@Module({
  controllers: [AdminPageController],
  providers: [AdminPageService]
})
export class AdminPageModule {}
