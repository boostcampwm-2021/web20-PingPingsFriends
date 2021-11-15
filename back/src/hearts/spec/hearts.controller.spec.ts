import { Test, TestingModule } from '@nestjs/testing';
import { HeartsController } from './hearts.controller';
import { HeartsService } from './hearts.service';

describe('HeartsController', () => {
  let controller: HeartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeartsController],
      providers: [HeartsService],
    }).compile();

    controller = module.get<HeartsController>(HeartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
