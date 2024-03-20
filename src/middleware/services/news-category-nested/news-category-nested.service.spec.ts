import { Test, TestingModule } from '@nestjs/testing';
import { NewsCategoryNestedService } from './news-category-nested.service';

describe('NewsCategoryNestedService', () => {
  let service: NewsCategoryNestedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsCategoryNestedService],
    }).compile();

    service = module.get<NewsCategoryNestedService>(NewsCategoryNestedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
