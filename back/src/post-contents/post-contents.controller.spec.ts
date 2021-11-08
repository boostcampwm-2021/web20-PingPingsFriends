import { Test, TestingModule } from '@nestjs/testing';
import { PostContentsController } from './post-contents.controller';
import { PostContentsService } from './post-contents.service';

describe('PostContentsController', () => {
  let controller: PostContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostContentsController],
      providers: [PostContentsService],
    }).compile();

    controller = module.get<PostContentsController>(PostContentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
