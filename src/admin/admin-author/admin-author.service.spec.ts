import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthorService } from './admin-author.service';

describe('AdminAuthorService', () => {
  let service: AdminAuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAuthorService],
    }).compile();

    service = module.get<AdminAuthorService>(AdminAuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
