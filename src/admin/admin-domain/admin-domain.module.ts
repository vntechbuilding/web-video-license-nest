import { Module } from '@nestjs/common';
import { AdminDomainController } from './admin-domain.controller';
import { AdminDomainService } from './admin-domain.service';

@Module({
  controllers: [AdminDomainController],
  providers: [AdminDomainService]
})
export class AdminDomainModule {}
