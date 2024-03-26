import { Test, TestingModule } from '@nestjs/testing';
import { AdminTemplateDataService } from './admin-template-data.service';

describe('AdminTemplateDataService', () => {
  let service: AdminTemplateDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminTemplateDataService],
    }).compile();

    service = module.get<AdminTemplateDataService>(AdminTemplateDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
