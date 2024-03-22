import { Test, TestingModule } from '@nestjs/testing';
import { AdminNewsController } from './admin-news.controller';

describe('AdminNewsController', () => {
  let controller: AdminNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminNewsController],
    }).compile();

    controller = module.get<AdminNewsController>(AdminNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
