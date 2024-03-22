import { Test, TestingModule } from '@nestjs/testing';
import { AdminVideoController } from './admin-video.controller';

describe('AdminVideoController', () => {
  let controller: AdminVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminVideoController],
    }).compile();

    controller = module.get<AdminVideoController>(AdminVideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
