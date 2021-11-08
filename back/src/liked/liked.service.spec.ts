import { Test, TestingModule } from '@nestjs/testing';
import { LikedService } from './liked.service';

describe('LikedService', () => {
  let service: LikedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikedService],
    }).compile();

    service = module.get<LikedService>(LikedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
