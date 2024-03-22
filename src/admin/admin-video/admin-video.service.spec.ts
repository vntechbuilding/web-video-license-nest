import { Test, TestingModule } from '@nestjs/testing';
import { AdminVideoService } from './admin-video.service';

describe('AdminVideoService', () => {
  let service: AdminVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminVideoService],
    }).compile();

    service = module.get<AdminVideoService>(AdminVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
