import { Test, TestingModule } from '@nestjs/testing';
import { SystemUrlService } from './system-url.service';

describe('SystemUrlService', () => {
  let service: SystemUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemUrlService],
    }).compile();

    service = module.get<SystemUrlService>(SystemUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
