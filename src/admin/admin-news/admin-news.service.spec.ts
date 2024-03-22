import { Test, TestingModule } from '@nestjs/testing';
import { AdminNewsService } from './admin-news.service';

describe('AdminNewsService', () => {
  let service: AdminNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminNewsService],
    }).compile();

    service = module.get<AdminNewsService>(AdminNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
