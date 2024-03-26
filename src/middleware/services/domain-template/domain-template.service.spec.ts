import { Test, TestingModule } from '@nestjs/testing';
import { DomainTemplateService } from './domain-template.service';

describe('DomainTemplateService', () => {
  let service: DomainTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainTemplateService],
    }).compile();

    service = module.get<DomainTemplateService>(DomainTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
