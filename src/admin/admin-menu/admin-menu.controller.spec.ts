import { Test, TestingModule } from '@nestjs/testing';
import { AdminMenuController } from './admin-menu.controller';

describe('AdminMenuController', () => {
  let controller: AdminMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminMenuController],
    }).compile();

    controller = module.get<AdminMenuController>(AdminMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
