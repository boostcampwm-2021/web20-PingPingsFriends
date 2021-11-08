import { Test, TestingModule } from '@nestjs/testing';
import { HabitatController } from './habitat.controller';
import { HabitatService } from './habitat.service';

describe('HabitatController', () => {
  let controller: HabitatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitatController],
      providers: [HabitatService],
    }).compile();

    controller = module.get<HabitatController>(HabitatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
