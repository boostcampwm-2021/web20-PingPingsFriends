import { Test, TestingModule } from '@nestjs/testing';
import { LikedController } from './liked.controller';
import { LikedService } from './liked.service';

describe('LikedController', () => {
  let controller: LikedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikedController],
      providers: [LikedService],
    }).compile();

    controller = module.get<LikedController>(LikedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
