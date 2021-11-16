import { Test, TestingModule } from '@nestjs/testing';
import { HabitatService } from '../habitat.service';

describe('HabitatService', () => {
  let service: HabitatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitatService],
    }).compile();

    service = module.get<HabitatService>(HabitatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
