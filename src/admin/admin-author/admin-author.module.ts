import { Module } from '@nestjs/common';
import { AdminAuthorService } from './admin-author.service';
import { AdminAuthorController } from './admin-author.controller';

@Module({
  providers: [AdminAuthorService],
  controllers: [AdminAuthorController]
})
export class AdminAuthorModule {}
