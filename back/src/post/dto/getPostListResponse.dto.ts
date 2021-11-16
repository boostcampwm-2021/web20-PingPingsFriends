import { ApiProperty } from '@nestjs/swagger';
import { GetPostResponseDto } from './getPostResponse.dto';

export class GetPostListResponseDto {
  @ApiProperty()
  posts: GetPostResponseDto[];

  @ApiProperty()
  lastPostId?: number;
}
