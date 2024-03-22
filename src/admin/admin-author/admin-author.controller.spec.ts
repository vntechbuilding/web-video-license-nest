import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthorController } from './admin-author.controller';

describe('AdminAuthorController', () => {
  let controller: AdminAuthorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminAuthorController],
    }).compile();

    controller = module.get<AdminAuthorController>(AdminAuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
