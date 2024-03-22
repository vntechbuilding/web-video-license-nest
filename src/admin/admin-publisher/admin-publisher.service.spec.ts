import { Test, TestingModule } from '@nestjs/testing';
import { AdminPublisherService } from './admin-publisher.service';

describe('AdminPublisherService', () => {
  let service: AdminPublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminPublisherService],
    }).compile();

    service = module.get<AdminPublisherService>(AdminPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
