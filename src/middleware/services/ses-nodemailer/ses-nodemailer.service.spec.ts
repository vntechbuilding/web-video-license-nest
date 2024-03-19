import { Test, TestingModule } from '@nestjs/testing';
import { SesNodemailerService } from './ses-nodemailer.service';

describe('SesNodemailerService', () => {
  let service: SesNodemailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SesNodemailerService],
    }).compile();

    service = module.get<SesNodemailerService>(SesNodemailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
