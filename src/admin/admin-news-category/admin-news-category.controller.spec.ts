import { Test, TestingModule } from '@nestjs/testing';
import { AdminNewsCategoryController } from './admin-news-category.controller';

describe('AdminNewsCategoryController', () => {
  let controller: AdminNewsCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminNewsCategoryController],
    }).compile();

    controller = module.get<AdminNewsCategoryController>(AdminNewsCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
