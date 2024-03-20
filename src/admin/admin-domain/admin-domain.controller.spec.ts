import { Test, TestingModule } from '@nestjs/testing';
import { AdminDomainController } from './admin-domain.controller';

describe('AdminDomainController', () => {
  let controller: AdminDomainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminDomainController],
    }).compile();

    controller = module.get<AdminDomainController>(AdminDomainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
