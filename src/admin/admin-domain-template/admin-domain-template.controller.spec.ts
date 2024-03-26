import { Test, TestingModule } from '@nestjs/testing';
import { AdminDomainTemplateController } from './admin-domain-template.controller';

describe('AdminDomainTemplateController', () => {
  let controller: AdminDomainTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminDomainTemplateController],
    }).compile();

    controller = module.get<AdminDomainTemplateController>(AdminDomainTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
