import { Test, TestingModule } from '@nestjs/testing';
import { ApiV1AuthController } from './api-v1-auth.controller';

describe('ApiV1AuthController', () => {
  let controller: ApiV1AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiV1AuthController],
    }).compile();

    controller = module.get<ApiV1AuthController>(ApiV1AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
