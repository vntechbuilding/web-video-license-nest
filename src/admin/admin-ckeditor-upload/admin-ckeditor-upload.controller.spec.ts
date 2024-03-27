import { Test, TestingModule } from '@nestjs/testing';
import { AdminCkeditorUploadController } from './admin-ckeditor-upload.controller';

describe('AdminCkeditorUploadController', () => {
  let controller: AdminCkeditorUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCkeditorUploadController],
    }).compile();

    controller = module.get<AdminCkeditorUploadController>(AdminCkeditorUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
