import { Test, TestingModule } from '@nestjs/testing';
import { AdminDomainService } from './admin-domain.service';

describe('AdminDomainService', () => {
  let service: AdminDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminDomainService],
    }).compile();

    service = module.get<AdminDomainService>(AdminDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
