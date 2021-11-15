import { Test, TestingModule } from '@nestjs/testing';
import { PostContentsService } from './post-contents.service';

describe('PostContentsService', () => {
  let service: PostContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostContentsService],
    }).compile();

    service = module.get<PostContentsService>(PostContentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
