import { Test, TestingModule } from '@nestjs/testing';
import { LikedsService } from './likeds.service';

describe('LikedsService', () => {
  let service: LikedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikedsService],
    }).compile();

    service = module.get<LikedsService>(LikedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
