import { Test, TestingModule } from '@nestjs/testing';
import { AdminTemplateService } from './admin-template.service';

describe('AdminTemplateService', () => {
  let service: AdminTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminTemplateService],
    }).compile();

    service = module.get<AdminTemplateService>(AdminTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
