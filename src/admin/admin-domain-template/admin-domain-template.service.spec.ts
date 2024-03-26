import { Test, TestingModule } from '@nestjs/testing';
import { AdminDomainTemplateService } from './admin-domain-template.service';

describe('AdminDomainTemplateService', () => {
  let service: AdminDomainTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminDomainTemplateService],
    }).compile();

    service = module.get<AdminDomainTemplateService>(AdminDomainTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
