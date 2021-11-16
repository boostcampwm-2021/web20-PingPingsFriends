import { ApiProperty } from '@nestjs/swagger';

export class GetPostResponseDto {
  @ApiProperty()
  post_id: number;

  @ApiProperty()
  human_content: string;

  @ApiProperty()
  animal_content: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  user_image_url: string;

  @ApiProperty()
  post_contents_urls: string;

  @ApiProperty()
  post_contents_types: string;

  @ApiProperty()
  numOfHearts: number;

  @ApiProperty()
  is_heart: number;
}
