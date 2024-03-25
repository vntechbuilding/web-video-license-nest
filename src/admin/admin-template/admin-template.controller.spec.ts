import { Test, TestingModule } from '@nestjs/testing';
import { AdminTemplateController } from './admin-template.controller';

describe('AdminTemplateController', () => {
  let controller: AdminTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminTemplateController],
    }).compile();

    controller = module.get<AdminTemplateController>(AdminTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
