import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { GetPostResponseDto } from './getPostResponse.dto';

export class GetPostListResponseDto {
  @ApiProperty()
  posts: GetPostResponseDto[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  lastPostId?: number;
}
