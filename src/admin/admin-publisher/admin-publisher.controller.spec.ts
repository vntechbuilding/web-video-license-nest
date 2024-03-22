import { Test, TestingModule } from '@nestjs/testing';
import { AdminPublisherController } from './admin-publisher.controller';

describe('AdminPublisherController', () => {
  let controller: AdminPublisherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPublisherController],
    }).compile();

    controller = module.get<AdminPublisherController>(AdminPublisherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
