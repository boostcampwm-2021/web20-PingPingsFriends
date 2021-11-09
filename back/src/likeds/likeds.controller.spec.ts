import { Test, TestingModule } from '@nestjs/testing';
import { LikedsController } from './likeds.controller';
import { LikedsService } from './likeds.service';

describe('LikedsController', () => {
  let controller: LikedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikedsController],
      providers: [LikedsService],
    }).compile();

    controller = module.get<LikedsController>(LikedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
