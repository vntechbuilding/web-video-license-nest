import { Module } from '@nestjs/common';
import { AdminDomainTemplateController } from './admin-domain-template.controller';
import { AdminDomainTemplateService } from './admin-domain-template.service';

@Module({
  controllers: [AdminDomainTemplateController],
  providers: [AdminDomainTemplateService]
})
export class AdminDomainTemplateModule {}
