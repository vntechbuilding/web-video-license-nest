import { Test, TestingModule } from '@nestjs/testing';
import { AdminNewsCategoryService } from './admin-news-category.service';

describe('AdminNewsCategoryService', () => {
  let service: AdminNewsCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminNewsCategoryService],
    }).compile();

    service = module.get<AdminNewsCategoryService>(AdminNewsCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
