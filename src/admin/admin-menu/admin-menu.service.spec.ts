import { Test, TestingModule } from '@nestjs/testing';
import { AdminMenuService } from './admin-menu.service';

describe('AdminMenuService', () => {
  let service: AdminMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminMenuService],
    }).compile();

    service = module.get<AdminMenuService>(AdminMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
