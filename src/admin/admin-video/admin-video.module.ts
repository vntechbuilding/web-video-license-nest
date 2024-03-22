import { Module } from '@nestjs/common';
import { AdminVideoController } from './admin-video.controller';
import { AdminVideoService } from './admin-video.service';

@Module({
  controllers: [AdminVideoController],
  providers: [AdminVideoService],
  imports: [],
})
export class AdminVideoModule {}
