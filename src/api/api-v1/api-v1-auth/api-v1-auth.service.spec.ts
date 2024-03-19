import { Test, TestingModule } from '@nestjs/testing';
import { ApiV1AuthService } from './api-v1-auth.service';

describe('ApiV1AuthService', () => {
  let service: ApiV1AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiV1AuthService],
    }).compile();

    service = module.get<ApiV1AuthService>(ApiV1AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
