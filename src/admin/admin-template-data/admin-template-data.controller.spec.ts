import { Test, TestingModule } from '@nestjs/testing';
import { AdminTemplateDataController } from './admin-template-data.controller';

describe('AdminTemplateDataController', () => {
  let controller: AdminTemplateDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminTemplateDataController],
    }).compile();

    controller = module.get<AdminTemplateDataController>(AdminTemplateDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
