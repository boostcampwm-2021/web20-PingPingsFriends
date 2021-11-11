import { Test, TestingModule } from '@nestjs/testing';
import { HeartsService } from './hearts.service';

describe('HeartsService', () => {
  let service: HeartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeartsService],
    }).compile();

    service = module.get<HeartsService>(HeartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
