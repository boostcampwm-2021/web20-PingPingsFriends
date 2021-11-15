import { Injectable } from '@nestjs/common';
import { CreatePostContentDto } from './dto/create-post-content.dto';
import { UpdatePostContentDto } from './dto/update-post-content.dto';

@Injectable()
export class PostContentsService {
  create(createPostContentDto: CreatePostContentDto) {
    return 'This action adds a new postContent';
  }

  findAll() {
    return `This action returns all postContents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postContent`;
  }

  update(id: number, updatePostContentDto: UpdatePostContentDto) {
    return `This action updates a #${id} postContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} postContent`;
  }
}
